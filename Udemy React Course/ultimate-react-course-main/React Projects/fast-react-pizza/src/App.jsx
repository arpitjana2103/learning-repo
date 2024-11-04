import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { orderLoader } from "./features/order/Order";
import CreateOrder, { createOrderAction } from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/cart", element: <Cart /> },
            {
                path: "/menu",
                element: <Menu />,
                loader: menuLoader,
                errorElement: <Error />,
            },
            {
                path: "/order/new",
                element: <CreateOrder />,
                action: createOrderAction,
            },
            {
                path: "/order/:orderId",
                element: <Order />,
                loader: orderLoader,
                errorElement: <Error />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
