'use strict'

import {settings} from '../settings'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

export class photoSwipeClass {
    constructor(store) {
        this.store = store
        this.open = false
    }

    render(state) {
        if (!state.photoswipe || !state.photoswipe.photos || this.open) {
            return
        }

        const pswpElement = document.querySelectorAll('.pswp')[0];

        const items = state.photoswipe.photos.map((e) => ({
            src: settings.photosDir + '/' + e.src,
            w: e.width,
            h: e.height,
            title: e.about
        }))

        const options = {
            index: 0 // start at first slide
        }

        this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
        this.gallery.init()

        this.gallery.listen('destroy', () => {
            this.open = false
        })
    }
}