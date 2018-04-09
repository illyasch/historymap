'use strict'

export class markerClass {
    constructor(marker) {
        this.marker_id = marker.marker_id
        this.x = parseFloat(marker.x)
        this.y = parseFloat(marker.y)
        this.title = marker.title
        this.photoCnt = parseInt(marker.cnt)

        const icon = this.photoCnt > 0 ? 'static/img/Camera-Moto-icon.png' : null;

        this.googleMarker = new google.maps.Marker({
            position: {
                lat: parseFloat(this.x),
                lng: parseFloat(this.y)
            },
            title: this.title,
            icon: icon
        })
    }
}