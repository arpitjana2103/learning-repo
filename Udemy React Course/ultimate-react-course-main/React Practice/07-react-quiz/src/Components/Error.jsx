import Emoji from "./Emoji";

function Error() {
    return (
        <p className="error">
            <Emoji txt="💥" /> There was an error fecthing questions.
        </p>
    );
}

export default Error;
