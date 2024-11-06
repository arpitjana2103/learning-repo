function Button({ children, disabled, onClick = null, type = "small" }) {
    const base =
        "rounded-full text-sm bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

    const styles = {
        primary: base + " px-4 py-3 md:px-6 md:py-4",
        small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
        secondary:
            "rounded-full text-sm border-2 border-stone-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-stone-400 hover:bg-stone-400 hover:text-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-5 md:py-2",
    };

    return (
        <button onClick={onClick} disabled={disabled} className={styles[type]}>
            {children}
        </button>
    );
}

export default Button;
