export const sendAuth = (auth) => {
    return {
        type: 'SEND_AUTH',
        payload: auth
    }
    
};