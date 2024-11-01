const ACTION = {
    CREATE: "customer/create",
    UPDATE_NAME: "customer/updateName",
};

const intialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

export function createCustomer(fullName, nationalID) {
    return {
        type: ACTION.CREATE,
        payload: { fullName, nationalID, createdAt: new Date().toISOString() },
    };
}

export function updateName(fullName) {
    return { type: ACTION.UPDATE_NAME, payload: fullName };
}

export default function customerReducer(
    currState = intialStateCustomer,
    action
) {
    switch (action.type) {
        case ACTION.CREATE:
            return {
                ...currState,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };

        case ACTION.UPDATE_NAME:
            return {
                ...currState,
                fullName: action.payload,
            };

        default:
            return currState;
    }
}
