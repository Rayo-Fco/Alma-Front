import { createStore, combineReducers } from 'redux';
import OpenReducer from './reducers/openDrawerReducer';
import LatLngReducer from './reducers/latLngReducer';
import CommunesReducer from './reducers/communesReducer';
import IdMarkerReducer from './reducers/IdMarkerReducer';

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