const initialState = { open: false };

export default (state = initialState, action) => {
    if (action.type === 'UPDATE_OPEN') {
        return {
            ...state, 
            open: action.payload
        }
    }

    return state;
};

export const selectActiveOpen = state => state.OpenReducer.open;