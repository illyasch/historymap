'use strict';

class SettingsClass {
    constructor() {
        this.map = [];

        const leftImage = new Image();
        leftImage.src = 'http://localhost/historymap/img/1902/left.png';

        this.map[1902] = {
            widthKoof: 0.022500 / leftImage.width,
            heightKoof: 0.02 / leftImage.height
        };

        const centerImage = new Image();
        centerImage.src = 'http://localhost/historymap/img/1911/center.png';

        this.map[1911] = {
            widthKoof: (30.559748 - 30.472767) / centerImage.width,
            heightKoof: (50.486148 - 50.425817) / centerImage.height
        };

        this.bounds1902 = {
            north: 50.558600,
            west: 30.32000,
            south: 50.419675,
            east: 30.573056
        };

        this.bounds1911 = {
            north: 50.486148,
            west: 30.472767,
            south: 50.425817,
            east: 30.559748
        };
    }
};

export const settings = new SettingsClass();