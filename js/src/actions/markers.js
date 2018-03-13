'use strict'

export const placeMarker = (marker) => ({
    type: 'PLACE_MARKER',
    marker: marker
})

export const startFetchingMarkers = () => ({
    type: 'START_FETCHING_MARKER'
})

export const finishFetchingMarkers = () => ({
    type: 'FINISH_FETCHING_MARKER'
})