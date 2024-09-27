const CACHE_NAME = 'PWAs';
const urlsToCache = [
  '/',
  '../cat.jpg'
];

self.addEventListener('install', (event) => {
   event.waitUntil(
     caches.open(CACHE_NAME).then((cache) => {
       return cache.addAll(urlsToCache);
     })
   );
 });
 
 self.addEventListener('fetch', (event) => {
   event.respondWith(
     caches.match(event.request).then((response) => {
       return response || fetch(event.request);
     })
   );
 });


 self.addEventListener('sync', e => {
  e.waitUntil(
    self.registration.showNotification("notification")
    .catch(err => console.log(err))
  )
}); 


