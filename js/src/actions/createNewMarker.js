'use strict'

import {fetchMarkers} from "./fetchMarkers";
import {settings} from "../settings";

export function createNewMarker(url, position) {
    const params = {
        lat: position.lat(),
        lng: position.lng()
    }

    return function (dispatch) {
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(params)
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }

            throw new Error("Oops, a new marker creation error!");
        }).then(function(json) {
            if (json.status == 'error') {
                console.log('A marker creation error:')
                console.log(json)

                throw new Error("Oops, a new marker creation error!");
            }

            dispatch(fetchMarkers(settings.apiURLs.markersList))
        }).catch(function(error) {
            console.log(error)
        })
    }
}