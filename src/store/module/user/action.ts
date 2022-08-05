import { IAction } from "@/store/type";
import { SET_USER_LOGOUT, SET_USER_INFO } from "./constant";
import { UserState } from "./type";
export const logout: () => IAction<null> = () => ({
    type: SET_USER_LOGOUT,
    payload: null,
});
export const setUserInfo: (user: UserState) => IAction<UserState> = (user: UserState) => ({
    type: SET_USER_INFO,
    payload: user,
});