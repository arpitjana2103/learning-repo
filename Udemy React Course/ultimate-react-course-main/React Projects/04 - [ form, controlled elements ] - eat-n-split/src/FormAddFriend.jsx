import { useState } from "react";
import Button from "./Button";
import Emoji from "./Emoji";

export default function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !image) return;

        const id = crypto.randomUUID();
        const newFriend = {
            name: name,
            id: id,
            image: `${image}?u=${id}`,
            balance: 0,
        };
        onAddFriend(newFriend);
        setName("");
        setImage("https://i.pravatar.cc/48");
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>
                <Emoji txt="👦" /> Friend name
            </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />
            <label>
                <Emoji txt="🌄" /> Image URL
            </label>
            <input
                type="text"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                required
            />

            <Button>Add</Button>
        </form>
    );
}
