// COMPONENTS
import Image from "components/image/Image.component";
// CONSTANTS
import { languages } from "utils/constants";

const LanguageItem = () => {
  return (
    <div className="language-item">
      {languages.map((lang) => (
        <div className="language-item__wrapper" key={lang.id}>
          <Image src={lang.src} alt="lang" />
          <span>{lang.title}</span>
        </div>
      ))}
    </div>
  );
};

export default LanguageItem;
