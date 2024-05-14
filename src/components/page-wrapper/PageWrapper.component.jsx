import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
// SCREENS
import Header from "screens/header/Header.screen";
import NavBar from "screens/nav-bar/NavBar.screen";

const PageWrapper = ({ children, headerType = "header", className }) => {
  const sectionClass = classNames("page-wrapper__children", {
    [className]: !!className,
  });

  return (
    <main className="main">
      <IsVisible isVisible={headerType === "header"}>
        <Header />
      </IsVisible>
      <section id="section" className={sectionClass}>
        {children}
      </section>
      <NavBar />
    </main>
  );
};

export default PageWrapper;
