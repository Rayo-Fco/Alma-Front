const initialState = { latlng: "0,0" }

export default (state = initialState, action) => {
    if (action.type === 'SEND_LATLNG') {
        return {
            ...state, 
            latlng: action.payload
        }
    }

    return state
}

export const selectActiveLatLng = state => state.LatLngReducer.latlng