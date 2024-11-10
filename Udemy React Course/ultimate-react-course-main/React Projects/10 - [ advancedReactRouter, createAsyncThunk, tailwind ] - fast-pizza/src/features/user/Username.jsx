import { useSelector } from "react-redux";

function Username() {
    const user = useSelector((state) => state.user);

    return (
        <div className="hidden text-sm font-semibold sm:block">
            {user.userName}
        </div>
    );
}

export default Username;
