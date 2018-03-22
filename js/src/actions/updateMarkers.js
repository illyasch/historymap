'use strict'

import {clearMarkers} from './markers'
import {fetchMarkers} from "./fetchMarkers";

export function updateMarkers(url) {
    return (dispatch) => {
        dispatch(clearMarkers())
        dispatch(fetchMarkers(url))
    }
}