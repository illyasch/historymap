'use strict'

const years = (state = [1902, 1911], action) => {
    switch (action.type) {
        case 'DISPLAY_YEARS':
            return action.years
        default:
            return state
    }
}

export default years