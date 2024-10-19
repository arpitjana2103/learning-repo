import Emoji from "./Emoji";

export default function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>
                <Emoji txt="🚫" color={true} /> {message}
            </span>
        </p>
    );
}
