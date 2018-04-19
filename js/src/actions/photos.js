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

export const openPhotoSwipe = (photos) => ({
    type: 'OPEN_PHOTO_SWIPE',
    photos
})

export const closePhotoSwipe = () => ({
    type: 'CLOSE_PHOTO_SWIPE'
})

export const saveNewMarkerId = (newMarkerId) => ({
    type: 'SAVE_NEW_MARKER_ID',
    newMarkerId
})