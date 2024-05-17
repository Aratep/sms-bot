import Image from "components/image/Image.component";
// IMAGES
import avatar from "assets/imgs/settings/avatar.png";

const SettingsHeader = () => {
  return (
    <div className="settings-header">
      <div className="settings-header__left">
        <Image src={avatar} alt="Avatar" />
        <div className="name-block">
          <span>Alex Smith</span>
          <span>@aleko</span>
        </div>
      </div>
      <div className="settings-header__right">
        <span>$ 0,00</span>
        <span>Balance in usdt</span>
      </div>
    </div>
  );
};

export default SettingsHeader;
