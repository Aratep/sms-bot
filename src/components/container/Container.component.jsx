import classNames from "classnames";

export const Container = ({ children, className, variant, space }) => {
  const rowClasses = classNames("container", {
    [className]: !!className,
    container__row: variant === "row",
    container__col: variant === "col",
    container__between: space === "between",
    container__around: space === "around",
  });
  return <div className={rowClasses}>{children}</div>;
};
