let staticCacheName = 'restaurantsV2';

//Creates the cache with all the required urls
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            cache.addAll([
                //URLS TO ADD
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
            ]);
        })
    );
});

//Deletes the old cache in case there is a new version
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurants') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        }).catch(function (error) {
            console.log('Deleting old cache error:', error);
        })
    );
});

self.addEventListener('fetch', function(event) {
    //Save all pictures to Cache
    if(event.request.url.includes('jpg')) {
        caches.open(staticCacheName).then(function(cache) {
            cache.add(event.request.url).catch(function (error) {
                console.log(error);
            });
        });
    }
    //If it exists on cache load from there first..
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
