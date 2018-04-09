'use strict';

class SettingsClass {
    constructor() {
        this.bounds1902 = {
            north: 50.558600,
            west: 30.32000,
            south: 50.419675,
            east: 30.573056
        }

        this.bounds1911 = {
            north: 50.486148,
            west: 30.472767,
            south: 50.425817,
            east: 30.559748
        }

        this.apiURLs = {
            imagesList: '/bgimages',
            markersCreate: '/markers/create',
            markersList: '/ru/markers/list',
            uploadPhoto: '/photos/upload',
            markerPhotosList: '/ru/photos/list'
        }

        this.photosDir = 'static/img/upload'
    }
}

export const settings = new SettingsClass()