'use strict'

export const createNewMarker = (marker) => ({
    type: 'CREATE_MARKER',
    marker: marker
})

export const startFetchingMarkers = () => ({
    type: 'START_FETCHING_MARKER'
})

export const finishFetchingMarkers = () => ({
    type: 'FINISH_FETCHING_MARKER'
})