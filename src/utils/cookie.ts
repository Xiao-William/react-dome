
import config from './config';
import cookie from 'js-cookie'
const setToken = (token: string) => cookie.set(config.TOKEN_KEY, token);
const getToken: () => string = () => cookie.get(config.TOKEN_KEY) || '';
const removeToken = () => cookie.remove(config.TOKEN_KEY);
export { setToken, getToken, removeToken }

