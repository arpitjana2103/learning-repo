import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
    return (
        <header className="flex items-center justify-between border-b border-yellow-500 bg-yellow-400 p-4 uppercase sm:px-6">
            <Link className="font-bold tracking-widest" to="/">
                Fast React Co.
            </Link>
            <div className="flex items-center gap-4">
                <SearchOrder />
                <Username />
            </div>
        </header>
    );
}

export default Header;
