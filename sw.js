let staticCacheName = 'restaurantsV2';

//Creates the cache with all the required urls
self.addEventListener('install', function(event) {
    // event.waitUntil(
        // caches.open(staticCacheName).then(function(cache) {
        //     cache.addAll([
        //         //URLS TO ADD
        //         '/',
        //         '/index.html',
        //         '/restaurant.html'
        //         // '/css/styles.css',
        //         // '/js/dbhelper.js',
        //         // '/js/main.js',
        //         // '/js/restaurant_info.js',
        //     ]);
        // }).catch(function (error) {
        //     console.log('Error creating cache', error);
        // })
    // );
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

///Approach 1, chosing which files to add to cache.
// self.addEventListener('fetch', function(event) {
//     //Save all pictures to Cache
//     let url = event.request.url;
//     if(url.includes('jpg') || url.includes('.js') || url.includes('.css') || url.includes('.png')) {
//         caches.open(staticCacheName).then(function(cache) {
//             cache.add(url).catch(function (error) {
//                 console.log('saving cache', error);
//             });
//         });
//     }

//     //If it exists on cache load from there first..
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             if (response) {
//                 return response;
//             }
//             return fetch(event.request).catch(function(error){
//                 console.log('failed to fetch when not in cache', error)
//             });
//             // .catch(function(error) {
//             //     console.log('Failed while fetching data', error);
//             // });
//         }).catch(function(error) {
//             console.log('Error cache response', error);
//         })
//     );
// });

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(response){
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function(fetchedResponse) {
                    return caches.open(staticCacheName).then(function(cache) {
                        cache.add(event.request.url);
                        return fetchedResponse;
                    })
                }).catch(function(error) {
                    console.log('Failed to Load', error);
                });
            }
        })
    );
});