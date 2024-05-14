import classNames from "classnames";

const Image = ({ src, className, alt = "img" }) => {
  const imgClasses = classNames("sm-image", {
    [className]: !!className,
  });
  return (
    <div className={imgClasses}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Image;
