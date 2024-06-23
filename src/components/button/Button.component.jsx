import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
import Image from "components/image/Image.component";
// IMAGES
import crypto from "assets/imgs/crypto.png";
import spinner from "assets/imgs/input/spinner.png";

const Button = ({
  text,
  isLoading,
  link,
  variant = "light",
  hasIcon,
  className,
  ...rest
}) => {
  const buttonClasses = classNames("sm-button", {
    "sm-button__light": variant === "light",
    "sm-button__dark": variant === "dark",
    [className]: !!className,
  });

  return (
    <div className={buttonClasses}>
      <IsVisible isVisible={!!hasIcon}>
        <Image src={crypto} alt={text} />
      </IsVisible>
      <IsVisible isVisible={isLoading}>
        <img src={spinner} alt="spinner" className="spinner-gif" />
      </IsVisible>
      <IsVisible isVisible={!!link === false}>
        <button {...rest}>{text}</button>
      </IsVisible>
      <IsVisible isVisible={!!link}>
        <a href={link}>{text}</a>
      </IsVisible>
    </div>
  );
};
export default Button;
