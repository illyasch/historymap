'use strict'

import {placeMarker, startFetchingMarkers, finishFetchingMarkers} from './markers'

export function fetchMarkers(url) {
    return function (dispatch) {
        dispatch(startFetchingMarkers())

        return fetch(url).then(function(response) {
            dispatch(finishFetchingMarkers())

            if(response.ok) {
                return response.json();
            }

            throw new Error("Oops, we haven't got markers!")
        }).then(function(json) {
            if (json.Status == 'error') {
                console.log('A marker fetching error:')
                console.log(json)

                throw new Error("Oops, a new marker fetching error!")
            }

            json.Data.markers.forEach(function (marker) {
                dispatch(placeMarker(marker))
            })
        }).catch(function(error) {
            console.log(error);
        })
    }
}