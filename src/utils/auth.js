export const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString) ;
}

export function initAuthentication() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (userToken) {
        return Promise.resolve({ isLogin: true });
    } else {
        return Promise.resolve({ isLogin: false });
    }
}