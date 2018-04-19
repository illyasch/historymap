'use strict'

import {
    closePhotoDialog,
    openPhotoDialog,
    saveNewMarkerId,
    setPhotoDialog,
    setUploadPhotoStatus
} from "../actions/photos"
import {uploadPhoto} from "../actions/uploadPhoto"
import {settings} from "../settings"
import {clearMarkers} from "../actions/markers"
import {fetchMarkers} from "../actions/fetchMarkers"

export class photoDialogClass {
    constructor(store, map) {
        this.store = store
        this.map = map
    }

    render(state) {
        this.renderPhotoDialog(state)
        this.renderPhotoStatusMessage(state)
    }

    renderPhotoDialog(state) {
        console.log('renderPhotoDialog')

        if (!state.photos || !state.photos.dialog || !state.photos.dialog.marker_id || state.photos.dialog.opened) {
            return
        }


        const marker = state.markers.find((el) => el.marker_id == state.photos.dialog.marker_id)

        console.log(marker)

        if (!marker) {
            return
        }

        const contentString = '<div class="photoUploadForm" id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading">Добавить фото</h3>' +
            '<div id="uploadStatusMessage"></div>' +
            '<form id="photoForm" name="photoForm"><fieldset>' +
            '<label for="photoText">Год</label><input type="text" name="photoYear" id="photoYear">' +
            '<label for="photoText">Название</label><textarea name="photoText" id="photoText"></textarea>' +
            '<input type="file" name="photoFile" id="photoFile">'+
            '<input id="photoSubmit" type="button" value="Сохранить"> <input id="photoNext" type="button" value="Еще фото &gt;&gt;">'+
            '</fieldset></form>'+
            '</div>';

        const infoWindow = new google.maps.InfoWindow({
            content: contentString
        })

        const dispatch = this.store.dispatch

        google.maps.event.addListener(infoWindow, 'domready', () => {
            const uploadFunc = (e) => {
                e.stopPropagation()

                const year = document.getElementById("photoYear").value
                const text = document.getElementById("photoText").value
                const file = document.getElementById("photoFile")

                if(file.files.length == 0) {
                    return false
                }

                infoWindow.close()

                dispatch(setUploadPhotoStatus(null))
                dispatch(uploadPhoto(settings.apiURLs.uploadPhoto, marker.marker_id, file, year, text))
                dispatch(closePhotoDialog())

                return true
            }

            document.getElementById("photoSubmit").addEventListener("click", uploadFunc)
            document.getElementById("photoNext").addEventListener("click", (e) => {
                if (uploadFunc(e)) {
                    dispatch(openPhotoDialog(marker.marker_id))
                }
            })

            google.maps.event.addListener(infoWindow, 'closeclick', (e) => {
                dispatch(closePhotoDialog())
                dispatch(saveNewMarkerId(null))
                dispatch(clearMarkers())
                dispatch(fetchMarkers(settings.apiURLs.markersList))
            })
        })

        infoWindow.open(this.map.map, marker.googleMarker)
        dispatch(setPhotoDialog())
    }

    renderPhotoStatusMessage(state) {
        if (!state.photos.uploadPhotoStatus) {
            return
        }

        let uploadStatusMessage = ''

        switch (state.photos.uploadPhotoStatus) {
            case 'success':
                uploadStatusMessage = '<p>Фото загружено!</p>'
                break;

            case 'error':
                uploadStatusMessage = '<p>Ошибка загрузки фото!</p>'
                break;

            case 'uploading':
                uploadStatusMessage = '<p>Загрузка фото...</p>'
                break;
        }

        const status = document.getElementById("uploadStatusMessage")

        if (!status) {
            return
        }

        status.innerHTML = uploadStatusMessage
    }
}