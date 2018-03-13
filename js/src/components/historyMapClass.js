'use strict'

import { settings } from '../settings'
import { displayYears } from '../actions/years'
import { createNewMarker } from '../actions/createNewMarker'

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

        google.maps.event.addListener(this.map, 'click', function(event) {
            console.log('Yes!')
            this.createMarker(event)
        }.bind(this))

        this.map.addListener('zoom_changed', function() { this.checkLayers() }.bind(this))
        this.map.addListener('bounds_changed', function() { this.checkBounds() }.bind(this))
    }

    render(state) {
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
            marker.setMap(this.map)
        })
    }

    createMarker(event) {
        console.log('Create Marker!')
        this.store.dispatch(createNewMarker('/createmarker', event.latLng))
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
}