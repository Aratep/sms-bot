import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
import Image from "components/image/Image.component";

const Button = ({ text, variant = "light", src, ...rest }) => {
  const buttonClasses = classNames("sm-button", {
    "sm-button__light": variant === "light",
    "sm-button__dark": variant === "dark",
  });

  return (
    <div className={buttonClasses}>
      <IsVisible isVisible={!!src}>
        <Image src={src} alt={text} />
      </IsVisible>
      <button {...rest}>{text}</button>
    </div>
  );
};
export default Button;
