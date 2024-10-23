import { useState } from "react";
import Emoji from "./Emoji";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [bill, setBill] = useState(0);
    const [paidByUser, setPaidByUser] = useState(0);
    const paidByFriend = bill - paidByUser;
    const [whoIsPaying, setWhoIsPaying] = useState("user");

    function handleSubmit(e) {
        e.preventDefault();
        if (!bill) return;

        if (whoIsPaying === "friend") {
            onSplitBill(-paidByUser);
        }

        if (whoIsPaying === "user") {
            onSplitBill(paidByFriend);
        }
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>
                <Emoji txt="💰" /> Bill Value
            </label>
            <input
                value={bill ? bill : ""}
                onChange={(e) => setBill(Number(e.target.value))}
                type="text"
            />

            <label>
                <Emoji txt="💴" /> Your Expense
            </label>
            <input
                value={paidByUser ? paidByUser : ""}
                onChange={(e) =>
                    setPaidByUser(
                        Number(e.target.value) > bill
                            ? paidByUser
                            : Number(e.target.value)
                    )
                }
                type="text"
            />

            <label>
                <Emoji txt="👦" /> {selectedFriend.name}'s expense
            </label>
            <input
                value={paidByFriend ? paidByFriend : ""}
                type="text"
                disabled
            />

            <label>
                <Emoji txt="🤑" /> Who is paying the bill
            </label>
            <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
            >
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}
