export class Fetcher {
	static request(url:string, data?) {
		return fetch(url, {body:JSON.stringify(data)}).then((r)=>r.json());
	}
}

export const memoizePromiseFn = (fn) => {
    const cache = new Map();

    return (...args) => {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        cache.set(key, fn(...args).catch((error) => {
            // Delete cache entry if API call fails
            cache.delete(key);
            return Promise.reject(error);
        }));

        return cache.get(key);
    };
};

export function fetchTodo(url) {
	return fetch(url)
    .then((response) => response.json())
    .then((json) => json);
  }
