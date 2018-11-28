const files = [
    '/',
    '/style.css',
    '/assets/fonts/fonts.css',
    '/assets/fonts/RobotoSlab-Regular.ttf',
    '/assets/images/bg-carrousel.jpg',
    '/assets/images/bg-carrousel.webp',
    '/assets/images/bg-universe.svg',
    '/assets/images/darken.png',
    '/assets/images/social-media.svg',
    '/assets/images/icon-16x16.png',
    '/assets/images/icon-24x24.png',
    '/assets/images/icon-32x32.png',
    '/assets/images/icon-48x48.png',
    '/assets/images/icon-57x57.png',
    '/assets/images/icon-64x64.png',
    '/assets/images/icon-72x72.png',
    '/assets/images/icon-114x114.png',
    '/assets/images/icon-120x120.png',
    '/assets/images/icon-144x144.png',
    '/assets/images/icon-152x152.png',
    '/scripts/cssrelpreload.js',
    '/scripts/loadCSS.js',
    '/scripts/registerSW.js',
    '/bundle.min.js',
    '/0.bundle.min.js',
    '/favicon.ico'
];

self.addEventListener("install", function (event) {

    caches.open('securitypls').then(cache => {
        cache.addAll(files);
    });
});

self.addEventListener("fetch", function (event) {

    let request = event.request;
    let promise = caches.match(request).then(responseCache => {
        let response = responseCache ? responseCache : fetch(request);
        return response;
    });

    event.respondWith(promise);
});
