<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Историческая карта Киева начала XX века, на которой размещены фото тех лет">
    <title>Историческая карта Киева</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
	<link rel="stylesheet" href="static/css/milligram.min.css">
    <link rel="stylesheet" href="static/css/photoswipe.css">
    <link rel="stylesheet" href="static/css/default-skin/default-skin.css">
    <link rel="stylesheet" href="static/css/main.css">
    <style>
        /* Always set the map height explicitly to define the size of the div
         * element that contains the map. */
        #map {
            height: 60rem;
        }
    </style>
</head>

<body>
    <main class="wrapper">
        <nav class="navigation">
            <section class="container">
                <h1 class="title">Историческая карта Киева</h1>
                <ul class="navigation-list float-right">
                    <li class="navigation-item">
                        <a class="navigation-link" href="#popover-markers" data-popover><img class="img" src="static/img/camera-64x64.png">
                        </a>
                        <div class="popover" id="popover-markers">
                            <ul class="popover-list" id="ulMarkersList">
                            </ul>
                        </div>
                    </li>
                    <li class="navigation-item">
                        <a class="navigation-link" href="#popover-add" data-popover><img class="img" src="static/img/location-marker-64x64.png"></a>
                        <div class="popover popover-wide" id="popover-add">
                            <ul class="popover-list">
                                <li class="popover-item"><div class="popover-text">Добавьте маркер на карте, кликнув на то место, куда хотите его поставить</div></li>
                                <li class="popover-item"><div class="popover-text">Загрузите фото, и они будут привязаны к маркеру и видны на карте</div></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </section>
        </nav>

        <section class="container" id="examples">
            <div class="row" id="map"></div>
        </section>
    </main>

    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- Background of PhotoSwipe.
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

            <!-- Container that holds slides.
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                Don't modify these 3 pswp__item elements, data is added later on. -->
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">

                <div class="pswp__top-bar">

                    <!--  Controls are self-explanatory. Order can be changed. -->

                    <div class="pswp__counter"></div>

                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                    <button class="pswp__button pswp__button--share" title="Share"></button>

                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                    <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                          <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                          </div>
                        </div>
                    </div>
                </div>

                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>

                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                </button>

                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                </button>

                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="/static/js/bundle.js"></script>
    <script>
        function initCall() {
            historyMap.initStore()
        }
    </script>
    <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBs2C33CsXOyjF9xLuorQqRfS1LvUoMB_4&callback=initCall">
    </script>
    <script src="static/js/menu-popover.js"></script>
</body>
</html>
