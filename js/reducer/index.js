import { combineReducers } from 'redux';
import themeReducer from './theme';
import popularReducer from './popular';
import trendingReducer from './trending';

const rootReducer = combineReducers({
  theme: themeReducer,
  popular: popularReducer,
  trending: trendingReducer
})

export default rootReducer;