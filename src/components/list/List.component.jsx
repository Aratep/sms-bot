import { useEffect, useState, Fragment } from "react";
import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
import Image from "components/image/Image.component";
// IMAGES
import arrow from "assets/imgs/select/arrow.png";
import close from "assets/imgs/select/close.png";

const List = ({ title, items, isShowAllBtn, isItemClickable = false }) => {
  const initialItems = items.slice(0, 5);
  const itemsLength = items.length;
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [isMore, setIsMore] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    if (isMore) {
      setFilteredItems(items);
    } else {
      setFilteredItems(initialItems);
    }
  }, [isMore]);

  const handleTouchEnd = (id) => {
    if (!isItemClickable) return false;
    setSelectedItemId(id);
  };

  function onCloseBtnClick(e) {
    e.stopPropagation();
    setSelectedItemId(null);
  }

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
        {filteredItems.map((item) => {
          const listItemClasses = classNames("sm-list__container-item", {
            "sm-list__container-item__active": selectedItemId === item.id,
          });
          return (
            <Fragment key={item.id}>
              <div
                className={listItemClasses}
                onClick={() => handleTouchEnd(item.id)}
              >
                <div>
                  <Image src={item.src} alt={item.src} />
                  <span>{item.title}</span>
                </div>
                <IsVisible isVisible={selectedItemId === item.id}>
                  <Image
                    src={close}
                    onClick={onCloseBtnClick}
                    className="close-btn"
                    alt="close"
                  />
                </IsVisible>
              </div>
              <IsVisible isVisible={selectedItemId === item.id}>
                <div className="sm-list__container-item__cont">
                  <div>
                    <span>Date:</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </IsVisible>
            </Fragment>
          );
        })}
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
