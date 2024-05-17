import classNames from "classnames";

const Image = ({ src, className, alt = "img", ...rest }) => {
  const imgClasses = classNames("sm-image", {
    [className]: !!className,
  });
  return (
    <div className={imgClasses}>
      <img src={src} alt={alt} {...rest} />
    </div>
  );
};

export default Image;
