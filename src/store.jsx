import { createStore, combineReducers } from 'redux';
import OpenReducer from './reducers/openDrawerReducer';
import LatLngReducer from './reducers/latLngReducer';
import CommunesReducer from './reducers/communesReducer';

const reducers = combineReducers({
    OpenReducer,
    LatLngReducer,
    CommunesReducer,
    
});

const store = createStore(
    reducers,
);

export default store;