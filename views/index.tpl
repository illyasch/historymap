<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Ground Overlays</title>
    <style>
        /* Always set the map height explicitly to define the size of the div
         * element that contains the map. */
        #map {
            height: 100%;
        }
        /* Optional: Makes the sample page fill the window. */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body>
<div id="map"></div>
<script src="/static/js/bundle.js"></script>
<script>
    function initCall() {
        historyMap.initStore()
    }

</script>

<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBs2C33CsXOyjF9xLuorQqRfS1LvUoMB_4&callback=initCall">
</script>
</body>
</html>
