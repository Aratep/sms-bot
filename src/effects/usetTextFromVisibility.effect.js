import { useEffect, useState } from "react";

const useTextFromVisibility = (initialForm) => {
  const [isTextVisible, setIsTextVisible] = useState(true);

  useEffect(() => {
    const valueArray = Object.values(initialForm);
    const isVisible = valueArray.every((v) => v === "");
    setIsTextVisible(isVisible);
  }, [initialForm]);

  return {
    isTextVisible,
  };
};

export default useTextFromVisibility;
