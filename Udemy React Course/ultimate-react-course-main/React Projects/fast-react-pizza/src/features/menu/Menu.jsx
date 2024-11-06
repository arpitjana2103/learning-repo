import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";

export default function Menu() {
    const menu = useLoaderData();
    const cart = useSelector((state) => state.cart.cart);

    return (
        <ul className="divide-y divide-stone-200 px-2">
            {menu.map(function (pizza) {
                return (
                    <MenuItem
                        pizza={pizza}
                        key={pizza.id}
                        isInCart={Boolean(
                            cart.find(function (item) {
                                return item.pizzaId === pizza.id;
                            }),
                        )}
                    />
                );
            })}
        </ul>
    );
}

export async function menuLoader() {
    const menu = await getMenu();
    return menu;
}
