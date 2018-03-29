'use strict'

export const openPhotoDialog = (marker_id) => ({
    type: 'OPEN_PHOTO_DIALOG',
    marker_id
})

export const closePhotoDialog = () => ({
    type: 'CLOSE_PHOTO_DIALOG'
})

export const setPhotoDialog = () => ({
    type: 'SET_PHOTO_DIALOG'
})

export const setUploadPhotoStatus = (status) => ({
    type: 'SET_UPLOAD_PHOTO_STATUS',
    status
})