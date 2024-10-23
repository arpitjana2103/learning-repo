import { useReducer } from "react";

const styleObj = {
    textAlign: "center",
};
const styleObj2 = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
};

const initialState = {
    status: "deactive", // "active" | "deactive"
    balance: 0,
    loan: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "open":
            return { ...state, status: "active", balance: 500 };
        case "close":
            if (state.balance || state.loan) return state;
            return { ...state, status: "deactive" };
        case "deposite":
            return { ...state, balance: state.balance + action.payload };
        case "withdraw":
            return {
                ...state,
                balance:
                    state.balance >= action.payload
                        ? state.balance - action.payload
                        : state.balance,
            };
        case "requestLoan":
            if (state.loan) return state;
            return {
                ...state,
                loan: action.payload,
                balance: state.balance + action.payload,
            };

        case "payloan":
            if (!state.loan || state.balance < state.loan) return state;
            return {
                ...state,
                loan: 0,
                balance: state.balance - state.loan,
            };
        default:
            throw new Error("Unknown Action");
    }
}

function App() {
    const [{ status, balance, loan }, dispatch] = useReducer(
        reducer,
        initialState
    );
    const isActive = status === "active";
    const haveLoan = loan > 0;

    function handleOpenAcc() {
        return dispatch({ type: "open" });
    }

    function handleCloseAcc() {
        return dispatch({ type: "close" });
    }

    function handleDeposite() {
        return dispatch({ type: "deposite", payload: 150 });
    }

    function handleWithdraw() {
        return dispatch({ type: "withdraw", payload: 50 });
    }

    function handleLoan() {
        return dispatch({ type: "requestLoan", payload: 5000 });
    }

    function handlePayLoan() {
        return dispatch({ type: "payloan" });
    }

    return (
        <div style={styleObj}>
            <h1>userReducer Bank Account</h1>
            {isActive && (
                <>
                    <h3>Balance : {balance}</h3>
                    <h3>Loan : {loan}</h3>
                </>
            )}

            <div style={styleObj2}>
                <button disabled={isActive} onClick={handleOpenAcc}>
                    Open Account
                </button>

                <button disabled={!isActive} onClick={handleDeposite}>
                    Deposite 150
                </button>

                <button disabled={!isActive} onClick={handleWithdraw}>
                    Withdraw 50
                </button>

                <button disabled={!isActive} onClick={handleLoan}>
                    Loan 5000
                </button>

                <button
                    disabled={!isActive || !haveLoan}
                    onClick={handlePayLoan}
                >
                    Pay Loan
                </button>

                <button disabled={!isActive} onClick={handleCloseAcc}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default App;
