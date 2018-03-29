'use strict'

const photos = (state = {dialog: null}, action) => {
    switch (action.type) {
        case 'OPEN_PHOTO_DIALOG':
            if (state.dialog && state.dialog.opened) {
                return state
            }

            return Object.assign({}, state, {
                dialog: {
                    opened: false,
                    marker_id: action.marker_id
                }
            })

        case 'CLOSE_PHOTO_DIALOG':
            return Object.assign({}, state, {
                dialog: null
            })

        case 'SET_PHOTO_DIALOG':
            const newDialog = Object.assign({}, state.dialog, {
                opened: true
            })

            return Object.assign({}, state, {
                dialog: newDialog
            })

        case 'SET_UPLOAD_PHOTO_STATUS':
            return Object.assign({}, state, {
                uploadPhotoStatus: action.status
            })

        default:
            return state
    }
}

export default photos