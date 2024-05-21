import { useContext } from "react";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
// SCREENS
import Header from "screens/header/Header.screen";
import SettingsHeader from "screens/settings-header/SettingsHeader.screen";
import NavBar from "screens/nav-bar/NavBar.screen";
// CONTEXT
import { FocusedContext } from "context/IsFocused.context";

const PageWrapper = ({ children, headerType = "header", className }) => {
  const { isFocused } = useContext(FocusedContext);

  const sectionClass = classNames("page-wrapper__children", {
    [className]: !!className,
  });

  return (
    <main className="main">
      <IsVisible isVisible={headerType === "header"}>
        <Header />
      </IsVisible>
      <IsVisible isVisible={headerType === "settings"}>
        <SettingsHeader />
      </IsVisible>
      <section id="section" className={sectionClass}>
        {children}
      </section>
      <IsVisible isVisible={isMobile && !isFocused}>
        <NavBar />
      </IsVisible>
    </main>
  );
};

export default PageWrapper;
