import { combineReducers } from 'redux'
import overlays from './overlays'
import markers from './markers'
import photos from './photos'
import fetching from './fetching'
import years from './years'
import newElements from './newElements'
import photoswipe from './photoswipe'

export const historyMapApp = combineReducers({
    overlays,
    markers,
    photos,
    fetching,
    years,
    newElements,
    photoswipe
})