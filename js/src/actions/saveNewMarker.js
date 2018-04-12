'use strict'

import {openPhotoDialog} from "./photos"

export function saveNewMarker(url, position, title) {
    const params = {
        lat: position.lat(),
        lng: position.lng(),
        title: title
    }

    return function (dispatch) {
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(params)
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }

            throw new Error("Oops, a new marker saving error!");
        }).then(function(json) {
            if (json.Status == 'error') {
                console.log('A marker saving error:')
                console.log(json)

                throw new Error("Oops, a new marker creation error!");
            }

            dispatch(openPhotoDialog(json.Data.newId))
        }).catch(function(error) {
            console.log(error)
        })
    }
}