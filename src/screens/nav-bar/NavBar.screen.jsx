import { useNavigate, useLocation } from "react-router-dom";

// ICONS
import AccountIcon from "components/icons/AccountIcon.component";
import SmsIcon from "components/icons/SmsIcon.component";
// UTILS
import { getActiveItem } from "utils/helper-functions";
import { mainRoutes, accountRoutes } from "utils/constants";

const NavBar = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    {
      id: 1,
      icon: SmsIcon,
      href: "/main",
      isActive: getActiveItem(mainRoutes, pathname),
    },
    {
      id: 2,
      icon: AccountIcon,
      href: "/settings",
      isActive: getActiveItem(accountRoutes, pathname),
    },
  ];

  function onIconClick(href) {
    navigate(href);
  }

  return (
    <footer className="nav-bar" id="footer">
      <div className="nav-bar__wrapper">
        {navItems.map((item) => {
          const NavIcon = item.icon;
          return (
            <NavIcon
              key={item.id}
              isActive={item.isActive}
              colors={{ active: "#FFAA13", passive: "#676767" }}
              onClick={() => onIconClick(item.href)}
            />
          );
        })}
      </div>
    </footer>
  );
};

export default NavBar;
