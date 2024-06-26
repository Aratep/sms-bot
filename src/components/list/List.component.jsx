import { useEffect, useState, Fragment } from "react";
import classNames from "classnames";

// COMPONENTS
import IsVisible from "components/is-visible/IsVisible.component";
import Image from "components/image/Image.component";
// IMAGES
import arrow from "assets/imgs/select/arrow.png";
import close from "assets/imgs/select/close.png";

const List = ({ title, items, isShowAllBtn, isItemClickable = false }) => {
  const initialListSize = 5;
  const [isMore, setIsMore] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(initialListSize);

  useEffect(() => {
    if (visibleCount >= items.length) {
      setIsMore(false);
    }
  }, [visibleCount, items]);

  const handleTouchEnd = (id, index) => {
    if (!isItemClickable) return false;
    setSelectedItemId(id);
    setSelectedIndex(index);
  };

  function onCloseBtnClick(e) {
    e.stopPropagation();
    setSelectedItemId(null);
    setSelectedIndex(null);
  }

  function showMore() {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + initialListSize, items.length)
    );
  }

  function showLess() {
    setVisibleCount(initialListSize);
    setIsMore(true);
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
        <IsVisible isVisible={items.length === 0}>
          <div className="sm-list__container-noitems">No items yet</div>
        </IsVisible>
        {items.slice(0, visibleCount).map((item, index) => {
          const listItemClasses = classNames("sm-list__container-item", {
            "sm-list__container-item__active": selectedItemId === item.id,
            "sm-list__container-item__rounded-prev":
              selectedIndex !== null && selectedIndex - 1 === index,
            "sm-list__container-item__rounded-next":
              selectedIndex !== null && selectedIndex + 1 === index,
          });
          return (
            <Fragment key={item.id}>
              <div
                className={listItemClasses}
                onClick={() => handleTouchEnd(item.id, index)}
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
                    <span>Code:</span>
                    <span>
                      {item.firstCode} {item.secondCode}
                    </span>
                  </div>
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
      <IsVisible isVisible={items.length > 0}>
        <IsVisible isVisible={isShowAllBtn}>
          <div className="sm-list__show">
            <IsVisible isVisible={visibleCount >= items.length}>
              <span onClick={showLess}>Show less</span>
            </IsVisible>
            <IsVisible isVisible={visibleCount < items.length}>
              <span onClick={showMore}>Show More</span>
            </IsVisible>
            <Image src={arrow} alt="arrow" className={arrowClasses} />
          </div>
        </IsVisible>
      </IsVisible>
    </div>
  );
};

export default List;
