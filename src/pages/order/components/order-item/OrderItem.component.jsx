// COMPONENTS
import Image from "components/image/Image.component";
// IMAGES
import wa from "assets/imgs/wa.png"; // temporary

const OrderItem = () => {
  return (
    <div className="order-container">
      <label>YOUR ORDER</label>
      <div className="order-container__wrapper">
        <div className="order-container__wrapper-item">
          <div className="order-container__wrapper-item__logo">
            <Image src={wa} alt="wa" />
            <span>Amazon</span>
          </div>
        </div>
        <div className="order-container__wrapper-item">
          <div className="order-container__wrapper-item__logo">
            <Image src={wa} alt="wa" />
            <span>Amazon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
