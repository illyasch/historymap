'use strict'

export const placeMarker = (marker) => ({
    type: 'PLACE_MARKER',
    marker
})

export const startFetchingMarkers = () => ({
    type: 'START_FETCHING_MARKER'
})

export const finishFetchingMarkers = () => ({
    type: 'FINISH_FETCHING_MARKER'
})

export const createNewMarker = (position) => ({
    type: 'CREATE_NEW_MARKER',
    position
})

export const removeNewMarker = (marker) => ({
    type: 'REMOVE_NEW_MARKER',
    marker
})

export const clearMarkers = () => ({
    type: 'CLEAR_MARKERS'
})