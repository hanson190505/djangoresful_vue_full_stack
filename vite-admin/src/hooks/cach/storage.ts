interface IToken {
  access: string;
  refresh: string;
}
const storage = window.localStorage;

function setToken(params: IToken) {
  storage.setItem('token', JSON.stringify(params));
}

function getToken(): IToken | void {
  let _token = storage.getItem('token');
  if (_token) {
    return JSON.parse(_token);
  }
}

function removeToken() {
  storage.removeItem('token');
}

export function useStorage() {
  return {
    setToken,
    getToken,
    removeToken,
  };
}
