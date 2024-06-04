import { useSelector } from "react-redux";

// COMPONENTS
import Loader from "components/loader/Loader.component";
import Image from "components/image/Image.component";
// SLICES
import { userSelector } from "store/user/user.slice";
// UTILS
import { formatUserData } from "utils/helper-functions";

const SettingsHeader = () => {
  const { loading: userLoading, data: userData } = useSelector(userSelector);
  const user = formatUserData(userData);

  return (
    <div className="settings-header">
      <Loader isLoading={userLoading}>
        <div className="settings-header__left">
          <Image src={user.image_url} alt="Avatar" />
          <div className="name-block">
            <span>{user.name}</span>
            <span>@{user.username}</span>
          </div>
        </div>
        <div className="settings-header__right">
          <span>$ {user.balance}</span>
          <span>Balance in usdt</span>
        </div>
      </Loader>
    </div>
  );
};

export default SettingsHeader;
