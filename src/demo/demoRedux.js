import { createStore } from 'redux';
import {status,sort} from './Actions/index';
import Reducer from './Reducers/index'
// Truyền reducer vào store
const store =  createStore(Reducer);
console.log('Default :' , store.getState())
// Store gọi dispatch để từ dispatch gửi action vào trong reducer
store.dispatch(status());

console.log(' Change :' ,store.getState())

store.dispatch(sort({
    by:'name',
    value:-1
}))
console.log('SORT :',store.getState())