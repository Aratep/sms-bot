import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import PageWrapper from "components/page-wrapper/PageWrapper.component";
import IsVisible from "components/is-visible/IsVisible.component";
import { Container } from "components/container/Container.component";
import Button from "components/button/Button.component";
import MoneyInput from "components/money-input/MoneyInput.component";
// ACTIONS
import { createInvoice } from "store/order/order.actions";
// SLICES
import { pricesSelector } from "store/prices/prices.slice";
import { commonSelector } from "store/common/common.slice";
import { orderSelector } from "store/order/order.slice";
// UTILS
import { notify } from "utils/helper-functions";

const TopUpPage = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const { data: priceData } = useSelector(pricesSelector);
  const { tgHash } = useSelector(commonSelector);
  const { invoiceData } = useSelector(orderSelector);

  useEffect(() => {
    if (priceData?.availability === false) {
      notify("Top Up Your Balance to continue!", "success");
    }
  }, [priceData]);

  function handleChange(e) {
    setAmount(e.value);
  }

  function onPay() {
    const params = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
      amount: Number(amount),
    };
    if (amount !== "") {
      dispatch(createInvoice(params));
    } else {
      notify("Fill Amount to Top Your Balance!");
    }
  }

  return (
    <PageWrapper headerType="settings">
      <Container variant="col">
        <label className="label-text">TOP UP BALANCE</label>
        <Container space="center" className="pd-b-25">
          <MoneyInput
            value={amount}
            name="amount"
            onChange={handleChange}
            placeholder="0"
          />
        </Container>
        <Container space="center">
          <IsVisible isVisible={!!invoiceData === false}>
            <Button text="Confirm" onClick={onPay} />
          </IsVisible>
          <IsVisible isVisible={!!invoiceData}>
            <Button
              link={invoiceData}
              hasIcon={true}
              text={`PAY ${amount} USDT`}
            />
          </IsVisible>
        </Container>
      </Container>
    </PageWrapper>
  );
};

export default TopUpPage;
