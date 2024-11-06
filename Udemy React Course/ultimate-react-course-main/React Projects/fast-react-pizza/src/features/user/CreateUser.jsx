import { useState } from "react";
import Emoji from "../../ui/Emoji";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [username, setUsername] = useState("Arpit");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form className="text-sm sm:text-base" onSubmit={handleSubmit}>
            <p className="mb-4 space-x-2">
                <Emoji txt="👋" />
                <span>Welcome! Please start by telling us your name:</span>
            </p>

            <input
                type="text"
                placeholder="Your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input mb-8 max-w-80"
            />

            {username !== "" && (
                <div>
                    <Button
                        type="primary"
                        onClick={function () {
                            navigate("/menu");
                        }}
                    >
                        Start ordering
                    </Button>
                </div>
            )}
        </form>
    );
}

export default CreateUser;
