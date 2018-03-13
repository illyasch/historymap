import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { historyMapApp } from './reducers'
import { fetchImages } from './actions/fetchImages'
import { fetchMarkers } from './actions/fetchMarkers'
import { displayYears } from './actions/years'
import { historyMapClass } from './components/historyMapClass'

const store = createStore(
    historyMapApp,
    applyMiddleware(
        thunk, // lets us dispatch() functions
        createLogger() // neat middleware that logs actions
    )
)

export function initStore() {
    const historyMap = new historyMapClass(store)

    store.subscribe(() => {
       historyMap.render(store.getState())
    })

    store
        .dispatch(fetchImages('/bgimages'))
        .then(() => store.dispatch(displayYears([1902])))
        .then(() => console.log(store.getState()))

    store
        .dispatch(fetchMarkers('/ru/markers'))
        .then(() => console.log(store.getState()))
}