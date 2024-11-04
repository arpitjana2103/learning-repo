import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

export default function Menu() {
    const menu = useLoaderData();

    return (
        <ul>
            {menu.map(function (pizza) {
                return <MenuItem pizza={pizza} key={pizza.id} />;
            })}
        </ul>
    );
}

export async function menuLoader() {
    const menu = await getMenu();
    return menu;
}
