'use strict'

import {startFetchingMarkers, finishFetchingMarkers} from './markers'
import {settings} from "../settings"
import {openPhotoSwipe} from "./photos"

let fetching = false

export function fetchMarkerPhotos(marker_id) {
    if (fetching) {
        console.log('falsestart fetchMarkerPhotos()')
        return (dispatch) => {}
    }

    const url = settings.apiURLs.markerPhotosList + '/' + marker_id

    return function (dispatch) {
        fetching = true
        dispatch(startFetchingMarkers())
        console.log('start fetchMarkerPhotos()')

        return fetch(url).then(function(response) {
            fetching = false
            dispatch(finishFetchingMarkers())
            console.log('finish fetchMarkerPhotos()')

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

            dispatch(openPhotoSwipe(json.Data.photos))
        }).catch(function(error) {
            console.log(error)
        })
    }
}