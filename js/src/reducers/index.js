import { combineReducers } from 'redux'
import overlays from './overlays'
import markers from './markers'
import fetching from './fetching'
import years from './years'

export const historyMapApp = combineReducers({
    overlays,
    markers,
    fetching,
    years
})