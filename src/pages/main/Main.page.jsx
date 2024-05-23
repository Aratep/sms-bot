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
// import useToolkit from "effects/useStore.effect";
// SLICES
import { countriesSelector } from "store/countries/countries.slice";
// ACTIONS
import { getCountries } from "store/countries/countries.actions";
// UTILS
import { countriesList } from "utils/constants";

const MainPage = () => {
  const [formData, setFormData] = useState({ service: "", country: "" });
  const [isFormReady, setIsFormReady] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, data } = useSelector(countriesSelector);
  console.log({ loading, data });

  // const {
  //   dispatch,
  //   reduxStore: { countries: countriesStore },
  // } = useToolkit("countries");
  //
  // console.log(countriesStore);
  useEffect(() => {
    dispatch(getCountries({ name: "rus" }));
  }, []);

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
          list={countriesList}
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
          list={countriesList}
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
