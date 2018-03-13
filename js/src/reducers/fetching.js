'use strict'

function fetching(
    state = {started: false},
    action
) {
    switch (action.type) {
        case 'START_FETCHING_IMAGES':
        case 'START_FETCHING_MARKERS':
            return Object.assign({}, state, {
                started: true
            })

        case 'FINISH_FETCHING_IMAGES':
        case 'FINISH_FETCHING_MARKERS':
            return Object.assign({}, state, {
                started: false
            })

        default:
            return false
    }
}

export default fetching