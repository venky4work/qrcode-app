import { useState } from 'react';
let myStorage = window.sessionStorage;

export default function useToken() {
  const getToken = () => {
    const tokenString = myStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    console.log(myStorage);  
    myStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}