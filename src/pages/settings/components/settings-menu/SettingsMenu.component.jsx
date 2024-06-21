import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsMenu = ({ title, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  let navigate = useNavigate();

  function onItemClick(route, id) {
    navigate(route);
    setActiveIndex(id);
  }

  return (
    <div className="settings-menu">
      <label className="settings-menu__label">{title}</label>
      <div className="settings-menu__wrapper">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeIndex === item.id;
          return (
            <div
              className="settings-menu__wrapper-item"
              onClick={() => onItemClick(item.route, item.id)}
              key={item.id}
            >
              <Icon color={isActive ? "#FFAA13" : "#676767"} />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsMenu;
