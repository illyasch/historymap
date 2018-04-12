'use strict'

import { settings } from '../settings'
import { displayYears } from '../actions/years'
import { createNewMarker, removeNewMarker } from '../actions/markers'
import {saveNewMarker} from "../actions/saveNewMarker"
import {uploadPhoto} from "../actions/uploadPhoto"
import {openPhotoDialog, closePhotoDialog, setPhotoDialog, setUploadPhotoStatus} from "../actions/photos"
import {fetchMarkerPhotos} from "../actions/fetchMarkerPhotos"

export class historyMapClass {
    constructor(store) {
        this.store = store

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            minZoom: 12,
            maxZoom: 16,
            center: {
                lat: 50.485037,
                lng: 30.433667
            }
        })

        this.map.setCenter({
            lat: 50.485037,
            lng: 30.433667
        })

        this.bounds2 = new google.maps.LatLngBounds(
            new google.maps.LatLng(50.425817, 30.472767),
            new google.maps.LatLng(50.486148, 30.559748)
        )

        this.allowedBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(settings.bounds1902.south, settings.bounds1902.west),
            new google.maps.LatLng(settings.bounds1902.north, settings.bounds1902.east)
        )

        this.images = this.overlays = [];

        const onClickListener = function(event) { this.createMarker(event) }.bind(this)

        this.map.addListener('click', onClickListener)

        this.map.addListener('zoom_changed', function() { this.checkLayers() }.bind(this))
        this.map.addListener('bounds_changed', function() { this.checkBounds() }.bind(this))
    }

    render(state) {
        console.log('historyMap render!')

        if(state.fetching.started) {
            return
        }

        this.renderOverlays(state.overlays, state.years)
        this.renderMarkers(state.markers)
        this.renderNewElements(state.newElements)
    }

    renderOverlays(overlays, years) {
        overlays.forEach((overlay, i) => {
            if (years.indexOf(overlay.year) != -1) {
                overlay.groundOverlay.setMap(this.map)
            } else {
                overlay.groundOverlay.setMap(null)
            }
        })
    }

    renderMarkers(markers) {
        markers.forEach((marker, i) => {
            marker.googleMarker.setMap(this.map)

            let markerClick
            if (marker.photoCnt > 0) {
                markerClick = () => this.store.dispatch(fetchMarkerPhotos(marker.marker_id))
            } else {
                markerClick = () => this.store.dispatch(openPhotoDialog(marker.marker_id))
            }

            marker.googleMarker.addListener('click', markerClick)
        })
    }

    renderNewElements(newElements) {
        newElements.forEach((element, i) => {
            this.createMarkerDialog(element)
        })
    }

    createMarker(event) {
        this.store.dispatch(createNewMarker(event.latLng))
    }

    checkLayers() {
        const zoom = this.map.getZoom();
        const C = this.map.getCenter();

        if (zoom > 13 && this.bounds2.contains(C)) {
            this.store.dispatch(displayYears([1902, 1911]));
        } else {
            this.store.dispatch(displayYears([1902]));
        }
    }

    checkBounds() {
        const C = this.map.getCenter();

        if (!this.allowedBounds.contains(C)) {
            let X = C.lng();
            let Y = C.lat();

            const AmaxX = this.allowedBounds.getNorthEast().lng();
            const AmaxY = this.allowedBounds.getNorthEast().lat();
            const AminX = this.allowedBounds.getSouthWest().lng();
            const AminY = this.allowedBounds.getSouthWest().lat();

            if (X < AminX) {X = AminX;}
            if (X > AmaxX) {X = AmaxX;}
            if (Y < AminY) {Y = AminY;}
            if (Y > AmaxY) {Y = AmaxY;}

            this.map.setCenter(new google.maps.LatLng(Y,X));
        }
    }

    createMarkerDialog(marker) {
        marker.setMap(this.map)

        const contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Добавить точку</h1>'+
            '<div id="bodyContent"><form id="markerForm" name="markerForm">'+
            '<p>Название<br><textarea name="markerName" id="markerName"></textarea></p>'+
            '<p><input id="markerSubmit" type="button" value="Добавить"> <input id="markerCancel" type="button" value="Отменить"></p>'+
            '</form></div>'+
            '</div>';

        const infoWindow = new google.maps.InfoWindow({
            content: contentString
        })

        const dispatch = this.store.dispatch

        google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById("markerSubmit").addEventListener("click", (e) => {
                e.stopPropagation()

                const title = document.getElementById("markerName").value;
                this.closeMarkerDialog(infoWindow, marker)

                dispatch(saveNewMarker(settings.apiURLs.markersCreate, marker.getPosition(), title))
            })

            document.getElementById("markerCancel").addEventListener("click", (e) => {
                e.stopPropagation()
                this.closeMarkerDialog(infoWindow, marker)
            })

            google.maps.event.addListener(infoWindow, 'closeclick', (e) => {
                this.closeMarkerDialog(infoWindow, marker)
            })
        })

        infoWindow.open(this.map, marker)
    }

    closeMarkerDialog(window, marker) {
        window.close()
        marker.setMap(null)
        this.store.dispatch(removeNewMarker(marker))
    }

    selectMarker(marker) {
        this.map.setCenter({
            lat: marker.x,
            lng: marker.y
        })
        this.map.setZoom(14)
    }
}