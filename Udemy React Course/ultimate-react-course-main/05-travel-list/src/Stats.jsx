function Stats({ items }) {
    const numItems = items.length;
    const itemsPacked = items.reduce(function (res, item) {
        return item.packed ? res + 1 : res;
    }, 0);
    const itemPackedPercentage = ((itemsPacked / numItems) * 100).toFixed(2);
    return (
        <footer className="stats">
            <em>
                `You have {numItems} items on your list, and you already packed
                {itemsPacked} ({itemPackedPercentage}%)
            </em>
        </footer>
    );
}

export default Stats;
