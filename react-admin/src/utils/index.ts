
// 获取storage的大小
function getStorageSize(storage: Storage): number {
    let totalSize = 0;

    for (let i = 0; i < storage.length; i++) {
        const key: string | null = storage.key(i);
        if (key) {
            const value: string | null = storage.getItem(key);
            if (value) {
                totalSize += key.length + value.length;
            }
        }
    }

    return totalSize;
}

// 获取 localStorage 的大小
const localStorageSize:number = getStorageSize(localStorage);
// 获取 sessionStorage 的大小
const sessionStorageSize:number = getStorageSize(sessionStorage);

export {default as request} from './request'
export {
    getStorageSize,
    localStorageSize,
    sessionStorageSize
}
