import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { default as initSubscriber } from 'redux-subscriber'
import { historyMapApp } from './reducers'
import { fetchImages } from './actions/fetchImages'
import { fetchMarkers } from './actions/fetchMarkers'
import { displayYears } from './actions/years'
import { historyMapClass } from './components/historyMapClass'
import { settings } from './settings'
import { photoDialogClass } from './components/photoDialogClass'

const store = createStore(
    historyMapApp,
    applyMiddleware(
        thunk, createLogger()
    )
)

const subscribe = initSubscriber(store)

export function initStore() {
    const historyMap = new historyMapClass(store)
    const photoDialog = new photoDialogClass(store)
    const mapRender = (state) => historyMap.render(state)
    const dialogRender = (state) => photoDialog.render(state)

    subscribe('markers', mapRender)
    subscribe('overlays', mapRender)
    subscribe('years', mapRender)
    subscribe('newElements', mapRender)
    subscribe('photos', dialogRender)

    store
        .dispatch(fetchImages(settings.apiURLs.imagesList))
        .then(() => store.dispatch(displayYears([1902])))
        .then(() => console.log(store.getState()))

    store
        .dispatch(fetchMarkers(settings.apiURLs.markersList))
        .then(() => console.log(store.getState()))
}