'use strict'

import {closePhotoDialog, openPhotoDialog, setPhotoDialog, setUploadPhotoStatus} from "../actions/photos"
import {uploadPhoto} from "../actions/uploadPhoto"
import {settings} from "../settings"

export class photoDialogClass {
    constructor(store) {
        this.store = store
    }

    render(state) {
        this.renderPhotoDialog(state)
        this.renderPhotoStatusMessage(state)
    }

    renderPhotoDialog(state) {
        if (!state.photos || !state.photos.dialog || !state.photos.dialog.marker_id || state.photos.dialog.opened) {
            return
        }

        const marker = state.markers.find((el) => el.marker_id == state.photos.dialog.marker_id)

        if (!marker) {
            return
        }

        const contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Добавить фото</h1>' +
            '<div id="bodyContent"><form id="photoForm" name="photoForm">' +
            '<div id="uploadStatusMessage"></div>' +
            '<p>Название<br><textarea name="photoText" id="photoText"></textarea></p>' +
            '<p><input type="file" name="photoFile" id="photoFile"></p>'+
            '<p><input id="photoSubmit" type="button" value="Сохранить"> <input id="photoNext" type="button" value="Еще фото &gt;&gt;"></p>'+
            '</form></div>'+
            '</div>';

        const infoWindow = new google.maps.InfoWindow({
            content: contentString
        })

        const dispatch = this.store.dispatch

        google.maps.event.addListener(infoWindow, 'domready', () => {
            const uploadFunc = (e) => {
                e.stopPropagation()

                const text = document.getElementById("photoText").value
                const file = document.getElementById("photoFile")

                if(file.files.length == 0) {
                    return false
                }

                infoWindow.close()

                dispatch(setUploadPhotoStatus(null))
                dispatch(uploadPhoto(settings.apiURLs.uploadPhoto, marker.marker_id, file, text))
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
            })
        })

        infoWindow.open(this.map, marker.googleMarker)
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