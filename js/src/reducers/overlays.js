'use strict'

import { overlayClass } from '../components/overlayClass'

const overlays = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_OVERLAY':
            const overlay = new overlayClass(
                parseInt(action.image.year),
                action.image.src,
                {
                    north: parseFloat(action.image.north),
                    west: parseFloat(action.image.west),
                    south: parseFloat(action.image.south),
                    east: parseFloat(action.image.east)
                }
            )

            return [
                ...state,
                overlay
            ]
        default:
            return state
    }
}

export default overlays