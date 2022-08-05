import { createStore, combineReducers, applyMiddleware, Middleware, Reducer } from 'redux';
import reduxThunk from 'redux-thunk';
import { IStoreState, IAction } from './type';
import userReducer from './module/user/reduce';

const reducers: Reducer<IStoreState, IAction<any>> = combineReducers<IStoreState>({
    user: userReducer,
});

const middleware: Middleware[] = [reduxThunk];



function createMyStore() {
    const store = createStore(reducers, applyMiddleware(...middleware));
    return store;
}

const store = createMyStore();

export default store;