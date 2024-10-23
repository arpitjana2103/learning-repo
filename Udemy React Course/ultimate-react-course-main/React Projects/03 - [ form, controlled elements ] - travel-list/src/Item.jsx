function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={item.packed}
                onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button>
                <span className="emoji" onClick={() => onDeleteItem(item.id)}>
                    ❌
                </span>
            </button>
        </li>
    );
}

export default Item;
