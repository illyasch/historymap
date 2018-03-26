'use strict'

import {openPhotoDialog} from "./photos"

export function uploadPhoto(url, marker_id, input, text) {
    const data = new FormData()
    data.append('file', input.files[0])
    data.append('marker_id', marker_id)
    data.append('text', text)

    return function (dispatch) {
        return fetch(url, {
            method: 'post',
            body: data
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }

            throw new Error("Oops, an upload photo error!");
        }).then(function(json) {
            if (json.Status == 'error') {
                console.log('An upload photo error:')
                console.log(json)

                throw new Error("\"Oops, an upload photo error!");
            }

            dispatch(openPhotoDialog(json.Data.newId))
        }).catch(function(error) {
            console.log(error)
        })
    }
}