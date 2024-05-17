import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import { Container } from "components/container/Container.component";
import Select from "components/select/Select.component";
import Button from "components/button/Button.component";
// EFFECTS
// UTILS
import { countriesList } from "utils/constants";
import IsVisible from "../../components/is-visible/IsVisible.component";

const MainPage = () => {
  const [formData, setFormData] = useState({ service: "", country: "" });
  const [isFormReady, setIsFormReady] = useState(false);
  let navigate = useNavigate();

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
    console.log(formData, isFormReady);
  }

  return (
    <PageWrapper>
      <Container>
        <Select
          label="Select a service:"
          placeholder="Find a service"
          name="service"
          inputVariant="search"
          handleChange={handleInputChange}
          list={countriesList}
        />
      </Container>
      <Container>
        <Select
          label="Select a country:"
          placeholder="Find a country"
          name="country"
          inputVariant="search"
          handleChange={handleInputChange}
          list={countriesList}
        />
      </Container>
      <IsVisible isVisible={isFormReady}>
        <Container>
          <Button onClick={onButtonClick} text="BUY 1,5 USDT" />
        </Container>
      </IsVisible>
    </PageWrapper>
  );
};

export default MainPage;
