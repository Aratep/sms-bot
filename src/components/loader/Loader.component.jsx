const LoaderIndicator = () => (
  <div className="indicator-wrapper">
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

const Loader = ({ children, isLoading }) =>
  isLoading ? <LoaderIndicator /> : children;

export default Loader;
