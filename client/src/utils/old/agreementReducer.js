const initialState = {
    isChecked: false,
};

export default function agreementReducer(state = initialState, action) {
    switch (action.type) {
        case "CHECK_AGREEMENT":
            return {
                ...state,
                isChecked: true,
            };
        case "UNCHECK_AGREEMENT":
            return {
                ...state,
                isChecked: false,
            };
        default:
            return state;
    }
}