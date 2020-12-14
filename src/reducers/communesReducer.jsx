const initialState = { communes: "" }

export default (state = initialState, action) => {
    if (action.type === 'SEND_COMMUNES') {
        return {
            ...state, 
            communes: action.payload
        }
    }

    return state
}

export const selectActiveCommunes = state => state.CommunesReducer.communes