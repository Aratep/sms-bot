import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
// SCREENS
import Header from "screens/header/Header.screen";
import SettingsHeader from "screens/settings-header/SettingsHeader.screen";
import NavBar from "screens/nav-bar/NavBar.screen";

const PageWrapper = ({
  children,
  hasHeader = true,
  headerType = "header",
  className,
}) => {
  const sectionClass = classNames("page-wrapper__children", {
    [className]: !!className,
  });

  return (
    <main className="main">
      <section id="section" className={sectionClass}>
        <IsVisible isVisible={hasHeader}>
          <IsVisible isVisible={headerType === "header"}>
            <Header />
          </IsVisible>
          <IsVisible isVisible={headerType === "settings"}>
            <SettingsHeader />
          </IsVisible>
        </IsVisible>
        {children}
      </section>
      <IsVisible isVisible={hasHeader}>
        <NavBar />
      </IsVisible>
    </main>
  );
};

export default PageWrapper;
