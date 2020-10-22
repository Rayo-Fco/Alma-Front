const initialState = { latlng: "0,0" };

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, action) => {
    if (action.type === 'SEND_LATLNG') {
        return {
            ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
            latlng: action.payload
        }
    }

    return state;
};

export const selectActiveLatLng = state => state.LatLngReducer.latlng;