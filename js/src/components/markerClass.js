'use strict'

export class markerClass {
    constructor(marker) {
        this.marker_id = marker.marker_id
        this.x = parseFloat(marker.x)
        this.y = parseFloat(marker.y)
        this.title = marker.title
        this.photoCnt = parseInt(marker.cnt)

        let icon, help
        if (this.photoCnt > 0) {
            icon = 'static/img/Camera-Moto-icon.png'
            help = 'Просмотреть фото'
        } else {
            icon = 'static/img/marker_green.png'
            help = 'Добавить фото'
        }

        this.googleMarker = new google.maps.Marker({
            position: {
                lat: parseFloat(this.x),
                lng: parseFloat(this.y)
            },
            title: help,
            label: {
                color: 'black',
                fontWeight: 'normal',
                text: this.title,
            },
            icon: {
                url: icon,
                labelOrigin: new google.maps.Point(11, 50)
            }
        })
    }
}