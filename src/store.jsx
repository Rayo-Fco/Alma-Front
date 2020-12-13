import { createStore, combineReducers } from 'redux';
import OpenReducer from './reducers/openDrawerReducer';
import LatLngReducer from './reducers/latLngReducer';
import CommunesReducer from './reducers/communesReducer';
import MarkerReducer from './reducers/markerReducer';

const reducers = combineReducers({
    OpenReducer,
    LatLngReducer,
    CommunesReducer,
    MarkerReducer,
    
});

const store = createStore(
    reducers,
);

export default store;