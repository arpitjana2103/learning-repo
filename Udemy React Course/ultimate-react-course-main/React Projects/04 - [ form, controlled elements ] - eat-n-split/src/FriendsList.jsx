import Friend from "./Friend";
export default function FriendsList({ friends, onSelection, selectedFriend }) {
    return (
        <ul>
            {friends.map(function (friend) {
                return (
                    <Friend
                        friend={friend}
                        key={friend.id}
                        onSelection={onSelection}
                        selectedFriend={selectedFriend}
                    />
                );
            })}
        </ul>
    );
}
