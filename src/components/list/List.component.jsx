import { useEffect, useState, useRef, Fragment } from "react";
import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
import Image from "components/image/Image.component";
// IMAGES
import arrow from "assets/imgs/select/arrow.png";

const List = ({ title, items, isShowAllBtn, isItemClickable = false }) => {
  const initialItems = items.slice(0, 5);
  const itemsLength = items.length;
  const lastTapRef = useRef(0);
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [isMore, setIsMore] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    if (isMore) {
      setFilteredItems(items);
    } else {
      setFilteredItems(initialItems);
    }
    // eslint-disable-next-line
  }, [isMore]);

  function handleDoubleTap() {
    setSelectedItemId(null);
  }

  const handleTouchEnd = (id) => {
    if (!isItemClickable) return false;
    setSelectedItemId(id);

    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // maximum delay for a double tap in ms
    if (now - lastTapRef.current <= DOUBLE_TAP_DELAY) {
      handleDoubleTap();
    }
    lastTapRef.current = now;
  };

  function onArrowClick() {
    setIsMore(!isMore);
    setFilteredItems(items);
  }

  const arrowClasses = classNames({
    "arrow-up": isMore,
  });

  return (
    <div className="sm-list">
      <IsVisible isVisible={!!title}>
        <span className="sm-list__title">{title}</span>
      </IsVisible>
      <div className="sm-list__container">
        {filteredItems.map((item) => (
          <Fragment key={item.id}>
            <div
              className="sm-list__container-item"
              onTouchEnd={() => handleTouchEnd(item.id)}
            >
              <Image src={item.src} alt={item.src} />
              <span>{item.title}</span>
            </div>
            <IsVisible isVisible={selectedItemId === item.id}>
              <div className="sm-list__container-item__cont">
                <div>
                  <span>Code:</span>
                  <span>{item.code}</span>
                </div>
                <div>
                  <span>Date:</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </IsVisible>
          </Fragment>
        ))}
      </div>
      <IsVisible isVisible={isShowAllBtn && itemsLength > 5}>
        <div className="sm-list__show" onClick={onArrowClick}>
          <IsVisible isVisible={isMore}>
            <span>Show less</span>
          </IsVisible>
          <IsVisible isVisible={!isMore}>
            <span>Show all</span>
          </IsVisible>
          <Image src={arrow} alt="arrow" className={arrowClasses} />
        </div>
      </IsVisible>
    </div>
  );
};

export default List;
