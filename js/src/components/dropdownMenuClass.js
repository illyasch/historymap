'use strict'

export class dropdownMenuClass {
    constructor(store, map) {
        this.store = store
        this.map = map
    }

    render(state) {
        if(!state.markers || state.fetching.started) {
            return
        }

        console.log('dropdownMenu render!')

        const markersUL = document.getElementById("ulMarkersList")
        if (!markersUL) {
            return
        }
        markersUL.innerHTML = ""

        const self = this;

        state.markers.forEach((marker) => {
            const li = document.createElement("li")
            markersUL.appendChild(li)

            li.outerHTML = '<li class="popover-item"><a class="popover-link" id="marker_link_' + marker.marker_id + '" href="#marker_' + marker.marker_id + '" title="' + marker.title + '">' + marker.title + '</a></li>'

            const a = document.getElementById("marker_link_" + marker.marker_id)
            if (a) {
                a.addEventListener("click", (e) => {
                    e.preventDefault()
                    self.map.selectMarker(marker)
                })
            }
        })
    }
}