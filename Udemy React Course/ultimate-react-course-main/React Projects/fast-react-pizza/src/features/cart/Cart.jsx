import { useNavigate } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./_cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cart);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    function handleClearCart() {
        dispatch(clearCart());
    }

    if (cart.length === 0) return <EmptyCart />;

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <h2 className="mt-7 text-xl font-semibold">
                Your cart, {user.userName}
            </h2>
            <ul className="mt-3 divide-y divide-stone-200 border-b">
                {cart.map(function (item) {
                    return <CartItem item={item} key={item.pizzaId} />;
                })}
            </ul>
            <div className="mt-6 space-x-2">
                <Button
                    type="small"
                    onClick={function () {
                        navigate("/order/new");
                    }}
                >
                    Order pizzas
                </Button>
                <Button type="secondary" onClick={handleClearCart}>
                    Clear cart
                </Button>
            </div>
        </div>
    );
}

export default Cart;
