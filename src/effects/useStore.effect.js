import { useSelector, useDispatch } from "react-redux";

export function useStore() {
  const dispatch = useDispatch();

  const reduxStore = useSelector((state) => {
    let store = {};
    for (let name of Array.from(arguments)) {
      Object.assign(store, { [name]: state[name] });
    }
    return store;
  });

  return {
    reduxStore,
    dispatch,
  };
}

export default useStore;
