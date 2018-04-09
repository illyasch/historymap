import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {  createLogger } from 'redux-logger'
import { historyMapApp } from './reducers'
import { fetchImages } from './actions/fetchImages'
import { fetchMarkers } from './actions/fetchMarkers'
import { displayYears } from './actions/years'
import { historyMapClass } from './components/historyMapClass'
import { settings } from './settings'
import { photoDialogClass } from './components/photoDialogClass'
import { photoSwipeClass } from './components/photoSwipeClass'
import { default as initSubscriber } from 'redux-subscriber'

const store = createStore(
    historyMapApp,
    applyMiddleware(
        thunk,  createLogger()
    )
)

const subscribe = initSubscriber(store)

export function initStore() {
    const historyMap = new historyMapClass(store)
    const photoDialog = new photoDialogClass(store)
    const photoSwipe = new photoSwipeClass(store)

    subscribe('markers', (state) => historyMap.render(state))
    subscribe('overlays', (state) => historyMap.render(state))
    subscribe('years', (state) => historyMap.render(state))
    subscribe('newElements', (state) => historyMap.render(state))

    subscribe('photos', (state) => photoDialog.render(state))
    subscribe('photoswipe', (state) => photoSwipe.render(state))

    store
        .dispatch(fetchImages(settings.apiURLs.imagesList))
        .then(() => store.dispatch(displayYears([1902])))
        .then(() => console.log(store.getState()))

    store
        .dispatch(fetchMarkers(settings.apiURLs.markersList))
        .then(() => console.log(store.getState()))
}