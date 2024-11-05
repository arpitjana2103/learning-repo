import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Loader from "../ui/Loader";

function AppLayout() {
    const navaigation = useNavigation();
    const isLoading = navaigation.state === "loading";

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loader />}
            <Header />
            <div className="overflow-y-auto">
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>

            <CartOverview />
        </div>
    );
}

export default AppLayout;
