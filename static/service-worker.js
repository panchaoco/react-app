const pageCacheName = 'PAGE_CACHE';
const apiCacheName = 'API_CACHE';

const cacheFileList = ['/index.html'];

function matchHtml(url) {
  return window.location.href.includes(url);
}

function matchApi(url) {
  return true;
}

window.self.addEventListener('install', e => {
  console.log('Service Worker 状态： install');
  const cacheOpenPromise = caches.open(pageCacheName).then((cache) => {
    return cache.addAll(cacheFileList);
  });
  e.waitUntil(cacheOpenPromise);
})

window.self.addEventListener('fetch', (e) => {
  console.log('现在正在请求：' + e.request.url);
  const currentUrl = e.request.url;
  // 匹配上页面路径
  if (matchHtml(currentUrl)) {
    const requestToCache = e.request.clone();
    e.respondWith(
      // 加载网络上的资源
      fetch(requestToCache).then((response) => {
        // 加载失败
        if (!response || response.status !== 200) {
          throw Error('response error');
        }
        // 加载成功，更新缓存
        const responseToCache = response.clone();
        caches.open(pageCacheName).then((cache) => {
          cache.put(requestToCache, responseToCache);
        });
        console.log(response);
        return response;
      }).catch(function() {
        // 获取对应缓存中的数据，获取不到则退化到获取默认首页
        return caches.match(e.request).then((response) => {
          return response || caches.match('/index.html');
        });
      })
    );
  } else if (matchApi(currentUrl)) {
    const requestToCache = e.request.clone();
    e.respondWith(
      fetch(requestToCache).then((response) => {
        if (!response || response.status !== 200) {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(apiCacheName).then((cache) => {
          cache.put(requestToCache, responseToCache);
        });
        return response;
      }).catch(function() {
        return caches.match(e.request);
      })
    );
  }
});

window.self.addEventListener('activate', (e) => {
  console.log('Service Worker 状态： activate');
  const cachePromise = caches.keys().then((keys) => {
    return Promise.all(keys.map((key) => {
      if (key !== pageCacheName && key !== apiCacheName) {
        return caches.delete(key);
      }
      return null;
    }));
  });
  e.waitUntil(cachePromise);
  // 快速激活 sw，使其能够响应 fetch 事件
  return window.self.clients.claim();
})
