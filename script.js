// 产品图片数据 - 使用本地图片
// 支持 WebP 格式，自动回退到 JPG
// 使用绝对路径确保在 Vercel 上正确加载
const productImages = [
    {
        id: 1,
        image: '/Picture/1.webp',
        fallback: '/Picture/1.jpg',
        name: '产品1'
    },
    {
        id: 2,
        image: '/Picture/2.webp',
        fallback: '/Picture/2.jpg',
        name: '产品2'
    },
    {
        id: 3,
        image: '/Picture/3.webp',
        fallback: '/Picture/3.jpg',
        name: '产品3'
    },
    {
        id: 4,
        image: '/Picture/4.webp',
        fallback: '/Picture/4.jpg',
        name: '产品4'
    },
    {
        id: 5,
        image: '/Picture/5.webp',
        fallback: '/Picture/5.jpg',
        name: '产品5'
    },
    {
        id: 6,
        image: '/Picture/6.webp',
        fallback: '/Picture/6.jpg',
        name: '产品6'
    },
    {
        id: 7,
        image: '/Picture/7.webp',
        fallback: '/Picture/7.jpg',
        name: '产品7'
    },
    {
        id: 8,
        image: '/Picture/8.webp',
        fallback: '/Picture/8.jpg',
        name: '产品8'
    },
    {
        id: 9,
        image: '/Picture/9.webp',
        fallback: '/Picture/9.jpg',
        name: '产品9'
    },
    {
        id: 10,
        image: '/Picture/10.webp',
        fallback: '/Picture/10.jpg',
        name: '产品10'
    },
    {
        id: 11,
        image: '/Picture/11.webp',
        fallback: '/Picture/11.jpg',
        name: '产品11'
    },
    {
        id: 12,
        image: '/Picture/12.webp',
        fallback: '/Picture/12.jpg',
        name: '产品12'
    },
    {
        id: 13,
        image: '/Picture/13.webp',
        fallback: '/Picture/13.jpg',
        name: '产品13'
    },
    {
        id: 14,
        image: '/Picture/14.webp',
        fallback: '/Picture/14.jpg',
        name: '产品14'
    },
    {
        id: 15,
        image: '/Picture/15.webp',
        fallback: '/Picture/15.jpg',
        name: '产品15'
    },
    {
        id: 16,
        image: '/Picture/16.webp',
        fallback: '/Picture/16.jpg',
        name: '产品16'
    },
    {
        id: 17,
        image: '/Picture/17.webp',
        fallback: '/Picture/17.jpg',
        name: '产品17'
    },
    {
        id: 18,
        image: '/Picture/18.webp',
        fallback: '/Picture/18.jpg',
        name: '产品18'
    },
    {
        id: 19,
        image: '/Picture/19.webp',
        fallback: '/Picture/19.jpg',
        name: '产品19'
    },
    {
        id: 20,
        image: '/Picture/20.webp',
        fallback: '/Picture/20.jpg',
        name: '产品20'
    },
    {
        id: 21,
        image: '/Picture/21.webp',
        fallback: '/Picture/21.jpg',
        name: '产品21'
    },
    {
        id: 22,
        image: '/Picture/22.webp',
        fallback: '/Picture/22.jpg',
        name: '产品22'
    },
    {
        id: 23,
        image: '/Picture/23.webp',
        fallback: '/Picture/23.jpg',
        name: '产品23'
    },
    {
        id: 24,
        image: '/Picture/24.webp',
        fallback: '/Picture/24.jpg',
        name: '产品24'
    },
    {
        id: 25,
        image: '/Picture/25.webp',
        fallback: '/Picture/25.jpg',
        name: '产品25'
    },
    {
        id: 26,
        image: '/Picture/26.webp',
        fallback: '/Picture/26.jpg',
        name: '产品26'
    },
    {
        id: 27,
        image: '/Picture/27.webp',
        fallback: '/Picture/27.jpg',
        name: '产品27'
    },
    {
        id: 28,
        image: '/Picture/28.webp',
        fallback: '/Picture/28.jpg',
        name: '产品28'
    },
    {
        id: 29,
        image: '/Picture/29.webp',
        fallback: '/Picture/29.jpg',
        name: '产品29'
    },
    {
        id: 30,
        image: '/Picture/30.webp',
        fallback: '/Picture/30.jpg',
        name: '产品30'
    },
    {
        id: 31,
        image: '/Picture/31.webp',
        fallback: '/Picture/31.jpg',
        name: '产品31'
    },
    {
        id: 32,
        image: '/Picture/32.webp',
        fallback: '/Picture/32.jpg',
        name: '产品32'
    },
    {
        id: 33,
        image: '/Picture/33.webp',
        fallback: '/Picture/33.jpg',
        name: '产品33'
    },
    {
        id: 34,
        image: '/Picture/34.webp',
        fallback: '/Picture/34.jpg',
        name: '产品34'
    },
    {
        id: 35,
        image: '/Picture/35.webp',
        fallback: '/Picture/35.jpg',
        name: '产品35'
    },
    {
        id: 36,
        image: '/Picture/36.webp',
        fallback: '/Picture/36.jpg',
        name: '产品36'
    },
    {
        id: 37,
        image: '/Picture/37.webp',
        fallback: '/Picture/37.jpg',
        name: '产品37'
    },
    {
        id: 38,
        image: '/Picture/38.webp',
        fallback: '/Picture/38.jpg',
        name: '产品38'
    }
];

// 检测是否为移动设备（包括平板）
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent.toLowerCase());
    return isMobile || isTablet || window.innerWidth <= 768;
}

// 检测是否为低速网络
function isSlowNetwork() {
    // 检查网络信息API（如果支持）
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            // 如果是2G或慢速3G，认为是低速网络
            const slowConnections = ['slow-2g', '2g'];
            return slowConnections.includes(connection.effectiveType);
        }
    }
    return false;
}

// 检测浏览器是否支持 WebP（增强版，更好的兼容性检测）
function supportsWebP() {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const result = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        console.log(`WebP支持检测: ${result ? '支持' : '不支持'}`);
        return result;
    } catch (e) {
        console.warn('WebP检测失败，默认不支持:', e);
        return false;
    }
}

// 图片版本号，用于强制刷新缓存（更新图片时修改此版本号）
// 使用时间戳确保每次部署后图片都能及时更新
const IMAGE_VERSION = '202412071300';

// 获取图片 URL（支持 WebP 回退，移动端优先使用JPG，添加版本号防止缓存）
function getImageUrl(item) {
    const isMobile = isMobileDevice();
    const isSlow = isSlowNetwork();
    
    // 添加版本号查询参数，防止浏览器缓存
    // 使用固定的版本号，避免刷新时URL不一致导致图片无法加载
    const addVersion = (url) => {
        if (!url) return url;
        const separator = url.includes('?') ? '&' : '?';
        // 使用固定版本号，确保URL一致性
        // 如果需要强制刷新，应该更新 IMAGE_VERSION 常量，而不是使用时间戳
        return `${url}${separator}v=${IMAGE_VERSION}`;
    };
    
    // 移动端或低速网络优先使用JPG（更快更稳定）
    if (isMobile || isSlow) {
        console.log('移动端/低速网络：优先使用JPG格式');
        const jpgUrl = item.fallback || item.image.replace('.webp', '.jpg');
        return addVersion(jpgUrl);
    }
    
    // 桌面端：如果浏览器支持 WebP，使用 WebP，否则使用 JPG
    if (supportsWebP() && item.image) {
        return addVersion(item.image);
    }
    const jpgUrl = item.fallback || item.image.replace('.webp', '.jpg');
    return addVersion(jpgUrl);
}

// 存储用户答案
let answers = {};
let currentIndex = 0;
let autoPlayTimer = null; // 自动轮播定时器
const AUTO_PLAY_INTERVAL = 5000; // 自动轮播间隔（5秒）
let heartCounts = {}; // 每个产品的爱心数量，初始值为2000
let productJumpTimers = {}; // 存储每个产品的跳转定时器
let pendingHeartUpdates = {}; // 存储待处理的爱心更新队列 { productIndex: pendingIncrement }
let updateLocks = {}; // 防止并发更新的锁 { productIndex: isUpdating }
let lastUpdateTime = {}; // 记录每个产品的最后更新时间 { productIndex: timestamp }
let loadingQueue = []; // 图片加载队列，控制并发加载数量
let activeLoads = 0; // 当前正在加载的图片数量
const MAX_CONCURRENT_LOADS = isMobileDevice() ? 3 : 4; // 移动端最多3个并发，桌面端4个（提高移动端加载速度）
let clickTimers = {}; // 点击防抖定时器 { productIndex: timer }
const CLICK_DEBOUNCE_DELAY = 500; // 点击防抖延迟（毫秒），防止快速点击

// 初始化问卷
async function initQuestionnaire() {
    const carouselWrapper = document.getElementById('carouselWrapper');
    
    // 如果已经初始化过，先清空容器（刷新时）
    if (carouselWrapper.hasChildNodes()) {
        console.log('检测到刷新，清空现有内容...');
        carouselWrapper.innerHTML = '';
        // 重置全局状态
        currentIndex = undefined;
    }
    
    // 先尝试从服务器加载爱心数量（如果失败，使用默认值）
    console.log('开始从服务器加载爱心数量...');
    await loadHeartCountsFromServer();
    
    // 确保轮播容器样式正确
    const carouselContainer = carouselWrapper.parentElement;
    if (carouselContainer) {
        carouselContainer.style.overflow = 'hidden';
        carouselContainer.style.width = '100%';
        carouselContainer.style.position = 'relative';
    }
    carouselWrapper.style.display = 'flex';
    carouselWrapper.style.width = 'auto';
    carouselWrapper.style.minWidth = '100%';
    carouselWrapper.style.overflow = 'visible';
    
    // 创建所有产品卡片（此时heartCounts已经有数据了）
    productImages.forEach((item, index) => {
        const card = createProductCard(item, index);
        carouselWrapper.appendChild(card);
    });
    
    // 再次确保显示正确的数量（防止创建卡片时覆盖）
    productImages.forEach((item, index) => {
        const countDisplay = document.querySelector(`.heart-count[data-product-index="${index}"]`);
        if (countDisplay && heartCounts[index] !== undefined) {
            countDisplay.textContent = formatNumber(heartCounts[index]);
        }
    });
    
    // 等待一帧确保DOM完全渲染
    requestAnimationFrame(() => {
        // 再次确保轮播容器宽度正确
        const carouselContainer = carouselWrapper.parentElement;
        if (carouselContainer) {
            const containerWidth = carouselContainer.offsetWidth || window.innerWidth;
            const allCards = carouselWrapper.querySelectorAll('.product-card');
            allCards.forEach(card => {
                card.style.minWidth = `${containerWidth}px`;
                card.style.width = `${containerWidth}px`;
                card.style.flexShrink = '0';
                card.style.flexBasis = `${containerWidth}px`;
            });
        }
        
        // 显示第一个产品
        showProduct(0);
        updateProgress();
        updateNavButtons();
    });
    
    // 定期从服务器同步爱心数量（每10秒）
    setInterval(async () => {
        await loadHeartCountsFromServer();
    }, 10000);
    
    // 监听窗口大小变化，重新计算轮播位置
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (currentIndex !== undefined) {
                const carouselContainer = carouselWrapper.parentElement;
                if (carouselContainer) {
                    const containerWidth = carouselContainer.offsetWidth || window.innerWidth;
                    const allCards = carouselWrapper.querySelectorAll('.product-card');
                    allCards.forEach(card => {
                        card.style.minWidth = `${containerWidth}px`;
                        card.style.width = `${containerWidth}px`;
                        card.style.flexShrink = '0';
                        card.style.flexBasis = `${containerWidth}px`;
                    });
                    // 重新定位当前产品
                    showProduct(currentIndex);
                }
            }
        }, 100);
    });
}

// 创建产品卡片
function createProductCard(item, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.index = index;
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image-container';
    
    // 立即设置容器样式，防止首次加载时布局偏移
    imageContainer.style.width = '100%';
    imageContainer.style.height = '75vh';
    imageContainer.style.minHeight = '70vh';
    imageContainer.style.maxHeight = '85vh';
    imageContainer.style.position = 'relative';
    imageContainer.style.display = 'block';
    imageContainer.style.overflow = 'hidden';
    
    // 统一使用click事件，CSS的touch-action: manipulation已经防止了双击缩放
    imageContainer.onclick = () => selectProduct(index);
    
    // 添加加载占位符
    const loadingPlaceholder = document.createElement('div');
    loadingPlaceholder.className = 'image-loading';
    loadingPlaceholder.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">加载中...</div>
    `;
    
    const img = document.createElement('img');
    img.className = 'product-image';
    img.alt = item.name;
    
    // 立即设置图片样式，使用绝对定位确保始终居中（使用!important确保优先级）
    img.style.setProperty('position', 'absolute', 'important');
    img.style.setProperty('top', '50%', 'important');
    img.style.setProperty('left', '50%', 'important');
    img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
    img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
    img.style.setProperty('max-width', 'calc(100% - 20px)', 'important');
    img.style.setProperty('max-height', 'calc(75vh - 20px)', 'important');
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.objectFit = 'contain';
    img.style.setProperty('display', 'block', 'important');
    img.style.setProperty('margin', '0', 'important');
    
    // 获取图片 URL（支持 WebP 回退）
    const imageUrl = getImageUrl(item);
    // 生成fallback URL，确保也包含版本号
    const baseFallback = item.fallback || item.image.replace('.webp', '.jpg');
    const fallbackUrl = baseFallback.includes('?') 
        ? baseFallback 
        : `${baseFallback}?v=${IMAGE_VERSION}`;
    
    // 检测是否为移动设备（用于设置加载策略）
    const isMobile = isMobileDevice();
    
    // 移动端优化：前3张图片立即加载，提高首屏速度
    // 桌面端：第一张立即加载，其他懒加载
    const shouldLoadImmediately = isMobile ? (index < 3) : (index === 0);
    
    if (shouldLoadImmediately) {
        // 立即加载的图片
        img.loading = 'eager';
        // 使用 fetchPriority 优化加载优先级（如果浏览器支持）
        if ('fetchPriority' in img) {
            img.fetchPriority = index === 0 ? 'high' : 'auto';
        }
        img.dataset.src = imageUrl;
        img.dataset.fallback = fallbackUrl;
        img.dataset.loaded = 'false';
        
        // 显示加载占位符
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'flex';
        }
        
        // 设置超时，如果10秒后还没加载完成，隐藏占位符
        const loadTimeout = setTimeout(() => {
            if (img.dataset.loaded !== 'true') {
                console.warn(`图片 ${index + 1} 加载超时: ${imageUrl}`);
                if (loadingPlaceholder) {
                    loadingPlaceholder.style.display = 'none';
                }
            }
        }, 10000);
        
        // 检查图片是否已经加载完成（可能从缓存中）
        // 注意：刷新后不要依赖缓存检查，强制重新加载
        const isRefresh = window.performance && window.performance.navigation && 
                         (window.performance.navigation.type === 1 || window.performance.navigation.type === 255);
        
        if (!isRefresh && img.complete && img.naturalWidth > 0 && img.src === imageUrl) {
            // 图片已经在缓存中且URL匹配，立即显示（非刷新情况）
            clearTimeout(loadTimeout);
            img.dataset.loaded = 'true';
            img.style.opacity = '1';
            if (loadingPlaceholder) {
                loadingPlaceholder.style.display = 'none';
            }
        } else {
            // 图片需要加载，设置src并监听load事件
            // 刷新时强制重新加载，不使用缓存检查
            img.src = imageUrl;
            const handleLoad = function() {
                clearTimeout(loadTimeout);
                this.dataset.loaded = 'true';
                if (loadingPlaceholder) {
                    loadingPlaceholder.style.display = 'none';
                }
                this.style.opacity = '1';
                this.removeEventListener('load', handleLoad);
            };
            img.addEventListener('load', handleLoad, { once: true });
            
            // 也监听error事件
            const handleError = function() {
                clearTimeout(loadTimeout);
                console.warn(`图片加载失败: ${imageUrl}`);
                // 尝试使用fallback
                if (fallbackUrl && img.src !== fallbackUrl) {
                    console.log(`尝试使用fallback图片: ${fallbackUrl}`);
                    const fallbackHandleLoad = function() {
                        this.dataset.loaded = 'true';
                        this.style.opacity = '1';
                        if (loadingPlaceholder) {
                            loadingPlaceholder.style.display = 'none';
                        }
                        this.removeEventListener('load', fallbackHandleLoad);
                    };
                    const fallbackHandleError = function() {
                        console.error(`Fallback图片也加载失败: ${fallbackUrl}`);
                        if (loadingPlaceholder) {
                            loadingPlaceholder.style.display = 'none';
                        }
                        this.removeEventListener('error', fallbackHandleError);
                    };
                    img.src = fallbackUrl;
                    img.addEventListener('load', fallbackHandleLoad, { once: true });
                    img.addEventListener('error', fallbackHandleError, { once: true });
                } else {
                    if (loadingPlaceholder) {
                        loadingPlaceholder.style.display = 'none';
                    }
                }
                this.removeEventListener('error', handleError);
            };
            img.addEventListener('error', handleError, { once: true });
        }
    } else {
        // 懒加载的图片
        img.loading = 'lazy';
        if ('fetchPriority' in img) {
            img.fetchPriority = 'low';
        }
        img.dataset.src = imageUrl;
        img.dataset.fallback = fallbackUrl;
        img.dataset.loaded = 'false';
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
    }
    
    // 预加载策略优化：移动端预加载前3张，桌面端预加载前2张
    if (index === 0) {
        // 第一张加载后，立即预加载后续图片
        setTimeout(() => {
            const preloadCount = isMobile ? 2 : 1; // 移动端预加载2张，桌面端1张
            for (let i = 1; i <= preloadCount && i < productImages.length; i++) {
                preloadImage(i);
            }
        }, isMobile ? 200 : 500); // 移动端更快开始预加载
    }
    
    // 图片加载完成事件（统一处理所有图片）
    // 使用命名函数以便可以移除监听器，避免重复绑定
    const handleImageLoad = function() {
        this.dataset.loaded = 'true';
        const placeholder = this.parentElement.querySelector('.image-loading');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        
        // 确保图片使用绝对定位居中（使用!important确保优先级）
        this.style.setProperty('position', 'absolute', 'important');
        this.style.setProperty('top', '50%', 'important');
        this.style.setProperty('left', '50%', 'important');
        this.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        this.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        this.style.setProperty('display', 'block', 'important');
        this.style.setProperty('margin', '0', 'important');
        
        // 确保图片尺寸已确定，防止布局偏移
        if (this.naturalWidth && this.naturalHeight) {
            // 图片已加载，淡入动画
            this.style.opacity = '0';
            // 使用 requestAnimationFrame 确保布局已完成
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // 再次确保绝对定位居中（使用!important确保优先级）
                    this.style.setProperty('position', 'absolute', 'important');
                    this.style.setProperty('top', '50%', 'important');
                    this.style.setProperty('left', '50%', 'important');
                    this.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    this.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    this.style.setProperty('margin', '0', 'important');
                    this.style.transition = 'opacity 0.3s ease';
                    this.style.opacity = '1';
                });
            });
        } else {
            // 如果尺寸未确定，直接显示
            this.style.opacity = '1';
        }
        
        // 移除监听器，避免重复触发
        this.removeEventListener('load', handleImageLoad);
    };
    
    // 检查图片是否已经加载完成（可能从缓存中）
    if (img.complete && img.naturalWidth > 0) {
        // 图片已经加载完成，直接调用处理函数
        handleImageLoad.call(img);
    } else {
        // 图片还未加载，添加监听器
        img.addEventListener('load', handleImageLoad, { once: true });
    }
    
    // 统一图片加载错误处理
    const itemName = item.name; // 保存到局部变量，确保在闭包中可访问
    let errorCount = 0; // 记录错误次数
    img.addEventListener('error', function() {
        errorCount++;
        const currentSrc = this.src;
        const fbUrl = this.dataset.fallback || fallbackUrl;
        
        // 如果 WebP 加载失败，尝试加载 JPG（只尝试一次）
        if (errorCount === 1 && currentSrc !== fbUrl && currentSrc.includes('.webp') && fbUrl) {
            console.log(`WebP 加载失败，回退到 JPG: ${itemName || '图片'}`);
            this.src = fbUrl;
            return; // 尝试加载回退图片，不触发错误处理
        }
        
        // JPG也加载失败或已经是JPG了，显示错误信息
        console.error(`图片加载失败: ${itemName || '图片'}, 当前URL: ${currentSrc}`);
        const placeholder = this.parentElement.querySelector('.image-loading');
        if (placeholder) {
            placeholder.style.display = 'flex';
            placeholder.innerHTML = '<div class="image-error">图片加载失败<br><button onclick="location.reload()" style="margin-top:10px;padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;">重试</button></div>';
        }
    });
    
    // 如果图片已经缓存（complete），立即触发加载完成
    if (img.complete && img.naturalHeight !== 0 && img.src) {
        img.dataset.loaded = 'true';
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
        // 确保图片使用绝对定位居中（使用!important确保优先级）
        img.style.setProperty('position', 'absolute', 'important');
        img.style.setProperty('top', '50%', 'important');
        img.style.setProperty('left', '50%', 'important');
        img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        img.style.setProperty('margin', '0', 'important');
        // 确保图片可见
        img.style.opacity = '1';
        // 手动触发load事件以确保所有处理都完成
        img.dispatchEvent(new Event('load'));
    } else if (index === 0 && img.src) {
        // 第一张图片如果还没加载完成，设置一个超时检查
        const checkImageLoaded = setInterval(() => {
            if (img.complete) {
                clearInterval(checkImageLoaded);
                if (img.naturalHeight !== 0) {
                    img.dataset.loaded = 'true';
                    if (loadingPlaceholder) {
                        loadingPlaceholder.style.display = 'none';
                    }
                    // 确保图片使用绝对定位居中（使用!important确保优先级）
                    img.style.setProperty('position', 'absolute', 'important');
                    img.style.setProperty('top', '50%', 'important');
                    img.style.setProperty('left', '50%', 'important');
                    img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    img.style.setProperty('margin', '0', 'important');
                    img.style.opacity = '1';
                }
            }
        }, 100);
        // 10秒后停止检查
        setTimeout(() => clearInterval(checkImageLoaded), 10000);
    }
    
    // 选中标记 - 爱心图标和数量
    const selectedMark = document.createElement('div');
    selectedMark.className = 'selected-mark';
    
    const heartIcon = document.createElement('div');
    heartIcon.className = 'heart-icon';
    heartIcon.innerHTML = '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path class="heart-path" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white"/></svg>';
    
    // 初始化该产品的爱心数量（如果还没有从服务器加载，使用默认值）
    if (heartCounts[index] === undefined) {
        heartCounts[index] = 2000; // 默认值，稍后会被服务器数据覆盖
    }
    
    const heartCountDisplay = document.createElement('div');
    heartCountDisplay.className = 'heart-count';
    heartCountDisplay.id = `heartCount-${index}`;
    heartCountDisplay.dataset.productIndex = index;
    heartCountDisplay.textContent = formatNumber(heartCounts[index]);
    
    selectedMark.appendChild(heartIcon);
    selectedMark.appendChild(heartCountDisplay);
    
    imageContainer.appendChild(loadingPlaceholder);
    imageContainer.appendChild(img);
    imageContainer.appendChild(selectedMark);
    card.appendChild(imageContainer);
    
    return card;
}

// 启动自动轮播
function startAutoPlay() {
    // 清除之前的定时器
    stopAutoPlay();
    
    // 设置新的定时器（支持循环轮播）
    autoPlayTimer = setTimeout(() => {
        // 如果是最后一张，循环回到第一张
        if (currentIndex >= productImages.length - 1) {
            showProduct(0);
        } else {
            nextQuestion();
        }
    }, AUTO_PLAY_INTERVAL);
}

// 停止自动轮播
function stopAutoPlay() {
    if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
        autoPlayTimer = null;
    }
}

// 格式化数字（添加千位分隔符）
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 更新指定产品的爱心数量显示（本地更新，立即生效）
function updateHeartCountDisplay(productIndex, count) {
    heartCounts[productIndex] = count;
    lastUpdateTime[productIndex] = Date.now(); // 记录更新时间
    
    // 更新该产品的爱心数量显示
    const countDisplay = document.querySelector(`.heart-count[data-product-index="${productIndex}"]`);
    if (countDisplay) {
        const newText = formatNumber(heartCounts[productIndex]);
        
        // 添加更新动画
        countDisplay.classList.add('updating');
        countDisplay.textContent = newText;
        
        // 移除动画类
        setTimeout(() => {
            countDisplay.classList.remove('updating');
        }, 300);
    }
}

// 更新指定产品的爱心数量（同步到服务器，确保数据持久化）
async function updateHeartCount(productIndex, increment) {
    // 确保该产品的爱心数量已初始化
    if (heartCounts[productIndex] === undefined) {
        // 如果还没有从服务器加载，先尝试加载
        await loadHeartCountsFromServer();
        // 如果加载后还是没有，使用默认值
        if (heartCounts[productIndex] === undefined) {
            heartCounts[productIndex] = 2000;
        }
    }
    
    // 累积待处理的增量（处理快速点击）
    if (!pendingHeartUpdates[productIndex]) {
        pendingHeartUpdates[productIndex] = 0;
    }
    pendingHeartUpdates[productIndex] += increment;
    
    // 立即本地更新（乐观更新，不等待服务器）
    const newCount = heartCounts[productIndex] + increment;
    updateHeartCountDisplay(productIndex, newCount);
    
    // 使用防抖机制，批量发送请求（延迟200ms，如果在这期间有更多点击，会累积）
    clearTimeout(updateLocks[productIndex]);
    
    updateLocks[productIndex] = setTimeout(async () => {
        // 获取累积的增量值（快速点击时会累积）
        const totalIncrement = pendingHeartUpdates[productIndex] || 0;
        pendingHeartUpdates[productIndex] = 0; // 清空累积值
        
        // 如果没有累积值（理论上不应该发生），直接返回
        if (totalIncrement === 0) {
            delete updateLocks[productIndex];
            return;
        }
        
        // 获取更新前的本地值，用于验证
        const localCountBeforeUpdate = heartCounts[productIndex];
        const expectedServerCount = localCountBeforeUpdate;
        
        // 同步到服务器（确保数据持久化存储）
        let retryCount = 0;
        const maxRetries = 3;
        
        while (retryCount < maxRetries) {
            try {
                const API_BASE_URL = window.API_BASE_URL || window.location.origin;
                const productId = productImages[productIndex].id;
                
                const response = await fetch(`${API_BASE_URL}/api/heart-count`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: productId,
                        increment: totalIncrement
                    })
                });
                
                const result = await response.json();
                
                // 如果服务器返回了count值
                if (result.count !== undefined) {
                    const currentLocalCount = heartCounts[productIndex];
                    const serverCount = result.count;
                    
                    // 如果服务器返回的值大于或等于本地值，说明服务器已经成功保存了我们的更新（可能还有其他用户的更新）
                    // 使用服务器值以确保数据一致性
                    if (serverCount >= currentLocalCount) {
                        // 服务器值更新或相同，使用服务器值（可能包含了其他用户的点赞）
                        updateHeartCountDisplay(productIndex, serverCount);
                    }
                    // 如果服务器值小于本地值，可能是服务器数据滞后，保持本地值
                    
                    if (result.success) {
                        console.log(`✅ 产品 ${productId} 爱心数量已保存到服务器: ${serverCount} (本地: ${currentLocalCount})`);
                    } else {
                        console.warn(`⚠️ 产品 ${productId} 更新失败，但使用服务器返回的值: ${serverCount}`);
                    }
                    return; // 有count值，退出重试循环
                } else if (result.success) {
                    // 成功但没有count值，保持本地更新
                    console.log(`✅ 产品 ${productId} 更新成功（使用本地值）`);
                    return;
                } else {
                    throw new Error(result.message || '服务器返回失败');
                }
            } catch (error) {
                retryCount++;
                console.error(`更新爱心数量到服务器失败 (尝试 ${retryCount}/${maxRetries}):`, error);
                
                if (retryCount < maxRetries) {
                    // 等待后重试（指数退避）
                    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                } else {
                    // 所有重试都失败，保持本地更新
                    console.error('❌ 所有重试都失败，数据未保存到服务器。本地数量:', localCountBeforeUpdate);
                    // 可以在这里添加错误提示或本地存储作为备份
                }
            }
        }
        
        delete updateLocks[productIndex];
    }, 200); // 200ms防抖延迟
}

// 从服务器获取所有产品的爱心数量
async function loadHeartCountsFromServer() {
    try {
        const API_BASE_URL = window.API_BASE_URL || window.location.origin;
        console.log('正在从服务器加载爱心数量:', `${API_BASE_URL}/api/heart-counts`);
        
        const response = await fetch(`${API_BASE_URL}/api/heart-counts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache' // 确保获取最新数据
        });
        
        if (!response.ok) {
            throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('服务器返回的数据:', result);
        
        if (result.success && result.heartCounts) {
            // 更新所有产品的爱心数量（智能合并服务器数据）
            productImages.forEach((item, index) => {
                const productId = item.id;
                const serverCount = result.heartCounts[productId];
                
                // 如果服务器有数据
                if (serverCount !== undefined) {
                    const localCount = heartCounts[index] || 2000;
                    const localUpdateTime = lastUpdateTime[index] || 0;
                    const serverUpdateTime = result.updateTimes?.[productId] || 0;
                    
                    // 如果本地有最近的更新（5秒内），且本地值更大，保持本地值
                    const timeSinceLocalUpdate = Date.now() - localUpdateTime;
                    if (timeSinceLocalUpdate < 5000 && localCount >= serverCount) {
                        // 本地值更新，保持本地值
                        console.log(`产品 ${productId} 保持本地最新值: ${localCount} (服务器: ${serverCount})`);
                    } else {
                        // 使用服务器值或两者中较大的值
                        heartCounts[index] = Math.max(serverCount, localCount);
                    }
                } else {
                    // 如果服务器没有该产品的数据，使用本地值或默认值
                    if (heartCounts[index] === undefined) {
                        heartCounts[index] = 2000;
                        console.warn(`产品 ${productId} 在服务器中没有数据，使用默认值2000`);
                    }
                }
                
                // 更新显示
                const countDisplay = document.querySelector(`.heart-count[data-product-index="${index}"]`);
                if (countDisplay) {
                    countDisplay.textContent = formatNumber(heartCounts[index]);
                }
            });
            
            console.log('✅ 爱心数量已从服务器加载:', result.heartCounts);
            console.log('本地heartCounts:', heartCounts);
        } else {
            console.warn('❌ 服务器返回的数据格式不正确:', result);
            // 如果服务器返回失败，但包含heartCounts字段，尝试使用它
            if (result.heartCounts && typeof result.heartCounts === 'object') {
                console.log('⚠️ 尝试使用服务器返回的heartCounts（即使success为false）');
                productImages.forEach((item, index) => {
                    const productId = item.id;
                    if (result.heartCounts[productId] !== undefined) {
                        heartCounts[index] = result.heartCounts[productId];
                        const countDisplay = document.querySelector(`.heart-count[data-product-index="${index}"]`);
                        if (countDisplay) {
                            countDisplay.textContent = formatNumber(heartCounts[index]);
                        }
                    } else if (heartCounts[index] === undefined) {
                        heartCounts[index] = 2000;
                    }
                });
            } else {
                // 如果服务器返回失败，保持现有数据，不重置为2000
                // 只有在heartCounts完全为空时才设置默认值
                productImages.forEach((item, index) => {
                    if (heartCounts[index] === undefined) {
                        heartCounts[index] = 2000;
                    }
                    // 如果已有数据，保持不变
                });
            }
        }
    } catch (error) {
        console.error('❌ 从服务器加载爱心数量失败:', error);
        // 如果失败，保持现有数据，不重置
        // 只有在完全没有数据时才设置默认值
        productImages.forEach((item, index) => {
            if (heartCounts[index] === undefined) {
                heartCounts[index] = 2000;
            }
            // 如果已有数据，保持不变，不重置为2000
        });
        console.warn('⚠️ 数据加载失败，保持现有数据:', heartCounts);
    }
}

// 触发爱心心跳动画
function triggerHeartbeat(heartIcon) {
    if (!heartIcon) return;
    
    // 移除之前的动画类
    heartIcon.classList.remove('heartbeat-pulse');
    
    // 强制重新计算样式，确保动画可以重新触发
    void heartIcon.offsetWidth;
    
    // 添加心跳动画类
    heartIcon.classList.add('heartbeat-pulse');
    
    // 动画结束后移除类，以便下次可以再次触发
    setTimeout(() => {
        heartIcon.classList.remove('heartbeat-pulse');
    }, 600);
}

// 创建飘动的爱心动画（类似抖音点赞效果）
function createFloatingHeart(container, productIndex) {
    const selectedMark = container.querySelector('.selected-mark');
    if (!selectedMark) return;
    
    // 获取爱心图标的位置
    const markRect = selectedMark.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // 计算相对于容器的位置
    const startX = markRect.left - containerRect.left + markRect.width / 2;
    const startY = markRect.top - containerRect.top + markRect.height / 2;
    
    // 创建1-5个重影爱心（控制在5个以内）
    const floatingHeartCount = 1 + Math.floor(Math.random() * 5); // 1-5个
    
    for (let i = 0; i < floatingHeartCount; i++) {
        setTimeout(() => {
            const floatingHeart = document.createElement('div');
            floatingHeart.className = 'floating-heart';
            
            // 随机偏移，让爱心不完全重叠，并添加左右随机偏移
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 15;
            
            // 随机左右飘动方向（-1 或 1）
            const driftDirection = Math.random() > 0.5 ? 1 : -1;
            const driftAmount = (Math.random() * 30 + 20) * driftDirection;
            
            floatingHeart.style.left = `${startX + offsetX}px`;
            floatingHeart.style.top = `${startY + offsetY}px`;
            floatingHeart.style.setProperty('--drift-x', `${driftAmount}px`);
            
            // 随机大小变化
            const scaleVariation = 0.8 + Math.random() * 0.4; // 0.8-1.2
            floatingHeart.style.setProperty('--scale-end', scaleVariation);
            
            // 创建SVG爱心
            floatingHeart.innerHTML = `
                <svg width="56" height="56" viewBox="0 0 24 24" fill="#e74c3c" stroke="#e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            `;
            
            container.appendChild(floatingHeart);
            
            // 触发动画
            requestAnimationFrame(() => {
                floatingHeart.classList.add('animate');
            });
            
            // 动画结束后移除元素
            setTimeout(() => {
                if (floatingHeart.parentNode) {
                    floatingHeart.parentNode.removeChild(floatingHeart);
                }
            }, 2000);
        }, i * 80); // 每个爱心延迟80ms，形成重影效果
    }
}

// 选择产品（带防抖机制，防止快速点击导致图片变大）
function selectProduct(productIndex) {
    // 防抖处理：如果正在处理中，忽略本次点击
    if (clickTimers[productIndex]) {
        return; // 正在处理中，忽略本次点击
    }
    
    stopAutoPlay(); // 用户选择产品时停止自动轮播
    
    answers[productIndex] = true;
    
    // 更新UI显示选中状态
    const card = document.querySelector(`[data-index="${productIndex}"]`);
    if (!card) return;
    
    const imageContainer = card.querySelector('.product-image-container');
    if (!imageContainer) return;
    
    // 设置点击锁标识，防止快速连续点击
    clickTimers[productIndex] = 'processing';
    
    // 始终设置为选中状态
    imageContainer.classList.add('selected');
    
    // 触发明显的心跳动画
    const heartIcon = imageContainer.querySelector('.heart-icon');
    if (heartIcon) {
        triggerHeartbeat(heartIcon);
    }
    
    // 每次点击都增加爱心数量
    updateHeartCount(productIndex, 1);
    
    // 创建飘动的爱心动画
    createFloatingHeart(imageContainer, productIndex);
    
    // 清除之前的跳转定时器（如果存在）
    if (productJumpTimers[productIndex]) {
        clearTimeout(productJumpTimers[productIndex]);
    }
    
    // 自动跳转到下一个产品（爱心动画结束后5秒再轮播）
    // 动画持续时间2秒 + 等待5秒 = 总共7秒
    productJumpTimers[productIndex] = setTimeout(() => {
        if (currentIndex === productIndex && currentIndex < productImages.length - 1) {
            nextQuestion();
        }
        // 清除定时器引用
        delete productJumpTimers[productIndex];
    }, 7000); // 2000ms动画 + 5000ms等待 = 7000ms
    
    // 解除点击锁（延迟解除，防止快速连续点击导致图片变大）
    const isMobile = isMobileDevice();
    const debounceDelay = isMobile ? CLICK_DEBOUNCE_DELAY : 300; // 移动端更长的防抖时间，防止快速点击
    
    // 清除之前的定时器（如果存在）
    if (clickTimers[productIndex] && typeof clickTimers[productIndex] === 'number') {
        clearTimeout(clickTimers[productIndex]);
    }
    
    // 设置新的定时器来解除点击锁
    clickTimers[productIndex] = setTimeout(() => {
        delete clickTimers[productIndex];
    }, debounceDelay);
    
    updateNavButtons();
}

// 图片加载重试机制（优化版，更好的错误处理）
function loadImageWithRetry(img, imageUrl, fallbackUrl, maxRetries = 3, retryCount = 0) {
    return new Promise((resolve, reject) => {
        // 移动端使用更短的超时时间，快速失败并回退到JPG
        const isMobile = isMobileDevice();
        const timeoutDuration = isMobile ? 8000 : 15000;
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            if (retryCount < maxRetries) {
                console.log(`图片加载超时，重试 ${retryCount + 1}/${maxRetries}: ${imageUrl}`);
                // 如果是WebP，尝试回退到JPG
                if (imageUrl.includes('.webp') && fallbackUrl && retryCount === 0) {
                    console.log('WebP超时，尝试回退到JPG');
                    loadImageWithRetry(img, fallbackUrl, null, maxRetries, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                } else {
                    loadImageWithRetry(img, imageUrl, fallbackUrl, maxRetries, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                }
            } else {
                reject(new Error(`图片加载失败：超过最大重试次数 (${imageUrl})`));
            }
        }, timeoutDuration);

        const tempImg = new Image();
        
        tempImg.onload = function() {
            clearTimeout(timeout);
            // 确保图片元素存在且可见
            if (img && img.parentElement) {
                img.src = imageUrl;
                img.dataset.loaded = 'true';
                img.style.opacity = '1';
                // 确保隐藏加载占位符
                const placeholder = img.parentElement.querySelector('.image-loading');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
                console.log(`✅ 图片加载成功: ${imageUrl}`);
                resolve();
            } else {
                reject(new Error('图片元素不存在'));
            }
        };
        
        tempImg.onerror = function(error) {
            clearTimeout(timeout);
            console.warn(`⚠️ 图片加载错误 (尝试 ${retryCount + 1}/${maxRetries + 1}): ${imageUrl}`);
            
            // 如果是 WebP 且还有回退图片，尝试回退
            if (imageUrl.includes('.webp') && fallbackUrl && retryCount === 0) {
                console.log('WebP 加载失败，尝试回退到 JPG: ' + fallbackUrl);
                loadImageWithRetry(img, fallbackUrl, null, maxRetries, retryCount + 1)
                    .then(resolve)
                    .catch(reject);
            } else if (retryCount < maxRetries) {
                // 重试，使用指数退避
                const delay = 1000 * (retryCount + 1);
                console.log(`等待 ${delay}ms 后重试...`);
                setTimeout(() => {
                    loadImageWithRetry(img, imageUrl, fallbackUrl, maxRetries, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                }, delay);
            } else {
                reject(new Error(`图片加载失败: ${imageUrl}`));
            }
        };
        
        // 开始加载图片
        tempImg.src = imageUrl;
    });
}

// 预加载图片（静默加载，不显示占位符，增强错误处理）
function preloadImage(index) {
    if (index < 0 || index >= productImages.length) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    if (!card) return;
    
    const img = card.querySelector('.product-image');
    if (!img || img.dataset.loaded === 'true' || img.dataset.preloading === 'true') return;
    
    img.dataset.preloading = 'true';
    const item = productImages[index];
    const imageUrl = getImageUrl(item);
    // 生成fallback URL，确保也包含版本号
    const baseFallback = item.fallback || item.image.replace('.webp', '.jpg');
    const fallbackUrl = baseFallback.includes('?') 
        ? baseFallback 
        : `${baseFallback}?v=${IMAGE_VERSION}`;
    
    // 先在data属性中保存URL，供后续加载使用
    if (img.dataset.src) {
        img.dataset.src = imageUrl;
        img.dataset.fallback = fallbackUrl;
    }
    
    const preloadImg = new Image();
    
    // 设置超时，移动端使用更短超时，但不要太短避免误判
    const isMobile = isMobileDevice();
    const timeoutDuration = isMobile ? 8000 : 10000; // 移动端8秒，桌面端10秒
    const timeout = setTimeout(() => {
        preloadImg.onload = null;
        preloadImg.onerror = null;
        img.dataset.preloading = 'false';
        console.warn(`⚠️ 图片 ${index + 1} (${item.name}) 预加载超时`);
        
        // 如果WebP超时，尝试JPG
        if (imageUrl.includes('.webp') && fallbackUrl) {
            const fallbackImg = new Image();
            fallbackImg.onload = function() {
                img.dataset.preloaded = 'true';
                img.dataset.preloadFallback = fallbackUrl;
                console.log(`✅ 图片 ${index + 1} (${item.name}) 预加载完成（使用JPG回退）`);
            };
            fallbackImg.onerror = function() {
                console.warn(`⚠️ 图片 ${index + 1} (${item.name}) 回退格式也加载失败`);
            };
            fallbackImg.src = fallbackUrl;
        }
    }, timeoutDuration);
    
    preloadImg.onload = function() {
        clearTimeout(timeout);
        img.dataset.preloaded = 'true';
        img.dataset.preloading = 'false';
        console.log(`✅ 图片 ${index + 1} (${item.name}) 预加载完成`);
    };
    
    preloadImg.onerror = function() {
        clearTimeout(timeout);
        // 如果 WebP 失败，尝试 JPG
        if (imageUrl.includes('.webp') && fallbackUrl) {
            console.log(`图片 ${index + 1} (${item.name}) WebP加载失败，尝试JPG回退`);
            const fallbackImg = new Image();
            fallbackImg.onload = function() {
                img.dataset.preloaded = 'true';
                img.dataset.preloadFallback = fallbackUrl;
                img.dataset.preloading = 'false';
                console.log(`✅ 图片 ${index + 1} (${item.name}) 预加载完成（使用JPG回退）`);
            };
            fallbackImg.onerror = function() {
                img.dataset.preloading = 'false';
                console.warn(`⚠️ 图片 ${index + 1} (${item.name}) 预加载失败（WebP和JPG都失败）`);
            };
            fallbackImg.src = fallbackUrl;
        } else {
            img.dataset.preloading = 'false';
            console.warn(`⚠️ 图片 ${index + 1} (${item.name}) 预加载失败`);
        }
    };
    
    preloadImg.src = imageUrl;
}

// 加载图片（懒加载，带重试机制）
async function loadImage(index) {
    const card = document.querySelector(`[data-index="${index}"]`);
    if (!card) return;
    
    const img = card.querySelector('.product-image');
    if (!img) return;
    
    // 检查是否是刷新操作（使用多种方法检测，提高兼容性）
    const isRefresh = (window.performance && window.performance.navigation && 
                      (window.performance.navigation.type === 1 || window.performance.navigation.type === 255)) ||
                     (window.performance && window.performance.getEntriesByType && 
                      window.performance.getEntriesByType('navigation')[0] && 
                      window.performance.getEntriesByType('navigation')[0].type === 'reload');
    
    // 如果是刷新，重置加载状态，强制重新加载
    if (isRefresh) {
        console.log(`刷新检测：重置图片 ${index + 1} 的加载状态`);
        img.dataset.loaded = 'false';
        img.dataset.preloaded = 'false';
        img.dataset.src = '';
        img.dataset.fallback = '';
        // 清空src并强制重新加载
        img.removeAttribute('src');
        img.src = '';
        img.style.opacity = '0';
        // 移除所有可能的事件监听器（通过克隆节点）
        const imgParent = img.parentNode;
        const imgNextSibling = img.nextSibling;
        const imgClone = img.cloneNode(false);
        imgParent.removeChild(img);
        imgParent.insertBefore(imgClone, imgNextSibling);
        // 重新获取img引用
        img = card.querySelector('.product-image');
        if (!img) {
            console.error(`无法找到图片元素 ${index + 1}`);
            return;
        }
    } else {
        // 如果图片已经加载，直接返回
        if (img.dataset.loaded === 'true') return;
    }
    
    // 显示加载占位符
    const loadingPlaceholder = card.querySelector('.image-loading');
    if (loadingPlaceholder) {
        loadingPlaceholder.style.display = 'flex';
    }
    
    const item = productImages[index];
    
    // 刷新时或没有 data-src，重新获取 URL
    if (!img.dataset.src || isRefresh) {
        const imageUrl = getImageUrl(item);
        const baseFallback = item.fallback || item.image.replace('.webp', '.jpg');
        const fallbackUrl = baseFallback.includes('?') 
            ? baseFallback 
            : `${baseFallback}?v=${IMAGE_VERSION}`;
        img.dataset.src = imageUrl;
        img.dataset.fallback = fallbackUrl;
    }
    
    // 获取图片URL
    let imageUrl = img.dataset.src || getImageUrl(item);
    let baseFallback = img.dataset.fallback || item.fallback || item.image.replace('.webp', '.jpg');
    let fallbackUrl = baseFallback.includes('?') 
        ? baseFallback 
        : `${baseFallback}?v=${IMAGE_VERSION}`;
    
    // 如果已经预加载且不是刷新，直接使用
    if (!isRefresh && img.dataset.preloaded === 'true') {
        const preloadUrl = img.dataset.preloadFallback || imageUrl;
        // 检查预加载的图片是否已经加载完成
        if (img.src === preloadUrl && img.complete && img.naturalWidth > 0) {
            // 图片已经加载，直接显示
            img.dataset.loaded = 'true';
            img.style.opacity = '1';
            if (loadingPlaceholder) {
                loadingPlaceholder.style.display = 'none';
            }
        } else {
            // 设置图片源
            img.src = preloadUrl;
            img.dataset.loaded = 'true';
            if (loadingPlaceholder) {
                loadingPlaceholder.style.display = 'none';
            }
            // 确保图片使用绝对定位居中
            img.style.setProperty('position', 'absolute', 'important');
            img.style.setProperty('top', '50%', 'important');
            img.style.setProperty('left', '50%', 'important');
            img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
            img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
            img.style.setProperty('margin', '0', 'important');
            img.style.opacity = '1';
        }
        return;
    }
    
    // 使用重试机制加载图片
    // 设置超时，如果15秒后还没加载完成，隐藏占位符
    const loadTimeout = setTimeout(() => {
        if (img.dataset.loaded !== 'true' && loadingPlaceholder) {
            console.warn(`图片 ${index + 1} 加载超时，隐藏占位符`);
            loadingPlaceholder.style.display = 'none';
        }
    }, 15000);
    
    try {
        await loadImageWithRetry(img, imageUrl, fallbackUrl);
        clearTimeout(loadTimeout);
        // 加载成功后，确保隐藏占位符
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
        // 确保图片可见
        img.style.opacity = '1';
        img.dataset.loaded = 'true';
    } catch (error) {
        clearTimeout(loadTimeout);
        console.error(`❌ 图片 ${index + 1} (${item.name}) 加载失败:`, error);
        console.error(`尝试的URL: ${imageUrl}, 回退URL: ${fallbackUrl}`);
        
        // 尝试直接使用回退图片
        if (fallbackUrl && img.src !== fallbackUrl) {
            console.log(`尝试直接加载回退图片: ${fallbackUrl}`);
            const fallbackImg = new Image();
            fallbackImg.onload = function() {
                img.src = fallbackUrl;
                img.dataset.loaded = 'true';
                if (loadingPlaceholder) {
                    loadingPlaceholder.style.display = 'none';
                }
                // 确保图片使用绝对定位居中（使用!important确保优先级）
                img.style.setProperty('position', 'absolute', 'important');
                img.style.setProperty('top', '50%', 'important');
                img.style.setProperty('left', '50%', 'important');
                img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                img.style.setProperty('margin', '0', 'important');
                
                // 确保图片尺寸已确定，防止布局偏移
                if (img.naturalWidth && img.naturalHeight) {
                    img.style.opacity = '0';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            // 再次确保绝对定位居中（使用!important确保优先级）
                            img.style.setProperty('position', 'absolute', 'important');
                            img.style.setProperty('top', '50%', 'important');
                            img.style.setProperty('left', '50%', 'important');
                            img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                            img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                            img.style.setProperty('margin', '0', 'important');
                            img.style.transition = 'opacity 0.3s ease';
                            img.style.opacity = '1';
                        });
                    });
                } else {
                    // 确保图片使用绝对定位居中（使用!important确保优先级）
                    img.style.setProperty('position', 'absolute', 'important');
                    img.style.setProperty('top', '50%', 'important');
                    img.style.setProperty('left', '50%', 'important');
                    img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    img.style.setProperty('margin', '0', 'important');
                    img.style.opacity = '1';
                }
            };
            fallbackImg.onerror = function() {
                console.error(`回退图片也加载失败: ${fallbackUrl}`);
                if (loadingPlaceholder) {
                    loadingPlaceholder.innerHTML = '<div class="image-error">图片加载失败<br><button onclick="location.reload()" style="margin-top:10px;padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;">重试</button></div>';
                }
            };
            fallbackImg.src = fallbackUrl;
        } else {
            if (loadingPlaceholder) {
                loadingPlaceholder.innerHTML = '<div class="image-error">图片加载失败<br><button onclick="location.reload()" style="margin-top:10px;padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;">重试</button></div>';
            }
        }
    }
    
    // 预加载策略优化：移动端预加载下一张和再下一张，桌面端预加载相邻图片
    const isMobile = isMobileDevice();
    const nextIndex = index + 1;
    const nextNextIndex = index + 2; // 移动端也预加载再下一张
    const prevIndex = index - 1;
    
    // 预加载下一张（移动端和桌面端都预加载，确保最后几张也能加载）
    if (nextIndex < productImages.length) {
        // 移动端：延迟预加载，避免阻塞当前图片，但延迟时间缩短以提高速度
        // 桌面端：立即预加载
        const delay = isMobile ? 300 : 0;
        setTimeout(() => {
            preloadImage(nextIndex);
        }, delay);
    }
    
    // 移动端：也预加载再下一张，提高连续切换速度
    if (isMobile && nextNextIndex < productImages.length) {
        setTimeout(() => {
            preloadImage(nextNextIndex);
        }, 600);
    }
    
    // 桌面端：也预加载上一张（移动端不预加载，节省资源）
    if (!isMobile && prevIndex >= 0) {
        setTimeout(() => {
            preloadImage(prevIndex);
        }, 500);
    }
}

// 显示指定产品
function showProduct(index) {
    // 清除之前产品的选中状态（但保留爱心数量）
    if (currentIndex !== undefined && currentIndex !== index) {
        const previousCard = document.querySelector(`[data-index="${currentIndex}"]`);
        if (previousCard) {
            const previousImageContainer = previousCard.querySelector('.product-image-container');
            if (previousImageContainer && previousImageContainer.classList.contains('selected')) {
                // 移除选中状态，但保留爱心数量
                previousImageContainer.classList.remove('selected');
            }
        }
        
        // 清除之前产品的跳转定时器
        if (productJumpTimers[currentIndex]) {
            clearTimeout(productJumpTimers[currentIndex]);
            delete productJumpTimers[currentIndex];
        }
    }
    
    currentIndex = index;
    const carouselWrapper = document.getElementById('carouselWrapper');
    if (!carouselWrapper) return;
    
    // 确保轮播容器宽度正确
    const carouselContainer = carouselWrapper.parentElement;
    if (carouselContainer) {
        carouselContainer.style.overflow = 'hidden';
        carouselContainer.style.width = '100%';
        carouselContainer.style.position = 'relative';
    }
    
    // 确保轮播包装器正确设置
    carouselWrapper.style.display = 'flex';
    carouselWrapper.style.width = 'auto';
    carouselWrapper.style.minWidth = '100%';
    carouselWrapper.style.overflow = 'visible';
    
    // 确保所有产品卡片宽度正确（相对于容器宽度）
    const containerWidth = carouselContainer ? carouselContainer.offsetWidth : window.innerWidth;
    const allCards = carouselWrapper.querySelectorAll('.product-card');
    allCards.forEach(card => {
        card.style.minWidth = `${containerWidth}px`;
        card.style.width = `${containerWidth}px`;
        card.style.flexShrink = '0';
        card.style.flexBasis = `${containerWidth}px`;
    });
    
    // 计算并应用transform，确保只显示当前产品
    // 使用容器宽度来计算，确保精确移动
    const translateX = -index * containerWidth;
    carouselWrapper.style.transform = `translateX(${translateX}px)`;
    carouselWrapper.style.willChange = 'transform';
    
    // 强制重新计算布局
    carouselWrapper.offsetHeight;
    
    // 加载当前图片（懒加载）
    loadImage(index);
    
    // 移动端：立即预加载下一张图片（特别是最后几张），提高切换速度
    const isMobile = isMobileDevice();
    if (isMobile && index < productImages.length - 1) {
        // 移动端：立即预加载下一张，减少等待时间
        setTimeout(() => {
            preloadImage(index + 1);
        }, 300);
    }
    
    updateProgress();
    updateNavButtons();
    
    // 启动自动轮播
    startAutoPlay();
}

// 上一个产品（支持循环）
function previousQuestion() {
    stopAutoPlay(); // 用户手动操作时停止自动轮播
    if (currentIndex > 0) {
        showProduct(currentIndex - 1);
    } else {
        // 如果是第一张，循环到最后一张
        showProduct(productImages.length - 1);
    }
}

// 下一个产品（支持循环）
function nextQuestion() {
    stopAutoPlay(); // 用户手动操作时停止自动轮播
    if (currentIndex < productImages.length - 1) {
        showProduct(currentIndex + 1);
    } else {
        // 如果是最后一张，循环回到第一张
        showProduct(0);
    }
}

// 更新进度条
function updateProgress() {
    const progress = ((currentIndex + 1) / productImages.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// 更新导航按钮状态（循环模式下按钮始终可用）
function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // 循环模式下，导航按钮始终可用
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
}


// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousQuestion();
    } else if (e.key === 'ArrowRight') {
        nextQuestion();
    }
});

// 触摸滑动支持（移动设备）
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50; // 最小滑动距离
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑动，下一张
            nextQuestion();
        } else {
            // 向右滑动，上一张
            previousQuestion();
        }
    }
}

// 页面可见性变化时控制自动轮播
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时停止自动轮播
        stopAutoPlay();
    } else {
        // 页面显示时重新启动自动轮播
        startAutoPlay();
    }
});

// 页面加载完成后初始化
function initializeApp() {
    console.log('开始初始化应用');
    console.log('当前 URL:', window.location.href);
    console.log('产品数量:', productImages.length);
    
    try {
        const carouselWrapper = document.getElementById('carouselWrapper');
        if (!carouselWrapper) {
            console.error('找不到 carouselWrapper 元素');
            return;
        }
        
        console.log('找到 carouselWrapper，开始初始化问卷');
        initQuestionnaire();
        console.log('问卷初始化成功');
    } catch (error) {
        console.error('问卷初始化失败:', error);
        console.error('错误堆栈:', error.stack);
        // 显示错误信息
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = `
                <div style="padding: 20px; text-align: center; color: red;">
                    <h2>加载错误</h2>
                    <p>${error.message}</p>
                    <p>请刷新页面重试</p>
                    <pre>${error.stack}</pre>
                </div>
            `;
        }
    }
}

// 阻止移动端双击缩放
(function() {
    let lastTouchEnd = 0;
    const preventDoubleZoom = function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
            return false;
        }
        lastTouchEnd = now;
    };
    
    // 如果是移动设备，阻止双击缩放
    if (isMobileDevice()) {
        document.addEventListener('touchend', preventDoubleZoom, { passive: false });
        
        // 阻止双击手势
        let lastTap = 0;
        document.addEventListener('touchstart', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 300 && tapLength > 0) {
                e.preventDefault();
                return false;
            }
            lastTap = currentTime;
        }, { passive: false });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 事件触发');
    initializeApp();
});

// 如果 DOMContentLoaded 已经触发，直接初始化
if (document.readyState === 'loading') {
    console.log('文档正在加载，等待 DOMContentLoaded');
} else {
    console.log('文档已加载完成，直接初始化');
    initializeApp();
}

