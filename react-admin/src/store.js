import { createStore } from 'redux';
import rootReducer from './reducers'; // 导入根Reducer

const store = createStore(rootReducer); // 创建Redux store

export default store;
