// service-worker.js

// 캐시할 파일들을 지정합니다.
const CACHE_NAME = "v0.1.0";
const urlsToCache = [
  "/",
  "/css/common.css",
  "/js/common.js",
  "/js/service-worker.js",
  "/images/short_icon-192x192.png",
];

// 설치 단계에서 파일들을 캐시합니다.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 캐시를 사용하여 요청에 응답합니다.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에 데이터가 있으면 캐시된 데이터를 반환합니다.
      if (response) {
        return response;
      }
      // 없으면 네트워크에서 요청하여 캐시에 저장합니다.
      return fetch(event.request).then((response) => {
        // 유효하지 않은 응답이면 그대로 반환합니다.
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // 복제된 응답을 캐시에 저장합니다.
        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// 새 버전의 서비스 워커가 활성화되었을 때 오래된 캐시를 제거합니다.
self.addEventListener("activate", (event) => {
  var cacheWhitelist = ["v0.1.0"];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
