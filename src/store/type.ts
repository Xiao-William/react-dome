import { UserState } from './module/user/type';

export interface IStoreState {
    user: UserState;
}

export interface IAction<T> {
    type: string;
    payload: T;
}