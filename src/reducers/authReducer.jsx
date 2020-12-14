
const initialState = { auth: Boolean(sessionStorage.getItem('tokenadmin')) };

export default (state = initialState, action) => {
    if (action.type === 'SEND_AUTH') {
        return {
            ...state, 
            auth: action.payload
        }
    }

    return state;
};

export const selectActiveAuth = state => state.AuthReducer.auth;