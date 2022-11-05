/**
 * localStorage 存入
 * @param key key值
 * @param value 存入值
 */
export const setItem = (key: string, value: any) => {
    if (value instanceof Object) {
        value = JSON.stringify(value)
    } else {
        value = String(value)
    }
    window.localStorage.setItem(key, value)
}

/**
 * localStorage 取出
 * @param key 获取存入localStorage值的key
 * @returns 存入值
 */
export const getItem = (key: string) => {
    if (!key) {
        return null
    }

    let value = window.localStorage.getItem(key)

    return value ? JSON.parse(value) : null
}

/**
 * localStorage 删除
 * @param key 删除localStorage值的key
 */
export const removeItem = (key: string) => {
    window.localStorage.removeItem(key)
}

/**
 * 随机获取颜色
 * @param type 16进制颜色 或 rgb颜色
 * @returns 颜色值
 */
export const getRandomColor = (type?: string | number): string => {
    type = type ? type : ''
    if (type === 'rgb') {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return `rgb(${r},${g},${b})`
    } else {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        return color
    }
}

/**
 * 防抖函数：n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
 * @param func 函数
 * @param wait 等待时间
 * @param immediate 是否立即执行
 */
export function debounce(func: Function, wait: number, immediate?: boolean) {
    let timeout: any

    return function () {
        let context = this
        let args = arguments

        if (timeout) clearTimeout(timeout) // timeout 不为null
        if (immediate) {
            let callNow = !timeout // 第一次会立即执行，以后只有事件执行后才会再次触发
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            if (callNow) {
                func.apply(context, args)
            }
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
    }
}

export function debounce2(func: Function, wait: number) {
    let timer: any;
    return function() {
        let context = this; // 注意 this 指向
        let args = arguments; // arguments中存着e

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

/**
 * 函数节流：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
 * @param fn 函数
 * @param delay 等待时间
 */
export function throttled(fn: Function, delay: number) {
    let timer: any = null
    let starttime = Date.now()
    return function () {
        let curTime = Date.now() // 当前时间
        let remaining = delay - (curTime - starttime) // 从上一次到现在，还剩下多少多余时间
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            starttime = Date.now()
        } else {
            timer = setTimeout(fn, remaining)
        }
    }
}
