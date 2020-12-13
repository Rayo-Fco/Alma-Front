const initialState = { marker: false };

export default (state = initialState, action) => {
    if (action.type === 'REFRESH_MARKER') {
        return {
            ...state, 
            marker: action.payload
        }
    }

    return state;
};

export const selectActiveMarker = state => state.MarkerReducer.marker;