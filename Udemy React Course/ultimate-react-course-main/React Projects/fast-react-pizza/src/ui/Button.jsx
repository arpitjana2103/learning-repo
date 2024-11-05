function Button({ children, disabled, onClick = null }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="rounded-full bg-yellow-400 px-6 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
        >
            {children}
        </button>
    );
}

export default Button;
