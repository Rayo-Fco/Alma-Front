export const sendLatLng = (latlng) => {
    return {
        type: 'SEND_LATLNG',
        payload: latlng
    }
    
};