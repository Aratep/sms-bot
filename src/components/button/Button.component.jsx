import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
import Image from "components/image/Image.component";
// IMAGES
import crypto from "assets/imgs/crypto.png";
import spinner from "assets/imgs/input/spinner.png";

const Button = ({ text, isLoading, variant = "light", hasIcon, ...rest }) => {
  const buttonClasses = classNames("sm-button", {
    "sm-button__light": variant === "light",
    "sm-button__dark": variant === "dark",
  });

  return (
    <div className={buttonClasses}>
      <IsVisible isVisible={!!hasIcon}>
        <Image src={crypto} alt={text} />
      </IsVisible>
      <IsVisible isVisible={isLoading}>
        <img src={spinner} alt="spinner" className="spinner-gif" />
      </IsVisible>
      <button {...rest}>{text}</button>
    </div>
  );
};
export default Button;
