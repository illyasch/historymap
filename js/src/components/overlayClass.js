'use strict'

export class overlayClass {
    constructor(mapYear, src, bounds) {
        this.imgSrc = src
        this.year = mapYear

        this.image = new Image()
        this.image.src = this.imgSrc

        this.bounds = bounds

        this.groundOverlay = new google.maps.GroundOverlay(
            this.imgSrc,
            this.bounds,
            {clickable: false}
        )
    }
}