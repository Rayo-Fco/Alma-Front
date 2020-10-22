import { createStore, combineReducers } from 'redux';
import OpenReducer from './reducers/openDrawerReducer';
import LatLngReducer from './reducers/LatLngDrawerReducer';


const reducers = combineReducers({
    OpenReducer,
    LatLngReducer
});

const store = createStore(
    reducers,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;