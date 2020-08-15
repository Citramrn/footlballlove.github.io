importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

let urlsToCache = [{
        url: './index.html',
        revision: '2'
    },
    {
        url: './nav.html',
        revision: '2'
    },
    {
        url: './push.js',
        revision: '2'
    },
    {
        url: './manifest.json',
        revision: '2'
    },
    {
        url: './pages/history.html',
        revision: '2'
    },
    {
        url: './pages/klasemen.html',
        revision: '2'
    },
    {
        url: './pages/teams.html',
        revision: '2'
    },
    {
        url: './js/api.js',
        revision: '2'
    },
    {
        url: './js/db.js',
        revision: '2'
    },
    {
        url: './js/idb.js',
        revision: '2'
    },
    {
        url: './js/materialize.min.js',
        revision: '2'
    },
    {
        url: './js/reg-sw.js',
        revision: '2'
    },
    {
        url: './js/script.js',
        revision: '2'
    },
    {
        url: './css/materialize.min.css',
        revision: '2'
    },
    {
        url: './css/style.css',
        revision: '2'
    },
    {
        url: './icons/maskable_icon_192.png',
        revision: '2'
    },
    {
        url: './icons/maskable_icon_512.png',
        revision: '2'
    },
    {
        url: './img/delete.webp',
        revision: '2'
    },
    {
        url: './img/football.webp',
        revision: '2'
    },
    {
        url: './img/menu.svg',
        revision: '2'
    },
    {
        url: './img/save.webp',
        revision: '2'
    },
]

if (workbox) {

    workbox.precaching.precacheAndRoute(urlsToCache, {
        ignoreUrlParametersMatching: [/.*/]
    });

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'img',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                })
            ]
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate()
    );

    //menyimpan cache dari CSS Google Fonts
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    )

    //menyimpan cache untuk file font selama 1 tahun
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                })
            ]
        })
    )
} else {
    console.log(`workbox gagal dimuat`);
}


self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Yay!!! Berhasil Push Notifikasi';
    }
    let options = {
        body: body,
        icon: './icons/maskable_icon_512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});