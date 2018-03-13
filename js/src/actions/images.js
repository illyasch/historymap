'use strict'

export const createNewImage = (image) => ({
    type: 'CREATE_IMAGE',
    image: image
})

export const startFetchingImages = () => ({
    type: 'START_FETCHING_IMAGES'
})

export const finishFetchingImages = () => ({
    type: 'FINISH_FETCHING_IMAGES'
})