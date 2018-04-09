'use strict'

const photoswipe = (state = {}, action) => {
    switch (action.type) {

        case 'OPEN_PHOTO_SWIPE':
            return Object.assign({}, state, {
                photos: action.photos
            })

        default:
            return state
    }
}

export default photoswipe