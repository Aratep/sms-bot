import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import useWebSocket, { ReadyState } from "react-use-websocket";

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
import { API } from "utils/constants";

// const socket = io(`http://147.45.159.97:8080`, {
//   path: "/api/ws",
//   extraHeaders: {
//     Token: "lsdkjflsdfk",
//     Auth: "auth_date=1716286077\\nquery_id=AAHWXEgiAAAAANZcSCIgA3eQ\\nuser=%7B%22id%22%3A575167702%2C%22first_name%22%3A%22Ara%22%2C%22last_name%22%3A%22Tepanyan%22%2C%22username%22%3A%22ara_tepanyan%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D",
//   },
//   query: {},
//   transports: ["websocket"],
//   // withCredentials: true,
// });

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

  // const token = tgHash.hash;
  // const auth = "auth_date=1716286077\\nquery_id=AAHWXEgiAAAAANZcSCIgA3eQ\\nuser=%7B%22id%22%3A575167702%2C%22first_name%22%3A%22Ara%22%2C%22last_name%22%3A%22Tepanyan%22%2C%22username%22%3A%22ara_tepanyan%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D";
  // const { sendMessage, lastMessage, readyState } = useWebSocket("ws://147.45.159.97:8080/api/ws", {
  //   protocols: ["Auth", encodeURIComponent("auth_date=1716286077\\nquery_id=AAHWXEgiAAAAANZcSCIgA3eQ\\nuser=%7B%22id%22%3A575167702%2C%22first_name%22%3A%22Ara%22%2C%22last_name%22%3A%22Tepanyan%22%2C%22username%22%3A%22ara_tepanyan%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D")],
  //   // queryParams: {
  //   //   token: tgHash.hash,
  //   //   // auth: encodeURIComponent(tgHash.checkDataString),
  //   //   Auth: "auth_date=1716286077\\nquery_id=AAHWXEgiAAAAANZcSCIgA3eQ\\nuser=%7B%22id%22%3A575167702%2C%22first_name%22%3A%22Ara%22%2C%22last_name%22%3A%22Tepanyan%22%2C%22username%22%3A%22ara_tepanyan%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D",
  //   // },
  // });
  // console.log("LASTTTTTT", lastMessage);

  // useEffect(() => {
  //   const authHeader = "auth_date=1716286077\\nquery_id=AAHWXEgiAAAAANZcSCIgA3eQ\\nuser=%7B%22id%22%3A444838124%2C%22first_name%22%3A%22%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22nikimet%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D";
  //   const tokenHeader = "11";
  //
  //   const socket = new WebSocket(
  //     `ws://147.45.159.97:8080/api/ws?AUTH=${encodeURIComponent(authHeader)}&Token=${encodeURIComponent(tokenHeader)}`,
  //   );
  //
  //
  //   socket.onopen = () => {
  //     console.log("Connected to the WebSocket server");
  //   };
  //
  //   socket.onmessage = (event) => {
  //     console.log("Message from server ", event.data);
  //   };
  //
  //   socket.onerror = (error) => {
  //     console.error("WebSocket Error: ", error);
  //   };
  //
  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };
  //
  //   // Cleanup on unmount
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  useEffect(() => {
    const socket = io(`${API}/ws`,
      {
        path: "/api/ws/", // Custom path if needed
        extraHeaders: {
          Token: "11",
          AUTH: "auth_date=1716286077\\nquery_id=AAHWXEgiAAAAANZcSCIgA3eQ\\nuser=%7B%22id%22%3A444838124%2C%22first_name%22%3A%22%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22nikimet%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D",
        },
        allowEIO3: true,
        withCredentials: true,
        transports: ["websocket"], // Use only WebSocket transport
        query: {}, // Empty query object to avoid additional custom query parameters
      },
    );

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    socket.on("connect_error", (err) => {
      console.error("ERRORRRRRRR:", err);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // debounced search of countries and services
  // useEffect(() => {
  //   dispatch(getCountries({ name: formData.country }));
  //   // eslint-disable-next-line
  // }, [debouncedCountryTerm]);
  // useEffect(() => {
  //   dispatch(getServices({ name: formData.service }));
  //   // eslint-disable-next-line
  // }, [debouncedServiceTerm]);

  useEffect(() => {
    if (formState.service !== "" && formState.country !== "") {
      setIsFormReady(true);
    } else {
      setIsFormReady(false);
    }
  }, [formState]);

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
    // eslint-disable-next-line
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

    dispatch(makeOrder(params));
    navigate("/order");
    setFormState({ service: "", country: "" });
  }

  function handleOptionClick(target) {
    const { name, value, src, id } = target;
    dispatch(setSelectedOption({ name, value: { value, src, id } }));
    setFormState((prevState) => ({ ...prevState, [name]: value }));
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
        />
      </Container>
      <IsVisible isVisible={isFormReady}>
        <Container space="center">
          <Button
            onClick={onButtonClick}
            isLoading={pricesLoading}
            text={`BUY ${priceData.price} USDT`}
            disabled={pricesLoading}
          />
        </Container>
      </IsVisible>
    </PageWrapper>
  );
};

export default MainPage;
