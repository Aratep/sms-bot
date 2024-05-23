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
// ACTIONS
import { getCountries } from "store/countries/countries.actions";
import { getServices } from "store/services/services.actions";
// UTILS
import { generateList } from "utils/helper-functions";

const MainPage = () => {
  const [formData, setFormData] = useState({ service: "", country: "" });
  const [isFormReady, setIsFormReady] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading: countriesLoading, data: countriesData } =
    useSelector(countriesSelector);
  const { loading: servicesLoading, data: servicesData } =
    useSelector(servicesSelector);

  const debouncedCountryTerm = useDebouncedValue(formData.country, 500);
  const debouncedServiceTerm = useDebouncedValue(formData.service, 500);

  // debounced search of countries and services
  useEffect(() => {
    console.log("DEBOUNCED");
    dispatch(getCountries({ name: formData.country }));
    // eslint-disable-next-line
  }, [debouncedCountryTerm]);
  useEffect(() => {
    dispatch(getServices({ name: formData.service }));
    // eslint-disable-next-line
  }, [debouncedServiceTerm]);

  useEffect(() => {
    if (formData.service !== "" && formData.country !== "") {
      setIsFormReady(true);
    } else {
      setIsFormReady(false);
    }
  }, [formData]);

  function handleInputChange(event) {
    const { name, value } = event;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function onButtonClick() {
    navigate("/order");
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
        />
      </Container>
      <IsVisible isVisible={isFormReady}>
        <Container space="center">
          <Button onClick={onButtonClick} text="BUY 1,5 USDT" />
        </Container>
      </IsVisible>
    </PageWrapper>
  );
};

export default MainPage;
