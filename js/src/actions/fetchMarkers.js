'use strict'

import {placeMarker, startFetchingMarkers, finishFetchingMarkers} from './markers'
import {openPhotoDialog} from "./photos"

export function fetchMarkers(url) {
    return function (dispatch, getState) {
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

            json.Data.markers.forEach((marker) => dispatch(placeMarker(marker)))

            const {photos} = getState()
            if (photos.newMarkerId) {
                dispatch(openPhotoDialog(photos.newMarkerId))
            }
        }).catch(function(error) {
            console.log(error)
        })
    }
}