'use strict'

import {placeMarker, startFetchingMarkers, finishFetchingMarkers} from './markers'

export function fetchMarkers(url) {
    return function (dispatch) {
        dispatch(startFetchingMarkers())

        return fetch(url).then(function(response) {
            if(response.ok) {
                return response.json();
            }

            throw new Error("Oops, we haven't got images!");
        }).then(function(json) {
            json.forEach(function (marker) {
                dispatch(placeMarker(marker))
                //console.log(createOverlay(image))
            });

            dispatch(finishFetchingMarkers())
        }).catch(function(error) {
            console.log(error);

            dispatch(finishFetchingMarkers())
        });
    }
}