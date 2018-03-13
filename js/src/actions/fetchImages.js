'use strict'

import {startFetchingImages, finishFetchingImages} from './images'
import {createOverlay} from './overlays'

export function fetchImages(url) {
    return function (dispatch) {
        dispatch(startFetchingImages())

        return fetch(url).then(function(response) {
            if(response.ok) {
                return response.json();
            }

            throw new Error("Oops, we haven't got images!");
        }).then(function(json) {
            json.forEach(function (image) {
                dispatch(createOverlay(image))
                //console.log(createOverlay(image))
            });

            dispatch(finishFetchingImages())
        }).catch(function(error) {
            console.log(error);

            dispatch(finishFetchingImages())
        });
    }
}