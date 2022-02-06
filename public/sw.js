const covidSpain2 = "covid-spain2"
const assets = [
    "/",
    "public/index.html",
    "scr/js/app.js",
    "src/icons/48x48-icon.png",
    "src/icons/96x96-icon.png",
    "src/icons/512x512-icon.png"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(covidSpain2).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})