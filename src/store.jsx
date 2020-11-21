import { createStore, combineReducers } from 'redux';
import OpenReducer from './reducers/openDrawerReducer';
import LatLngReducer from './reducers/latLngReducer';
import CommunesReducer from './reducers/communesReducer';
import IdMarkerReducer from './reducers/idMarkerReducer';

const reducers = combineReducers({
    OpenReducer,
    LatLngReducer,
    CommunesReducer,
    IdMarkerReducer
});

const store = createStore(
    reducers,
);

export default store;