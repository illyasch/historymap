'use strict'

import {saveNewMarker} from "../actions/saveNewMarker"
import {removeNewMarker} from "../actions/markers"
import {settings} from "../settings"

export class markerDialogClass {
    constructor(store, map) {
        this.store = store
        this.map = map
    }

    render(state) {
        if (!state.newElements) {
            return
        }

        state.newElements.forEach((element, i) => {
            this.createMarkerDialog(element)
        })
    }

    createMarkerDialog(marker) {
        marker.setMap(this.map.map)

        const contentString = '<div class="markerDialog" id="content">'+
            '<div id="siteNotice"></div>'+
            '<h3 id="firstHeading">Добавить точку</h3>'+
            '<form id="markerForm" name="markerForm"><fieldset>'+
            '<label for="markerName">Название</label><textarea name="markerName" id="markerName"></textarea>'+
            '<input id="markerSubmit" type="button" value="Добавить"> <input id="markerCancel" type="button" value="Отменить">'+
            '</fieldset></form>'+
            '</div>';

        const infoWindow = new google.maps.InfoWindow({
            content: contentString
        })

        const dispatch = this.store.dispatch

        google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById("markerSubmit").addEventListener("click", ((marker) => (e) => {
                e.stopPropagation()

                const title = document.getElementById("markerName").value
                this.closeMarkerDialog(infoWindow, marker)

                dispatch(saveNewMarker(settings.apiURLs.markersCreate, marker.getPosition(), title))
            })(marker))

            document.getElementById("markerCancel").addEventListener("click", ((marker) => (e) => {
                e.stopPropagation()
                this.closeMarkerDialog(infoWindow, marker)
            })(marker))

            google.maps.event.addListener(infoWindow, 'closeclick', ((marker) => (e) => {
                this.closeMarkerDialog(infoWindow, marker)
            })(marker))
        })

        infoWindow.open(this.map, marker)
    }

    closeMarkerDialog(window, marker) {
        window.close()
        marker.setMap(null)
        this.store.dispatch(removeNewMarker(marker))
    }
}