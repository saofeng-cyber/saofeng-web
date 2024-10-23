<script setup lang="ts">
const debounce = (callFun: () => void, delay: number = 3) => {
    let timer: NodeJS.Timeout | null = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callFun();
        }, delay * 1000);
    }
}

const debounceClcik = debounce(() => {
    console.log('防抖');
})
</script>
<template>
    <article class="mx-auto prose prose-slate md:prose-lg lg:prose-xl">
        <h2>Js</h2>
        <h3 class="cursor-pointer" @click="debounceClcik">防抖</h3>
        <ul>
            <li>浅拷贝：对于基本数据类型拷贝是完整的值，对于引用数据类型，拷贝是内存地址，如果对象中的某个值改变，会影响另一个对象</li>
            <li>深拷贝：重新开辟了一个堆内存，在新对的区域存放新对象，切修改新对象不会影像原对象</li>
        </ul>
        <pre>
            function deepCopy(target) {
                if (typeof target !== 'object' || target === null) {
                    return target;
                }
                let copy = Array.isArray(target) ? [] : {};
                for (let key in target) {
                    if (target.hasOwnProperty(key)) {
                        copy[key] = deepCopy(target[key]);
                    }
                }
                return copy;
            }
        </pre>
        <h3>原型链</h3>
        <p>
            每个函数身上都有一个 prototype 的原型对象，并且有一个__proto__的指针指向下一级原型对象，如果一个对象的属性或方法在自身中找不到，
            那么就会去 prototype 原型对象中查找，如果还找不到继续向上查找直到 null，当_proto_指针指向 null 时形成一个链条，这个链条叫做原型链。
            在原型链中，对象可以继承原型对象的属性和方法。如果想在后面所有构造函数中添加某些属性和方法，可以将它们添加到构造函数的 prototype 属性中，
            这样通过该构造函数创建的对象都可以访问到这些属性和方法。原型链的特点是：对象可以沿着原型链向上查找属性和方法，实现了属性和方法的共享和继承。
        </p>
        <h3>防抖</h3>
        <p>
            防抖是指在事件触发后一定时间内没有再次触发事件，才执行回调函数。如果在这段时间内再次触发事件，则重新计时。防抖的主要作用是防止频繁触发事件，
            导致性能问题。例如，在搜索框中输入文字时，可以使用防抖来限制搜索请求的频率，避免每次输入都发送请求。
        </p>
        <pre>
            function debounce(fn, delay) {
                let timer = null;
                return function() {
                    let context = this;
                    let args = arguments;
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        fn.apply(context, args);
                    }, delay);
                };
            }
        </pre>
        <h3>节流</h3>
        <p>
            节流是指在事件触发后一定时间内只执行一次回调函数。如果在这段时间内再次触发事件，则不会执行回调函数，直到时间间隔过去后再次触发事件才会执行。
            节流的主要作用是限制事件处理函数的执行频率，避免频繁执行导致性能问题。例如，在滚动页面时，可以使用节流来限制滚动事件的触发频率，避免滚动事件过于频繁导致性能问题。
        </p>
        <pre>
            function throttle(fn, delay) {
                let timer = null;
                return function() {
                    let context = this;
                    let args = arguments;
                    if (!timer) {
                        timer = setTimeout(function() {
                            fn.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                };
            }
        </pre>
        <h3>JS模块化有哪些</h3>
        <ul>
            <li>commonjs</li>
            <li>es6</li>
            <li>amd</li>
            <li>cmd</li>
        </ul>
        <h3>js中call、apply、bind有什么区别</h3>
        <ul>
            <li>修改 this 指向</li>
            <li>call, bind都是选项式传参，apply是数组式</li>
            <li>call、apply 会立即执行，bind 返回一个新函数，不会立即执行</li>
        </ul>
        <h3>闭包</h3>
        <p>
            闭包就是在一个函数内部创建另外一个函数，让你可以在一个内层函数中访问到外层函数的局部变量。
            简单来说，闭包就是可以读取其他函数内部局部变量的函数，本质上，闭包是将函数内部和函数外部连接起来的桥梁。
        </p>
        <h3>函数柯里化</h3>
        <p>
            函数柯里化是一种将接受多个参数的函数转换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。
        </p>
        <ul>
            <li>优点： 函数更好的复用，不需要传入一些重复的参数</li>
            <li>缺点： 可读性降低</li>
            <li>bind函数就是一个例子</li>
        </ul>
        <pre>
            function curry(fn, ...args) {
                return function(...newArgs) {
                    let allArgs = [...args, ...newArgs];
                    if (allArgs.length >= fn.length) {
                        return fn(...allArgs);
                    } else {
                        return curry(fn, ...allArgs);
                    }
                };
            }
        </pre>
        <h3>new的实现原理</h3>
        <ul>
            <li>new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一。</li>
            <li>new 运算符会进行如下的操作：</li>
            <li>创建一个空的简单JavaScript对象（即{}）；</li>
            <li>链接该对象（设置该对象的constructor）到另一个对象 ；</li>
            <li>将步骤1新创建的对象作为this的上下文 ；</li>
            <li>如果该函数没有返回对象，则返回this。</li>
        </ul>
        <pre>
            function myNew(constructor, ...args) {
                let obj = {};
                obj.__proto__ = constructor.prototype;
                let res = constructor.apply(obj, args);
                return (typeof res === 'object' && res !== null) ? res : obj;
            }
        </pre>
        <hr />
        <h2>Vue</h2>
        <h3>Vue生命周期</h3>
        <ul>
            <li>beforeCreate</li>
            <li>created</li>
            <li>beforeMount</li>
            <li>mounted</li>
            <li>beforeUpdate</li>
            <li>updated</li>
            <li>beforeDestroy</li>
            <li>destroyed</li>
        </ul>
        <h3>优化首屏加载可以从这几个方面开始</h3>
        <ul>
            <li>减少首屏JS、CSS代码量</li>
            <li>路由懒加载</li>
            <li>图片懒加载</li>
            <li>服务端渲染</li>
            <li>预渲染</li>
            <li>使用CDN</li>
            <li>使用http2</li>
            <li>使用缓存</li>
            <li>使用SSR</li>
            <li>使用PWA</li>
            <li>使用Tree Shaking</li>
        </ul>
    </article>
</template>
