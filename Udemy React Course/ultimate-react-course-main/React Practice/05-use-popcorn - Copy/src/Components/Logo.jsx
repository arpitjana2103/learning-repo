import Emoji from "./Emoji";

export default function Logo() {
    return (
        <div className="logo">
            <span role="img">
                <Emoji txt="🍿" />
            </span>
            <h1>POPCON</h1>
        </div>
    );
}
