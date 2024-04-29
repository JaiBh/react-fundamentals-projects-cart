import CartItem from "./CartItem";
import { useGlobalContext } from "./context";
import cartItems from "./data";
import { actions } from "./reducer";
const CartContainer = () => {
  const { state, total, dispatch } = useGlobalContext();
  const cartArray = Array.from(state.cart.entries()) || [];

  if (cartArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          const [id, item] = cartItem;
          return <CartItem key={id} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span>${total().total}</span>
          </h5>
        </div>
        <button
          className="btn btn-hipster"
          onClick={() => {
            dispatch({ type: actions.clear });
          }}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
