import classNames from "classnames";

export const ContainerRow = ({ children, className }) => {
  const rowClasses = classNames("container-row", {
    [className]: !!className,
  });
  return <div className={rowClasses}>{children}</div>;
};
