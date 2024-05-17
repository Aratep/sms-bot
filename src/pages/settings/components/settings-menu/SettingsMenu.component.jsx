import { useNavigate } from "react-router-dom";

// COMPONENTS
import Image from "components/image/Image.component";

const SettingsMenu = ({ title, items }) => {
  let navigate = useNavigate();

  function onItemClick(route) {
    navigate(route);
  }

  return (
    <div className="settings-menu">
      <label className="settings-menu__label">{title}</label>
      <div className="settings-menu__wrapper">
        {items.map((item, i) => {
          return (
            <div
              className="settings-menu__wrapper-item"
              onClick={() => onItemClick(item.route)}
              key={item.id}
            >
              <Image src={item.icon} alt="icon" />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsMenu;
