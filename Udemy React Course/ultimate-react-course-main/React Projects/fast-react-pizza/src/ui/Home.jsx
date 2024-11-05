import CreateUser from "../features/user/CreateUser";

function Home() {
    return (
        <div>
            <h1 className="mb-4 text-center text-[100px] font-semibold text-stone-700">
                The best pizza.
                <br />
                <span className="text-yellow-500">
                    Straight out of the oven, straight to you.
                </span>
            </h1>

            <CreateUser />
        </div>
    );
}

export default Home;
