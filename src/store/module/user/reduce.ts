import { Reducer } from 'redux';
import { IAction } from '@/store/type'
import { SET_USER_LOGOUT, SET_USER_INFO } from './constant'
import { UserState } from './type';
const defaultUser: UserState = {
    avatar: undefined,
    account: '',
    mobile: '',
    role: 0,
    id: 0,
};

const userReducer: Reducer<UserState, IAction<any>> = (
    state = defaultUser,
    action: IAction<any>,
) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_INFO:
            return {
                ...payload,
            };
        case SET_USER_LOGOUT:


            return {
                ...defaultUser,
            };
        default:
            return state;
    }
};

export default userReducer;