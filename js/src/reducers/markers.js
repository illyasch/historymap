'use strict'

import {markerClass} from "../components/markerClass"

const markers = (state = [], action) => {
    switch (action.type) {
        case 'PLACE_MARKER':
            const marker = new markerClass(action.marker)

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