import ACT from "../globalAction";

const initialState = {
    isLoading: false,
    errorMessage: '',
    successMessage: '',
    userData: {}
}

export const rootReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case ACT.CHANGE_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case ACT.ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload.message
            }
        case ACT.SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: action.payload.message
            }
        case ACT.CHANGE_USER:
            return {
                ...state,
                userData: action.payload.userData
            }
        default:
            return state;
    }
}