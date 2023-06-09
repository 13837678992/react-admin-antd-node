import { combineReducers } from 'redux';
import authReducer from './authReducer'; // 导入身份验证Reducer

const rootReducer = combineReducers({
    auth: authReducer, // 添加身份验证Reducer到根Reducer中，可以根据需要添加其他Reducer
});

export default rootReducer;
