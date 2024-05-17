import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
import Image from "components/image/Image.component";
// IMAGES
import crypto from "assets/imgs/crypto.png";

const Button = ({ text, variant = "light", hasIcon, ...rest }) => {
  const buttonClasses = classNames("sm-button", {
    "sm-button__light": variant === "light",
    "sm-button__dark": variant === "dark",
  });

  return (
    <div className={buttonClasses}>
      <IsVisible isVisible={!!hasIcon}>
        <Image src={crypto} alt={text} />
      </IsVisible>
      <button {...rest}>{text}</button>
    </div>
  );
};
export default Button;
