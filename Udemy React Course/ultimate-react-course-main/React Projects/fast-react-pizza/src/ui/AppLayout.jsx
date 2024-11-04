import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Loader from "../ui/Loader";

function AppLayout() {
    const navaigation = useNavigation();
    const isLoading = navaigation.state === "loading";

    return (
        <div className="layout">
            {isLoading && <Loader />}
            <Header />
            <main style={{ border: "3px solid red" }}>
                <Outlet />
            </main>
            <CartOverview />
        </div>
    );
}

export default AppLayout;
