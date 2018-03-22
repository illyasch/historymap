'use strict'

const newElements = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_NEW_MARKER':
            let newMarker = new google.maps.Marker({
                position: action.position,
                title: ''
            })

            return [
                ...state,
                newMarker
            ]

        case 'REMOVE_NEW_MARKER':
            return state.filter((el) => el !== action.marker)

        default:
            return state
    }
}

export default newElements