import CreateUser from "../features/user/CreateUser";

function Home() {
    return (
        <div className="my-10 px-4 text-center text-2xl md:text-4xl">
            <h1 className="mb-8 font-semibold text-stone-700">
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
