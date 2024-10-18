export interface VirtualConfig {
  actualHeightContainer: any;
  scrollContainer: any;
  translateContainer: any;
  data: { value: any };
  itemHeight: any;
  itemContainer: any;
  offset: any;
  size: number;
}
export default function useVirtualList(config: VirtualConfig) {
  // 获取元素
  let actualHeightContainerEl = null,
    translateContainerEl = null,
    scrollContainerEl = null;
  // 数据源，便于后续直接访问
  let dataSource = [];

  onMounted(() => {
    actualHeightContainerEl = document.querySelector(
      config.actualHeightContainer
    );
    scrollContainerEl = document.querySelector(config.scrollContainer);
    translateContainerEl = document.querySelector(config.translateContainer);
  });

  // 数据源发生变动
  watch(
    () => config.data.value,
    (newValue) => {
      // 更新数据源
      dataSource = newValue;
      // 计算需要渲染的数据
      updateRenderData();
    }
  );

  /* 
  
  
  
    更新相关逻辑
  
  
  
  */
  // 更新实际高度
  let flag = false;
  const updateActualHeight = (oldValue: number, value: number) => {
    let actualHeight = 0;
    if (flag) {
      // 修复偏差
      actualHeight =
        actualHeightContainerEl.offsetHeight -
        (oldValue || config.itemHeight) +
        value;
    } else {
      // 首次渲染
      flag = true;
      for (let i = 0; i < dataSource.length; i++) {
        actualHeight += getItemHeightFromCache(i);
      }
    }
    actualHeightContainerEl.style.height = `${actualHeight}px`;
  };

  // 缓存已渲染元素的高度
  const RenderedItemsCache = {};
  const RenderedItemsCacheProxy = new Proxy(RenderedItemsCache, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      // 更新实际高度
      updateActualHeight(oldValue, value);
      return result;
    }
  });

  // 更新已渲染列表项的缓存高度
  const updateRenderedItemCache = (index: number) => {
    // 当所有元素的实际高度更新完毕，就不需要重新计算高度
    const shouldUpdate =
      Reflect.ownKeys(RenderedItemsCacheProxy).length < dataSource.length;
    if (!shouldUpdate) return;

    nextTick(() => {
      // 获取所有列表项元素(size条数)
      const Items = Array.from(document.querySelectorAll(config.itemContainer));
      // 进行缓存（通过下标作为key)
      for (let i = 0; i < Items.length; i++) {
        const el = Reflect.get(Items, i);
        const itemIndex = index + i;
        if (!Reflect.get(RenderedItemsCacheProxy, itemIndex)) {
          Reflect.set(RenderedItemsCacheProxy, itemIndex, el.offsetHeight);
        }
      }
    });
  };

  // 获取缓存高度，无缓存，取配置项的 itemHeight
  const getItemHeightFromCache = (index: number) => {
    const val = Reflect.get(RenderedItemsCacheProxy, index);
    return val === void 0 ? config.itemHeight : val;
  };

  // 实际渲染的数据
  const actualRenderData = ref([]);

  // 更新实际渲染数据
  const updateRenderData = (scrollTop = 0) => {
    let startIndex = 0;
    let offsetHeight = 0;

    for (let i = 0; i < dataSource.length; i++) {
      offsetHeight += getItemHeightFromCache(i);

      // 第几个以上进行隐藏
      if (offsetHeight >= scrollTop - (config.offset || 0)) {
        startIndex = i;
        break;
      }
    }
    // 计算得出的渲染数据
    actualRenderData.value = dataSource
      .slice(startIndex, startIndex + config.size)
      .map((data, idx) => {
        return {
          key: startIndex + idx + 1, // 为了在vue的for循环中绑定唯一key值
          data
        };
      });

    // 缓存最新的列表项高度
    updateRenderedItemCache(startIndex);

    updateOffset(offsetHeight - getItemHeightFromCache(startIndex));
  };

  // 更新偏移值
  const updateOffset = (offset: number) => {
    translateContainerEl.style.transform = `translateY(${offset}px)`;
  };

  /* 
  
  
  
    注册事件、销毁事件
  
  
  
  */
  // 滚动事件
  const handleScroll = (e) =>
    // 渲染正确的数据
    updateRenderData(e.target.scrollTop);

  // 注册滚动事件
  onMounted(() => {
    scrollContainerEl?.addEventListener('scroll', handleScroll);
  });

  // 移除滚动事件
  onBeforeUnmount(() => {
    scrollContainerEl?.removeEventListener('scroll', handleScroll);
  });

  return { actualRenderData };
}
