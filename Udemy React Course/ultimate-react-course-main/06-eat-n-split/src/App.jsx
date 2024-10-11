import { useState } from "react";
import Button from "./Button";
import FriendsList from "./FriendsList";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: 0,
        // Ami 7 taka dhar kore6i
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 0,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [friends, setFriends] = useState(initialFriends);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleAddFriend = function (friend) {
        setFriends((friends) => [...friends, friend]);
        setShowAddFriend(false);
    };

    function handleShowAddFriend() {
        return setShowAddFriend((show) => !show);
    }

    function handleSelection(friend) {
        setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
        setShowAddFriend(false);
    }

    function handleSplitBill(value) {
        setFriends(function (friends) {
            return friends.map(function (friend) {
                if (selectedFriend.id === friend.id) {
                    friend.balance += value;
                }
                return friend;
            });
        });
        setSelectedFriend(null);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList
                    friends={friends}
                    selectedFriend={selectedFriend}
                    onSelection={handleSelection}
                />
                {showAddFriend && (
                    <FormAddFriend onAddFriend={handleAddFriend} />
                )}
                <Button onClick={handleShowAddFriend}>
                    {showAddFriend ? "Close" : "Add friend"}
                </Button>
            </div>
            {selectedFriend && (
                <FormSplitBill
                    onSplitBill={handleSplitBill}
                    selectedFriend={selectedFriend}
                />
            )}
        </div>
    );
}
