export const reducer = (state, action) => {
  if (action.type === "DISPLAY_ITEMS") {
    const newCart = new Map();
    action.payload.cart.forEach((item) => {
      const { id, title, price, img, amount } = item;
      newCart.set(id, { id, title, price, img, amount });
    });
    return { ...state, cart: newCart };
  }
  if (action.type === "CLEAR_ITEMS") {
    return { ...state, cart: new Map() };
  }
  if (action.type === "REMOVE_ITEM") {
    state.cart.delete(action.payload.id);
    return { ...state };
  }
  if (action.type === "INCREASE_AMOUNT") {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === "DECREASE_AMOUNT") {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount - 1 };
    if (newItem.amount < 1) {
      newCart.delete(itemId);
    } else {
      newCart.set(itemId, newItem);
    }
    return { ...state, cart: newCart };
  }
  return state;
};

export const actions = {
  clear: "CLEAR_ITEMS",
  remove: "REMOVE_ITEM",
  increase: "INCREASE_AMOUNT",
  decrease: "DECREASE_AMOUNT",
  display: "DISPLAY_ITEMS",
};
