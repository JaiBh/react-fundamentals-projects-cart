import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import cartItems from "./data";
import { reducer, actions } from "./reducer";
const GlobalContext = createContext();
const url = "https://www.course-api.com/react-useReducer-cart-project";

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const AppContext = ({ children }) => {
  const defaultState = {
    isLoading: false,
    cart: new Map(),
  };
  const [state, dispatch] = useReducer(reducer, defaultState);

  const total = () => {
    let total = 0;
    let totalItems = 0;
    if (state.cart.size > 0) {
      for (let [key, { price, amount }] of state.cart) {
        total += price * amount;
        totalItems += amount;
      }
    }
    return { total: total.toFixed(2), totalItems };
  };

  const fetchData = async () => {
    const resp = await fetch(url);
    const cart = await resp.json();
    dispatch({ type: actions.display, payload: { cart } });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <GlobalContext.Provider
      value={{ state, total, dispatch }}
      dispatch={dispatch}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
