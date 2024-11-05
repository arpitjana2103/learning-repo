import { useNavigate, useRouteError } from "react-router-dom";
import Emoji from "./Emoji";
import Button from "./Button";

function NotFound() {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <div>
            <h1>
                Something went wrong <Emoji txt="😢" />
            </h1>
            <p>{error.data || error.message}</p>
            <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
    );
}

export default NotFound;
