import { useState, useEffect } from "react";
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
// SLICES
import { countriesSelector } from "store/countries/countries.slice";
import { servicesSelector } from "store/services/services.slice";
import { pricesSelector } from "store/prices/prices.slice";
import { commonSelector } from "store/common/common.slice";
// ACTIONS
import { getCountries } from "store/countries/countries.actions";
import { getServices } from "store/services/services.actions";
import { getPrice } from "store/prices/prices.actions";
import { makeOrder } from "store/order/order.actions";
import { setSelectedOption } from "store/common/common.actions";
// UTILS
import { generateList } from "utils/helper-functions";

const MainPage = () => {
  const [formData, setFormData] = useState({ service: "", country: "" });
  const [isFormReady, setIsFormReady] = useState(false);
  const [formState, setFormState] = useState({ service: "", country: "" });
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading: countriesLoading, data: countriesData } =
    useSelector(countriesSelector);
  const { loading: servicesLoading, data: servicesData } =
    useSelector(servicesSelector);
  const { loading: pricesLoading, data: priceData } =
    useSelector(pricesSelector);
  const { selectedOptions, tgHash } = useSelector(commonSelector);

  const debouncedCountryTerm = useDebouncedValue(formData.country, 500);
  const debouncedServiceTerm = useDebouncedValue(formData.service, 500);

  // debounced search of countries and services
  useEffect(() => {
    dispatch(getCountries({ name: formData.country }));
  }, [debouncedCountryTerm]);
  useEffect(() => {
    dispatch(getServices({ name: formData.service }));
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

  function onButtonClick() {
    const params = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
      country_id: selectedOptions.country.id,
      service_id: selectedOptions.service.id,
    };

    dispatch(makeOrder({ params }));
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
    const { name, value, src, id } = target;
    dispatch(setSelectedOption({ name, value: { value, src, id } }));
    reFetchData(name, id);
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }

  function onClose(name) {
    if (name === "service") {
      dispatch(getCountries({ name: formData.country }));
    } else {
      dispatch(getServices({ name: formData.service }));
    }
  }

  return (
    <PageWrapper>
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
        />
      </Container>
      <IsVisible isVisible={isFormReady && priceData?.availability === true}>
        <Container space="center">
          <Button
            onClick={onButtonClick}
            isLoading={pricesLoading}
            text="Confirm"
            disabled={pricesLoading}
          />
        </Container>
      </IsVisible>
    </PageWrapper>
  );
};

export default MainPage;
