'use strict'

import {openPhotoDialog, setUploadPhotoStatus} from "./photos"

export function uploadPhoto(url, marker_id, input, year, text) {
    const data = new FormData()
    data.append('file', input.files[0])
    data.append('marker_id', marker_id)
    data.append('year', year)
    data.append('text', text)

    return function (dispatch) {
        dispatch(setUploadPhotoStatus('uploading'))

        return fetch(url, {
            method: 'post',
            body: data
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }

            dispatch(setUploadPhotoStatus('error'))
            throw new Error("Oops, an upload photo error!");
        }).then(function(json) {
            if (json.Status == 'error') {
                console.log('An upload photo error:')
                console.log(json)

                dispatch(setUploadPhotoStatus('error'))
                throw new Error("\"Oops, an upload photo error!");
            }

            dispatch(setUploadPhotoStatus('success'))
        }).catch(function(error) {
            console.log(error)
        })
    }
}