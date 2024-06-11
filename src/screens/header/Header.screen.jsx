// COMPONENTS
import Image from "components/image/Image.component";
// IMAGES
import headerLogo from "assets/imgs/header-logo.png";

const Header = () => {
  return (
    <header className="header" id="header">
      <div>
        <div className="header__logo">
          <Image src={headerLogo} />
        </div>
        <div className="header__info">
          <span>Sketch SMS</span>
          <span>virtual numbers for receiving SMS</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
