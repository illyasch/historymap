'use strict'

export function createNewMarker(url, position) {
    return function (dispatch) {
        return fetch(url + '?lat=' + position.lat() + '&lng=' + position.lng()).then(function(response) {
            if(response.ok) {
                return response.json();
            }

            throw new Error("Oops, a new marker creation error!");
        }).then(function(json) {
            console.log('A new marker:')
            console.log(json)
        }).catch(function(error) {
            console.log(error)
        })
    }
}