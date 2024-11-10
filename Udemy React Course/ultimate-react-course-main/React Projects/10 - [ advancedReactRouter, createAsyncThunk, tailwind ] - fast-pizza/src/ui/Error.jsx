import { useNavigate, useRouteError } from "react-router-dom";
import Emoji from "./Emoji";
import Button from "./Button";

function NotFound() {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <div className="flex h-full items-center justify-center p-4 py-8">
            <div className="space-y-3 text-center text-red-500">
                <h1>
                    Something went wrong <Emoji txt="😢" />
                </h1>
                <p className="pb-8">{error.data || error.message}</p>
                <Button type="secondary" onClick={() => navigate(-1)}>
                    <Emoji txt="👈" /> Go back
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
