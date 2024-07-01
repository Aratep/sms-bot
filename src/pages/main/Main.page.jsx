import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import Select from "components/select/Select.component";
import Button from "components/button/Button.component";
import IsVisible from "components/is-visible/IsVisible.component";
// EFFECTS
import useDebouncedValue from "effects/useDebouncedValue.effect";
import useTextFromVisibility from "effects/usetTextFromVisibility.effect";
// CONTEXT
import { CounterValueContext } from "context/CounterValue.context";
// SLICES
import { countriesSelector } from "store/countries/countries.slice";
import { servicesSelector } from "store/services/services.slice";
import { pricesSelector } from "store/prices/prices.slice";
import { commonSelector } from "store/common/common.slice";
// ACTIONS
import { getCountries } from "store/countries/countries.actions";
import { getServices } from "store/services/services.actions";
import { getPrice } from "store/prices/prices.actions";
import { makeOrderAsync } from "store/order/order.actions";
import {
  setSelectedOption,
  resetSelectedOption,
} from "store/common/common.actions";
// UTILS
import { generateList } from "utils/helper-functions";
import { initialCounter } from "utils/constants";

const MainPage = () => {
  const [formData, setFormData] = useState({ service: "", country: "" });
  const [isFormReady, setIsFormReady] = useState(false);
  const [formState, setFormState] = useState({ service: "", country: "" });
  const [firstClickedOption, setFirstClickedOption] = useState("");
  const [canceledOptionName, setCanceledOptionName] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { setDateCounterValue } = useContext(CounterValueContext);

  const { loading: countriesLoading, data: countriesData } =
    useSelector(countriesSelector);
  const { loading: servicesLoading, data: servicesData } =
    useSelector(servicesSelector);
  const { loading: pricesLoading, data: priceData } =
    useSelector(pricesSelector);
  const { selectedOptions, tgHash } = useSelector(commonSelector);

  const debouncedCountryTerm = useDebouncedValue(formData.country, 500);
  const debouncedServiceTerm = useDebouncedValue(formData.service, 500);
  const { isTextVisible } = useTextFromVisibility(formData);

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        dispatch(resetSelectedOption());
        dispatch(getCountries({ name: formData.country, service_id: null }));
        dispatch(getServices({ name: formData.service, country_id: null }));
      }
    }
  }, []);

  // debounced search of countries and services
  useEffect(() => {
    if (debouncedCountryTerm === "" && selectedOptions.service.id !== "") {
      dispatch(
        getCountries({ name: "", service_id: selectedOptions.service.id })
      );
    } else {
      dispatch(getCountries({ name: formData.country }));
    }
  }, [debouncedCountryTerm]);
  useEffect(() => {
    if (debouncedServiceTerm === "" && selectedOptions.country.id !== "") {
      dispatch(
        getServices({ name: "", country_id: selectedOptions.country.id })
      );
    } else {
      dispatch(getServices({ name: formData.service }));
    }
  }, [debouncedServiceTerm]);

  useEffect(() => {
    if (formState.service !== "" && formState.country !== "") {
      setIsFormReady(true);
    } else {
      setIsFormReady(false);
    }
  }, [formState]);

  useEffect(() => {
    if (priceData?.availability === false) {
      navigate("/top-up");
    }
  }, [priceData]);

  useEffect(() => {
    if (isFormReady === true) {
      const params = {
        auth_data: {
          auth: tgHash.checkDataString,
          hash: tgHash.hash,
        },
        country_id: selectedOptions.country.id,
        service_id: selectedOptions.service.id,
      };
      dispatch(getPrice(params));
    }
  }, [isFormReady]);

  function handleInputChange(event) {
    const { name, value } = event;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function resetCounter(counter, name) {
    const newDate = Date.now();
    const newDelay = counter;
    localStorage.setItem(name, JSON.stringify(newDate + newDelay));
    setDateCounterValue({ date: newDate, delay: newDelay });
  }

  function onButtonClick() {
    const params = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
      country_id: selectedOptions.country.id,
      service_id: selectedOptions.service.id,
    };

    dispatch(makeOrderAsync({ params }));
    resetCounter(initialCounter, "end_date");
    navigate("/order");
    setFormState({ service: "", country: "" });
  }

  function reFetchData(name, id) {
    if (id !== "") {
      if (name === "service")
        dispatch(getCountries({ name: formData.country, service_id: id }));
      if (name === "country")
        dispatch(getServices({ name: formData.service, country_id: id }));
    }
  }

  function handleOptionClick(target) {
    const { name, value, src, id, price } = target;
    const optionObject = { name, value: { value, src, id, price } };
    dispatch(setSelectedOption(optionObject));
    reFetchData(name, id);
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setFirstClickedOption(name);
  }

  function onClose(name) {
    if (name === "service") {
      dispatch(getCountries({ name: formData.country }));
    } else {
      dispatch(getServices({ name: formData.service }));
    }
    setFirstClickedOption("");
    setCanceledOptionName(name);
  }

  return (
    <PageWrapper className="main-page">
      <Container className="pd-b-20">
        <Select
          label="Select a service:"
          placeholder="Find a service"
          name="service"
          value={formData.service}
          inputVariant="search"
          handleChange={handleInputChange}
          list={generateList(servicesData)}
          isLoading={servicesLoading}
          handleOptionClick={handleOptionClick}
          onClose={onClose}
          hasFromText={
            (firstClickedOption !== "country" &&
              canceledOptionName !== "service") ||
            isTextVisible
          }
        />
      </Container>
      <Container className="pd-b-25">
        <Select
          label="Select a country:"
          placeholder="Find a country"
          name="country"
          value={formData.country}
          inputVariant="search"
          handleChange={handleInputChange}
          list={generateList(countriesData)}
          isLoading={countriesLoading}
          handleOptionClick={handleOptionClick}
          onClose={onClose}
          hasFromText={
            firstClickedOption !== "service" && canceledOptionName !== "country"
          }
        />
      </Container>
      <IsVisible isVisible={isFormReady && priceData?.availability === true}>
        <Container space="center">
          <Button
            className="pay-btn"
            onClick={onButtonClick}
            text={`BUY ${priceData.price} USDT`}
            disabled={pricesLoading}
          />
        </Container>
      </IsVisible>
      <Button
        className="pay-btn"
        onClick={onButtonClick}
        text={`BUY ${priceData.price} USDT`}
        disabled={pricesLoading}
      />
    </PageWrapper>
  );
};

export default MainPage;
