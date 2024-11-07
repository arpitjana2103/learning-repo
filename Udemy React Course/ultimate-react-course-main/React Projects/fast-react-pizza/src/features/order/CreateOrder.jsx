import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { formatCurrency, isEmpty } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/_cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    );

const isValidName = () => true;
const isValidAddress = () => true;

function CreateOrder() {
    const formErrors = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const user = useSelector((state) => state.user);
    const [withPriority, setWithPriority] = useState(false);
    const cart = useSelector(getCart);

    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice = priorityPrice + totalCartPrice;

    if (!cart.length) return <EmptyCart />;

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let&apos;s go!
            </h2>

            <Form method="POST" action="/order/new">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start">
                    <label className="text-sm sm:basis-40">First Name</label>
                    <input
                        className="input flex-grow"
                        type="text"
                        name="customer"
                        defaultValue={user.userName}
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start">
                    <label className="text-sm sm:basis-40">Phone number</label>
                    <div className="flex-grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="pl-3 pt-1 text-xs text-red-400">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start">
                    <label className="text-sm sm:basis-40">Address</label>
                    <div className="flex-grow">
                        <input
                            className="input w-full"
                            type="text"
                            name="address"
                            required
                        />
                    </div>
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label className="text-sm" htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <Button type="small" disabled={isSubmitting}>
                        {isSubmitting
                            ? "Placing Ordered ..."
                            : `Order now (${formatCurrency(totalPrice)})`}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function createOrderAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "true",
    };

    const errors = {
        ...(!isValidPhone(order.phone)
            ? { phone: "Invalid Phone Number" }
            : null),

        ...(!isValidName(order.customer)
            ? { customer: "Invalid Customer Name" }
            : null),

        ...(!isValidAddress(order.address)
            ? { address: "Invalid Address" }
            : null),
    };

    if (!isEmpty(errors)) return errors;

    const newOrder = await createOrder(order);
    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
