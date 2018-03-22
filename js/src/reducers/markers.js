'use strict'

const markers = (state = [], action) => {
    switch (action.type) {
        case 'PLACE_MARKER':
            let marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(action.marker.x),
                    lng: parseFloat(action.marker.y)
                },
                title: action.marker.title
            })

            return [
                ...state,
                marker
            ]

        case 'CLEAR_MARKERS':
            return []
        
        default:
            return state
    }
}

export default markers