'use strict'

import { settings } from '../settings'
import { displayYears } from '../actions/years'
import { createNewMarker, removeNewMarker } from '../actions/markers'
import {saveNewMarker} from "../actions/saveNewMarker"
import {openPhotoDialog} from "../actions/photos"
import {fetchMarkerPhotos} from "../actions/fetchMarkerPhotos"

export class historyMapClass {
    constructor(store) {
        this.store = store

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: settings.minZoom,
            minZoom: settings.minZoom,
            maxZoom: settings.maxZoom,
            center: settings.mapCenter,
            mapTypeControl: false,
            fullscreenControl: false
        })

        this.map.setCenter(settings.mapCenter)

        this.innerBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(settings.innerBounds.south, settings.innerBounds.west),
            new google.maps.LatLng(settings.innerBounds.north, settings.innerBounds.east)
        )

        this.allowedBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(settings.bounds1902.south, settings.bounds1902.west),
            new google.maps.LatLng(settings.bounds1902.north, settings.bounds1902.east)
        )

        this.images = this.overlays = []

        this.map.addListener('click', (event) => this.createMarker(event))

        this.map.addListener('zoom_changed', () => this.checkLayers())
        this.map.addListener('bounds_changed', () => this.checkBounds())
    }

    render(state) {
        console.log('historyMap render!')

        if(state.fetching.started) {
            return
        }

        this.renderOverlays(state.overlays, state.years)
        this.renderMarkers(state.markers)
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

    createMarker(event) {
        this.store.dispatch(createNewMarker(event.latLng))
    }

    checkLayers() {
        const zoom = this.map.getZoom()
        const C = this.map.getCenter()

        if (zoom >= settings.enable1911Zoom && this.innerBounds.contains(C)) {
            this.store.dispatch(displayYears([1902, 1911]))
        } else {
            this.store.dispatch(displayYears([1902]))
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

    selectMarker(marker) {
        this.map.setCenter({
            lat: marker.x,
            lng: marker.y
        })
        this.map.setZoom(settings.selectMarkerZoom)
    }
}