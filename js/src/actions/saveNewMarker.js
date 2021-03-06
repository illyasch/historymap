'use strict'

import {saveNewMarkerId} from "./photos"
import {fetchMarkers} from "./fetchMarkers"
import {settings} from "../settings"
import {clearMarkers} from "./markers"

export function saveNewMarker(url, position, title) {
    const params = {
        lat: position.lat(),
        lng: position.lng(),
        title: title
    }

    return (dispatch) => {
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(params)
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }

            throw new Error("Oops, a new marker saving error!")
        }).then((json) => {
            if (json.Status == 'error') {
                console.log('A marker saving error:')
                console.log(json)

                throw new Error("Oops, a new marker creation error!")
            }

            dispatch(clearMarkers())
            dispatch(fetchMarkers(settings.apiURLs.markersList))
            dispatch(saveNewMarkerId(json.Data.newId))
        }).catch(function(error) {
            console.log(error)
        })
    }
}