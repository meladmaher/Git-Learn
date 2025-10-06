const CACHE_NAME = 'command-reference-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/data/commands.ts',
  '/hooks/useDebounce.ts',
  '/components/Header.tsx',
  '/components/CommandGrid.tsx',
  '/components/CommandCard.tsx',
  '/components/CommandModal.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0',
  'https://aistudiocdn.com/lucide-react@^0.544.0',
  'https://aistudiocdn.com/framer-motion@^12.23.22',
  'https://aistudiocdn.com/fuse.js@^7.1.0',
  'https://aistudiocdn.com/react-syntax-highlighter@^15.6.6'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all URLs to the cache
        return Promise.all(
            urlsToCache.map(url => {
                return cache.add(url).catch(error => {
                    console.error(`Failed to cache ${url}:`, error);
                });
            })
        );
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
