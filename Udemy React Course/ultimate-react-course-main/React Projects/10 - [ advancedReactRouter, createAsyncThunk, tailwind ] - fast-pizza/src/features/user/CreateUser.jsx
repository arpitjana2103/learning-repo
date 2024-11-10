import { useState } from "react";
import Emoji from "../../ui/Emoji";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { updateName } from "./_userSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateUser() {
    const user = useSelector((state) => state.user);
    const [userName, setUserName] = useState(user.userName);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        if (!userName) return;
        dispatch(updateName(userName));
        navigate("/menu");
    }

    return (
        <form className="text-sm sm:text-base" onSubmit={handleSubmit}>
            <p className="mb-4 space-x-2">
                <Emoji txt="👋" />
                <span>Welcome! Please start by telling us your name:</span>
            </p>

            {user.userName === "" && (
                <input
                    type="text"
                    placeholder="Your full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="input mb-8 max-w-80"
                />
            )}

            {userName !== "" && (
                <div>
                    <Button type="primary">
                        {user.userName
                            ? `Continue Ordering, ${user.userName}`
                            : "Start Ordering"}
                    </Button>
                </div>
            )}
        </form>
    );
}

export default CreateUser;
