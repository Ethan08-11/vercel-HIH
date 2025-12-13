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
    },
    {
        id: 39,
        image: '/Picture/39.webp',
        fallback: '/Picture/39.jpg',
        name: '产品39'
    },
    {
        id: 40,
        image: '/Picture/40.webp',
        fallback: '/Picture/40.jpg',
        name: '产品40'
    },
    {
        id: 41,
        image: '/Picture/41.webp',
        fallback: '/Picture/41.jpg',
        name: '产品41'
    },
    {
        id: 42,
        image: '/Picture/42.webp',
        fallback: '/Picture/42.jpg',
        name: '产品42'
    },
    {
        id: 43,
        image: '/Picture/43.webp',
        fallback: '/Picture/43.jpg',
        name: '产品43'
    },
    {
        id: 44,
        image: '/Picture/44.webp',
        fallback: '/Picture/44.jpg',
        name: '产品44'
    },
    {
        id: 45,
        image: '/Picture/45.webp',
        fallback: '/Picture/45.jpg',
        name: '产品45'
    },
    {
        id: 46,
        image: '/Picture/46.webp',
        fallback: '/Picture/46.jpg',
        name: '产品46'
    },
    {
        id: 47,
        image: '/Picture/47.webp',
        fallback: '/Picture/47.jpg',
        name: '产品47'
    },
    {
        id: 48,
        image: '/Picture/48.webp',
        fallback: '/Picture/48.jpg',
        name: '产品48'
    },
    {
        id: 49,
        image: '/Picture/49.webp',
        fallback: '/Picture/49.jpg',
        name: '产品49'
    },
    {
        id: 50,
        image: '/Picture/50.webp',
        fallback: '/Picture/50.jpg',
        name: '产品50'
    },
    {
        id: 51,
        image: '/Picture/51.webp',
        fallback: '/Picture/51.jpg',
        name: '产品51'
    },
    {
        id: 52,
        image: '/Picture/52.webp',
        fallback: '/Picture/52.jpg',
        name: '产品52'
    },
    {
        id: 53,
        image: '/Picture/53.webp',
        fallback: '/Picture/53.jpg',
        name: '产品53'
    },
    {
        id: 54,
        image: '/Picture/54.webp',
        fallback: '/Picture/54.jpg',
        name: '产品54'
    },
    {
        id: 55,
        image: '/Picture/55.webp',
        fallback: '/Picture/55.jpg',
        name: '产品55'
    },
    {
        id: 56,
        image: '/Picture/56.webp',
        fallback: '/Picture/56.jpg',
        name: '产品56'
    },
    {
        id: 57,
        image: '/Picture/57.webp',
        fallback: '/Picture/57.jpg',
        name: '产品57'
    },
    {
        id: 58,
        image: '/Picture/58.webp',
        fallback: '/Picture/58.jpg',
        name: '产品58'
    },
    {
        id: 59,
        image: '/Picture/59.webp',
        fallback: '/Picture/59.jpg',
        name: '产品59'
    },
    {
        id: 60,
        image: '/Picture/60.webp',
        fallback: '/Picture/60.jpg',
        name: '产品60'
    },
    {
        id: 61,
        image: '/Picture/61.webp',
        fallback: '/Picture/61.jpg',
        name: '产品61'
    },
    {
        id: 62,
        image: '/Picture/62.webp',
        fallback: '/Picture/62.jpg',
        name: '产品62'
    },
    {
        id: 63,
        image: '/Picture/63.webp',
        fallback: '/Picture/63.jpg',
        name: '产品63'
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

// 获取图片 URL（优先使用 WebP，所有端都优先WebP，添加版本号防止缓存）
function getImageUrl(item) {
    // 添加版本号查询参数，防止浏览器缓存
    // 使用固定的版本号，避免刷新时URL不一致导致图片无法加载
    const addVersion = (url) => {
        if (!url) return url;
        const separator = url.includes('?') ? '&' : '?';
        // 使用固定版本号，确保URL一致性
        // 如果需要强制刷新，应该更新 IMAGE_VERSION 常量，而不是使用时间戳
        return `${url}${separator}v=${IMAGE_VERSION}`;
    };
    
    // 所有端都优先使用 WebP（体积更小，加载更快）
    // 如果浏览器支持 WebP，使用 WebP，否则使用 JPG 作为回退
    if (supportsWebP() && item.image) {
        return addVersion(item.image);
    }
    
    // 浏览器不支持 WebP，使用 JPG 回退
    const jpgUrl = item.fallback || item.image.replace('.webp', '.jpg');
    return addVersion(jpgUrl);
}

// 存储用户答案
let answers = {};
let currentIndex = 0;
let autoPlayTimer = null; // 自动轮播定时器
const AUTO_PLAY_INTERVAL = 5000; // 自动轮播间隔（5秒）
// 生成基于产品ID的随机初始值（2000-2500之间）
// 使用产品ID作为种子，确保每个产品的初始值是固定的
function getRandomInitialCount(productId) {
    // 使用简单的伪随机算法，基于产品ID生成固定随机数
    // 这样每个产品的初始值都是固定的，不会每次运行都变化
    const seed = productId * 12345 + 67890;
    const random = Math.sin(seed) * 10000;
    const normalized = (random - Math.floor(random));
    // 生成2000-3000之间的随机数
    return Math.floor(2000 + normalized * 1000);
}

let heartCounts = {}; // 每个产品的爱心数量，初始值为随机值（2000-3000）
let productJumpTimers = {}; // 存储每个产品的跳转定时器
let pendingHeartUpdates = {}; // 存储待处理的爱心更新队列 { productIndex: pendingIncrement }
let updateLocks = {}; // 防止并发更新的锁 { productIndex: isUpdating }
let lastUpdateTime = {}; // 记录每个产品的最后更新时间 { productIndex: timestamp }
let loadingQueue = []; // 图片加载队列，控制并发加载数量
let activeLoads = 0; // 当前正在加载的图片数量
const MAX_CONCURRENT_LOADS = isMobileDevice() ? 3 : 4; // 移动端最多3个并发，桌面端4个（提高移动端加载速度）
let clickTimers = {}; // 点击防抖定时器 { productIndex: timer }
const CLICK_DEBOUNCE_DELAY = 500; // 点击防抖延迟（毫秒），防止快速点击

// 移动端图片缓存系统 - 彻底解决白屏闪烁问题
const imageCache = new Map(); // 内存缓存：存储已加载的Image对象 { url: Image }
const imageCacheStatus = new Map(); // 缓存状态：{ url: 'loading' | 'loaded' | 'error' }
let cacheInitialized = false; // 缓存是否已初始化

// 初始化移动端图片缓存（提前加载并缓存图片）
async function initializeImageCache() {
    const isMobile = isMobileDevice();
    if (!isMobile || cacheInitialized) return;
    
    console.log('📦 开始初始化移动端图片缓存...');
    cacheInitialized = true;
    
    // 优先预加载前10张图片（确保切换流畅）
    const preloadCount = Math.min(10, productImages.length);
    const preloadPromises = [];
    
    for (let i = 0; i < preloadCount; i++) {
        const item = productImages[i];
        const imageUrl = getImageUrl(item);
        
        // 如果已经缓存，跳过
        if (imageCache.has(imageUrl) && imageCacheStatus.get(imageUrl) === 'loaded') {
            continue;
        }
        
        // 创建预加载Promise
        const preloadPromise = new Promise((resolve) => {
            const img = new Image();
            imageCacheStatus.set(imageUrl, 'loading');
            
            img.onload = function() {
                imageCache.set(imageUrl, img);
                imageCacheStatus.set(imageUrl, 'loaded');
                console.log(`✅ 图片 ${i + 1} 已缓存: ${imageUrl}`);
                resolve(img);
            };
            
            img.onerror = function() {
                // 如果WebP失败，尝试JPG
                if (imageUrl.includes('.webp')) {
                    const fallbackUrl = getImageUrl({ ...item, image: item.fallback || item.image.replace('.webp', '.jpg') });
                    const fallbackImg = new Image();
                    fallbackImg.onload = function() {
                        imageCache.set(fallbackUrl, fallbackImg);
                        imageCacheStatus.set(fallbackUrl, 'loaded');
                        imageCacheStatus.set(imageUrl, 'loaded'); // 标记原URL也为已加载
                        console.log(`✅ 图片 ${i + 1} 已缓存（JPG回退）: ${fallbackUrl}`);
                        resolve(fallbackImg);
                    };
                    fallbackImg.onerror = function() {
                        imageCacheStatus.set(imageUrl, 'error');
                        console.warn(`⚠️ 图片 ${i + 1} 缓存失败: ${imageUrl}`);
                        resolve(null);
                    };
                    fallbackImg.src = fallbackUrl;
                } else {
                    imageCacheStatus.set(imageUrl, 'error');
                    console.warn(`⚠️ 图片 ${i + 1} 缓存失败: ${imageUrl}`);
                    resolve(null);
                }
            };
            
            img.src = imageUrl;
        });
        
        preloadPromises.push(preloadPromise);
        
        // 错开时间，避免同时发起太多请求
        if (i > 0 && i % 3 === 0) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
    
    // 等待前10张图片预加载完成
    await Promise.all(preloadPromises);
    console.log(`📦 移动端图片缓存初始化完成，已缓存 ${imageCache.size} 张图片`);
    
    // 后台继续预加载剩余图片
    setTimeout(() => {
        preloadRemainingImages();
    }, 500);
}

// 后台预加载剩余图片
async function preloadRemainingImages() {
    const isMobile = isMobileDevice();
    if (!isMobile) return;
    
    for (let i = 10; i < productImages.length; i++) {
        const item = productImages[i];
        const imageUrl = getImageUrl(item);
        
        // 如果已经缓存，跳过
        if (imageCache.has(imageUrl) && imageCacheStatus.get(imageUrl) === 'loaded') {
            continue;
        }
        
        // 如果正在加载，跳过
        if (imageCacheStatus.get(imageUrl) === 'loading') {
            continue;
        }
        
        // 创建预加载
        const img = new Image();
        imageCacheStatus.set(imageUrl, 'loading');
        
        img.onload = function() {
            imageCache.set(imageUrl, img);
            imageCacheStatus.set(imageUrl, 'loaded');
        };
        
        img.onerror = function() {
            // 如果WebP失败，尝试JPG
            if (imageUrl.includes('.webp')) {
                const fallbackUrl = getImageUrl({ ...item, image: item.fallback || item.image.replace('.webp', '.jpg') });
                const fallbackImg = new Image();
                fallbackImg.onload = function() {
                    imageCache.set(fallbackUrl, fallbackImg);
                    imageCacheStatus.set(fallbackUrl, 'loaded');
                    imageCacheStatus.set(imageUrl, 'loaded');
                };
                fallbackImg.onerror = function() {
                    imageCacheStatus.set(imageUrl, 'error');
                };
                fallbackImg.src = fallbackUrl;
            } else {
                imageCacheStatus.set(imageUrl, 'error');
            }
        };
        
        img.src = imageUrl;
        
        // 每3张图片暂停一下，避免网络拥塞
        if ((i - 10) % 3 === 0 && i > 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

// 从缓存获取图片（移动端优先使用缓存）
function getCachedImage(url) {
    const isMobile = isMobileDevice();
    if (!isMobile) return null;
    
    // 检查内存缓存
    if (imageCache.has(url) && imageCacheStatus.get(url) === 'loaded') {
        return imageCache.get(url);
    }
    
    return null;
}

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
    
    // 移动端：初始化图片缓存（提前加载并缓存图片）
    const isMobile = isMobileDevice();
    if (isMobile) {
        // 异步初始化缓存，不阻塞主流程
        initializeImageCache().catch(err => {
            console.error('图片缓存初始化失败:', err);
        });
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
        
        // 显示第一个产品（使用setTimeout确保DOM完全准备好）
        setTimeout(() => {
            showProduct(0);
            updateProgress();
            updateNavButtons();
        }, 50);
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
    // 最大化高度，减少留白
    imageContainer.style.width = '100%';
    imageContainer.style.height = 'calc(100vh - 20px)';
    imageContainer.style.minHeight = 'calc(100vh - 30px)';
    imageContainer.style.maxHeight = 'calc(100vh - 10px)';
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
    img.style.setProperty('max-width', '100%', 'important');
    img.style.setProperty('max-height', '100%', 'important');
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
                // 确保图片样式正确（刷新后可能丢失）
                this.style.setProperty('position', 'absolute', 'important');
                this.style.setProperty('top', '50%', 'important');
                this.style.setProperty('left', '50%', 'important');
                this.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                this.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                this.style.setProperty('display', 'block', 'important');
                this.style.setProperty('margin', '0', 'important');
                this.style.setProperty('max-width', '100%', 'important');
                this.style.setProperty('max-height', '100%', 'important');
                this.style.width = 'auto';
                this.style.height = 'auto';
                this.style.objectFit = 'contain';
                if (loadingPlaceholder) {
                    loadingPlaceholder.style.display = 'none';
                }
                // 使用requestAnimationFrame确保样式已应用后再显示
                requestAnimationFrame(() => {
                    this.style.opacity = '1';
                });
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
                        // 确保图片样式正确（刷新后可能丢失）
                        this.style.setProperty('position', 'absolute', 'important');
                        this.style.setProperty('top', '50%', 'important');
                        this.style.setProperty('left', '50%', 'important');
                        this.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                        this.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                        this.style.setProperty('display', 'block', 'important');
                        this.style.setProperty('margin', '0', 'important');
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
    
    // 预加载策略优化：立即开始预加载后续图片
    if (index === 0) {
        // 第一张加载后，立即开始预加载后续多张图片
        // 减少延迟，更激进地预加载以提高切换速度
        setTimeout(() => {
            // 预加载接下来的2-3张图片
            const preloadCount = isMobile ? 2 : 3;
            for (let i = 1; i <= preloadCount && i < productImages.length; i++) {
                setTimeout(() => {
                    preloadImage(i);
                }, i * 100); // 错开时间，避免同时发起太多请求
            }
        }, isMobile ? 300 : 200); // 减少延迟时间，更快开始预加载
    }
    
    // 图片加载完成事件（统一处理所有图片）
    // 使用命名函数以便可以移除监听器，避免重复绑定
    const handleImageLoad = function() {
        // 检查图片元素和父元素是否存在
        if (!this || !this.parentElement) {
            console.warn('图片元素或父元素不存在，跳过加载处理');
            return;
        }
        
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
        // 使用setTimeout确保DOM已准备好
        setTimeout(() => {
            if (img && img.parentElement) {
                handleImageLoad.call(img);
            }
        }, 0);
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
        // 检查父元素是否存在
        if (this && this.parentElement) {
            const placeholder = this.parentElement.querySelector('.image-loading');
            if (placeholder) {
                placeholder.style.display = 'flex';
                placeholder.innerHTML = '<div class="image-error">图片加载失败<br><button onclick="location.reload()" style="margin-top:10px;padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;">重试</button></div>';
            }
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
    
    // 初始化该产品的爱心数量（如果还没有从服务器加载，使用随机初始值）
    if (heartCounts[index] === undefined) {
        const productId = item.id;
        heartCounts[index] = getRandomInitialCount(productId); // 随机初始值，稍后会被服务器数据覆盖
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
        // 如果加载后还是没有，使用随机初始值
        if (heartCounts[productIndex] === undefined) {
            const productId = productImages[productIndex].id;
            heartCounts[productIndex] = getRandomInitialCount(productId);
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
                
                // 如果服务器返回了count值，始终使用服务器值以确保数据一致性
                if (result.count !== undefined) {
                    const currentLocalCount = heartCounts[productIndex];
                    const serverCount = result.count;
                    
                    // 始终使用服务器返回的值，确保本地与服务器保持一致
                    // 这样可以避免本地和服务器数据不一致的问题
                    updateHeartCountDisplay(productIndex, serverCount);
                    
                    if (result.success) {
                        if (serverCount === currentLocalCount) {
                            console.log(`✅ 产品 ${productId} 爱心数量已保存到服务器: ${serverCount} (本地: ${currentLocalCount})`);
                        } else {
                            console.log(`✅ 产品 ${productId} 爱心数量已保存到服务器: ${serverCount} (本地已同步: ${currentLocalCount} -> ${serverCount})`);
                        }
                    } else {
                        console.warn(`⚠️ 产品 ${productId} 更新失败，但使用服务器返回的值: ${serverCount}`);
                    }
                    return; // 有count值，退出重试循环
                } else if (result.success) {
                    // 成功但没有count值，保持本地更新
                    console.log(`✅ 产品 ${productId} 更新成功（使用本地值）`);
                    return;
                } else {
                    // 检查是否是数据库连接失败的情况
                    if (result.databaseAvailable === false || result.localOnly === true) {
                        // 数据库不可用，但这是预期的，不抛出错误
                        // 只在首次出现时输出警告，避免重复日志
                        if (!window._dbWarningShown) {
                            console.warn(`⚠️ 数据库连接失败，数据仅本地有效，无法保存到服务器`);
                            console.warn(`   提示: 请检查 Zeabur 环境变量中的 MONGODB_URI 配置`);
                            window._dbWarningShown = true;
                        }
                        return; // 直接返回，不重试
                    }
                    throw new Error(result.message || '服务器返回失败');
                }
            } catch (error) {
                retryCount++;
                // 检查是否是数据库连接失败（这种情况不需要重试）
                const isDatabaseError = error.message && (
                    error.message.includes('数据库连接失败') || 
                    error.message.includes('数据库未配置') ||
                    error.message.includes('503')
                );
                
                if (isDatabaseError) {
                    // 数据库连接失败，不重试，直接使用本地值
                    // 只在首次出现时输出警告，避免重复日志
                    if (!window._dbWarningShown) {
                        console.warn(`⚠️ 数据库连接失败，数据仅本地有效，无法保存到服务器`);
                        console.warn(`   提示: 请检查 Zeabur 环境变量中的 MONGODB_URI 配置`);
                        window._dbWarningShown = true;
                    }
                    return; // 直接返回，不继续重试
                }
                
                console.error(`更新爱心数量到服务器失败 (尝试 ${retryCount}/${maxRetries}):`, error);
                
                if (retryCount < maxRetries) {
                    // 等待后重试（指数退避）
                    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                } else {
                    // 所有重试都失败，保持本地更新
                    console.warn('⚠️ 所有重试都失败，数据仅本地有效。本地数量:', localCountBeforeUpdate);
                    console.warn('   数据已更新到本地，但无法保存到服务器');
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
                
                // 如果服务器有数据，优先使用服务器值（确保所有设备显示一致）
                if (serverCount !== undefined) {
                    const localCount = heartCounts[index];
                    const localUpdateTime = lastUpdateTime[index] || 0;
                    
                    // 如果本地有用户点击的更新（5秒内），且本地值是基于服务器值的合理递增
                    // 说明本地更新还未同步到服务器，保持本地值以提供即时反馈
                    const timeSinceLocalUpdate = Date.now() - localUpdateTime;
                    if (timeSinceLocalUpdate < 5000 && localCount !== undefined && localCount > serverCount) {
                        // 检查本地值是否是合理的递增（服务器值 + 1, +2, +3...）
                        // 如果本地值在合理范围内（服务器值 + 1 到 +10），说明是用户点击导致的，保持本地值
                        const increment = localCount - serverCount;
                        if (increment > 0 && increment <= 10) {
                            // 本地值是基于服务器值的合理递增，保持本地值（等待服务器同步）
                            console.log(`产品 ${productId} 保持本地最新值: ${localCount} (服务器: ${serverCount}, 增量: ${increment})`);
                        } else {
                            // 本地值异常（可能是随机初始值），使用服务器值确保一致性
                            heartCounts[index] = serverCount;
                            console.log(`产品 ${productId} 使用服务器值: ${serverCount} (本地值 ${localCount} 异常，重置为服务器值)`);
                        }
                    } else {
                        // 使用服务器值（确保所有设备显示一致）
                        // 这是最重要的：服务器值是唯一真实来源，必须优先使用
                        heartCounts[index] = serverCount;
                    }
                } else {
                    // 如果服务器没有该产品的数据，使用随机初始值（仅用于显示，不影响服务器数据）
                    heartCounts[index] = getRandomInitialCount(productId);
                    console.warn(`产品 ${productId} 在服务器中没有数据，使用随机初始值 ${heartCounts[index]}`);
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
            // 即使success为false，如果包含heartCounts字段，也尝试使用
            if (result.heartCounts && typeof result.heartCounts === 'object') {
                console.log('⚠️ 服务器返回success:false，但包含heartCounts数据，使用该数据');
                if (result.message) {
                    console.log('   提示:', result.message);
                }
                productImages.forEach((item, index) => {
                    const productId = item.id;
                    if (result.heartCounts[productId] !== undefined) {
                        heartCounts[index] = result.heartCounts[productId];
                        const countDisplay = document.querySelector(`.heart-count[data-product-index="${index}"]`);
                        if (countDisplay) {
                            countDisplay.textContent = formatNumber(heartCounts[index]);
                        }
                    } else if (heartCounts[index] === undefined) {
                        const productId = item.id;
                        heartCounts[index] = getRandomInitialCount(productId);
                    }
                });
            } else {
                // 如果服务器返回失败且没有heartCounts，保持现有数据，不重置
                console.warn('⚠️ 服务器返回失败且无heartCounts数据，保持现有数据');
                if (result.message) {
                    console.warn('   服务器消息:', result.message);
                }
                // 只有在heartCounts完全为空时才设置随机初始值
                productImages.forEach((item, index) => {
                    if (heartCounts[index] === undefined) {
                        const productId = item.id;
                        heartCounts[index] = getRandomInitialCount(productId);
                    }
                    // 如果已有数据，保持不变
                });
            }
        }
    } catch (error) {
        console.error('❌ 从服务器加载爱心数量失败:', error);
        // 如果失败，保持现有数据，不重置
        // 只有在完全没有数据时才设置随机初始值
        productImages.forEach((item, index) => {
            if (heartCounts[index] === undefined) {
                const productId = item.id;
                heartCounts[index] = getRandomInitialCount(productId);
            }
            // 如果已有数据，保持不变
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

// 检测是否为硬刷新
function isHardRefresh() {
    // 检测页面刷新类型
    const navigation = window.performance && window.performance.navigation;
    const navigationType = window.performance && window.performance.getEntriesByType && 
                          window.performance.getEntriesByType('navigation')[0];
    
    // 如果是刷新操作（type 1 = reload）
    const isReload = (navigation && navigation.type === 1) || 
                     (navigationType && navigationType.type === 'reload');
    
    // 或者从缓存中检测（硬刷新会清空缓存）
    const cacheCleared = !sessionStorage.getItem('soft_refresh');
    
    return isReload || cacheCleared;
}

// 图片加载重试机制（优化版，更好的错误处理）
function loadImageWithRetry(img, imageUrl, fallbackUrl, maxRetries = 2, retryCount = 0) {
    return new Promise((resolve, reject) => {
        // WebP格式文件更小，加载更快，可以适当缩短超时时间
        // 硬刷新时增加超时时间，因为所有资源都需要重新加载
        const isMobile = isMobileDevice();
        const hardRefresh = isHardRefresh();
        // WebP通常比JPG小30-50%，加载更快，所以缩短基础超时时间
        // 硬刷新时增加50%的超时时间
        const baseTimeout = isMobile ? 15000 : 12000; // WebP更快，缩短超时时间
        const timeoutDuration = hardRefresh ? Math.floor(baseTimeout * 1.5) : baseTimeout;
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
                // 确保图片样式正确（刷新后可能丢失）
                img.style.setProperty('position', 'absolute', 'important');
                img.style.setProperty('top', '50%', 'important');
                img.style.setProperty('left', '50%', 'important');
                img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                img.style.setProperty('display', 'block', 'important');
                img.style.setProperty('margin', '0', 'important');
                img.style.setProperty('max-width', '100%', 'important');
                img.style.setProperty('max-height', '100%', 'important');
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.style.objectFit = 'contain';
                // 确保隐藏加载占位符
                const placeholder = img.parentElement.querySelector('.image-loading');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
                // 使用requestAnimationFrame确保样式已应用后再显示
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                    console.log(`✅ 图片加载成功: ${imageUrl}`);
                });
                resolve();
            } else {
                reject(new Error('图片元素不存在'));
            }
        };
        
        tempImg.onerror = function(error) {
            clearTimeout(timeout);
            console.warn(`⚠️ 图片加载错误 (尝试 ${retryCount + 1}/${maxRetries + 1}): ${imageUrl}`);
            
            // 如果是 WebP 且还有回退图片，尝试回退到JPG
            if (imageUrl.includes('.webp') && fallbackUrl && retryCount === 0) {
                console.log('WebP 加载失败，尝试回退到 JPG: ' + fallbackUrl);
                loadImageWithRetry(img, fallbackUrl, null, maxRetries, retryCount + 1)
                    .then(resolve)
                    .catch(reject);
            } else if (retryCount < maxRetries) {
                // 重试，使用指数退避，但最大不超过3秒
                // 硬刷新时稍微延长延迟
                const hardRefresh = isHardRefresh();
                const baseDelay = Math.min(1000 * (retryCount + 1), 3000);
                const delay = hardRefresh ? Math.floor(baseDelay * 1.2) : baseDelay;
                console.log(`等待 ${delay}ms 后重试...`);
                setTimeout(() => {
                    loadImageWithRetry(img, imageUrl, fallbackUrl, maxRetries, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                }, delay);
            } else {
                // 所有重试都失败了
                // 如果当前URL是WebP且有fallback，最后尝试一次JPG
                if (imageUrl.includes('.webp') && fallbackUrl) {
                    console.log('所有重试失败，最后尝试JPG回退: ' + fallbackUrl);
                    // 直接尝试加载fallback，不经过重试逻辑
                    const finalImg = new Image();
                    const finalTimeout = setTimeout(() => {
                        finalImg.onload = null;
                        finalImg.onerror = null;
                        reject(new Error(`图片加载失败: ${imageUrl}`));
                    }, 15000);
                    
                    finalImg.onload = function() {
                        clearTimeout(finalTimeout);
                        img.src = fallbackUrl;
                        img.dataset.loaded = 'true';
                        const placeholder = img.parentElement?.querySelector('.image-loading');
                        if (placeholder) placeholder.style.display = 'none';
                        img.style.opacity = '1';
                        resolve();
                    };
                    
                    finalImg.onerror = function() {
                        clearTimeout(finalTimeout);
                        reject(new Error(`图片加载失败: ${imageUrl} (JPG回退也失败)`));
                    };
                    
                    finalImg.src = fallbackUrl;
                } else {
                    reject(new Error(`图片加载失败: ${imageUrl}`));
                }
            }
        };
        
        // 开始加载图片
        tempImg.src = imageUrl;
    });
}

// 预加载队列，控制并发数量
let preloadQueue = [];
let activePreloads = 0;
// 动态计算预加载并发数：移动端8个，桌面端8个（更激进的预加载策略，确保图片提前准备好）
const MAX_PRELOAD_CONCURRENT = isMobileDevice() ? 8 : 8;

// 预加载图片（静默加载，不显示占位符，增强错误处理，移动端优先使用缓存）
function preloadImage(index) {
    if (index < 0 || index >= productImages.length) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    if (!card) return;
    
    const img = card.querySelector('.product-image');
    if (!img || img.dataset.loaded === 'true' || img.dataset.preloading === 'true' || img.dataset.preloaded === 'true') {
        return;
    }
    
    // 如果队列已满或正在加载太多，加入队列等待
    if (activePreloads >= MAX_PRELOAD_CONCURRENT) {
        if (!preloadQueue.includes(index)) {
            preloadQueue.push(index);
        }
        return;
    }
    
    // 开始预加载
    img.dataset.preloading = 'true';
    activePreloads++;
    
    // 检测是否为移动设备
    const isMobile = isMobileDevice();
    
    const item = productImages[index];
    // 所有端都优先使用WebP（与getImageUrl逻辑一致）
    let imageUrl;
    let fallbackUrl;
    
    // 优先使用WebP，所有端都使用WebP
    if (supportsWebP() && item.image) {
        imageUrl = item.image.includes('?') 
            ? item.image 
            : `${item.image}?v=${IMAGE_VERSION}`;
        const baseFallback = item.fallback || item.image.replace('.webp', '.jpg');
        fallbackUrl = baseFallback.includes('?') 
            ? baseFallback 
            : `${baseFallback}?v=${IMAGE_VERSION}`;
    } else {
        // 浏览器不支持WebP，直接使用JPG
        const baseFallback = item.fallback || item.image.replace('.webp', '.jpg');
        imageUrl = baseFallback.includes('?') 
            ? baseFallback 
            : `${baseFallback}?v=${IMAGE_VERSION}`;
        fallbackUrl = null;
    }
    
    // 在data属性中保存URL，供后续加载使用
        img.dataset.src = imageUrl;
    if (fallbackUrl) {
        img.dataset.fallback = fallbackUrl;
    }
    
    // 移动端：优先从缓存获取图片
    if (isMobile) {
        const cachedImg = getCachedImage(imageUrl);
        if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
            // 缓存中有图片，直接使用
            img.dataset.preloaded = 'true';
            img.dataset.preloading = 'false';
            img.dataset.preloadSrc = cachedImg.src;
            img.src = cachedImg.src;
            img.dataset.loaded = 'true';
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.transition = 'none';
            activePreloads--;
            processPreloadQueue();
            console.log(`✅ 图片 ${index + 1} 使用缓存: ${imageUrl}`);
            return;
        }
        
        // 如果fallback在缓存中
        if (fallbackUrl) {
            const cachedFallback = getCachedImage(fallbackUrl);
            if (cachedFallback && cachedFallback.complete && cachedFallback.naturalWidth > 0) {
                img.dataset.preloaded = 'true';
                img.dataset.preloading = 'false';
                img.dataset.preloadSrc = cachedFallback.src;
                img.dataset.preloadFallback = fallbackUrl;
                img.src = cachedFallback.src;
                img.dataset.loaded = 'true';
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                img.style.transition = 'none';
                activePreloads--;
                processPreloadQueue();
                console.log(`✅ 图片 ${index + 1} 使用缓存（JPG回退）: ${fallbackUrl}`);
                return;
            }
        }
    }
    
    const preloadImg = new Image();
    
    // 设置超时，优化超时时间（WebP格式加载更快）
    const timeoutDuration = isMobile ? 10000 : 8000; // 移动端10秒，桌面端8秒（WebP加载更快）
    const timeout = setTimeout(() => {
        preloadImg.onload = null;
        preloadImg.onerror = null;
        img.dataset.preloading = 'false';
        activePreloads--;
        processPreloadQueue(); // 处理队列中的下一个
        
        // 如果WebP超时，尝试JPG（只在桌面端且使用WebP时）
        if (imageUrl.includes('.webp') && fallbackUrl) {
            const fallbackImg = new Image();
            const fallbackTimeout = setTimeout(() => {
                fallbackImg.onload = null;
                fallbackImg.onerror = null;
            }, 10000);
            
            fallbackImg.onload = function() {
                clearTimeout(fallbackTimeout);
                img.dataset.preloaded = 'true';
                img.dataset.preloadFallback = fallbackUrl;
                // 保存预加载的URL，供切换时使用
                if (fallbackImg.src) {
                    img.dataset.preloadSrc = fallbackImg.src;
                }
                console.log(`✅ 图片 ${index + 1} (${item.name}) 预加载完成（使用JPG回退）`);
            };
            fallbackImg.onerror = function() {
                clearTimeout(fallbackTimeout);
                console.warn(`⚠️ 图片 ${index + 1} (${item.name}) 回退格式也加载失败`);
            };
            fallbackImg.src = fallbackUrl;
        }
    }, timeoutDuration);
    
    preloadImg.onload = function() {
        clearTimeout(timeout);
        img.dataset.preloaded = 'true';
        img.dataset.preloading = 'false';
        // 如果预加载成功，将URL保存到img元素，这样切换时可以直接使用
        if (preloadImg.src) {
            // 移动端：将图片添加到缓存
            if (isMobile) {
                imageCache.set(imageUrl, preloadImg);
                imageCacheStatus.set(imageUrl, 'loaded');
            }
            
            // 保存预加载的URL，供切换时使用
            img.dataset.preloadSrc = preloadImg.src;
            // 直接设置img的src，这样切换时图片已经在缓存中，可以立即显示
            if (!img.src || img.src !== preloadImg.src) {
                img.src = preloadImg.src;
            }
            // 确保图片样式正确（立即应用）
                img.style.setProperty('position', 'absolute', 'important');
                img.style.setProperty('top', '50%', 'important');
                img.style.setProperty('left', '50%', 'important');
                img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
            img.style.setProperty('display', 'block', 'important');
            img.style.setProperty('max-width', '100%', 'important');
            img.style.setProperty('max-height', '100%', 'important');
            
            // 如果图片已经在缓存中（complete），立即标记为已加载
            if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                img.dataset.loaded = 'true';
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                img.style.transition = 'none'; // 移除过渡，立即显示
            } else {
                // 图片还在加载，立即添加load事件监听
                const onLoad = () => {
                    img.dataset.loaded = 'true';
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                    img.style.transition = 'none'; // 移除过渡，立即显示
                    img.removeEventListener('load', onLoad);
                };
                // 如果图片已经加载完成但事件还没触发，立即调用
                if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                    onLoad();
                } else {
                img.addEventListener('load', onLoad, { once: true });
                }
            }
        }
        activePreloads--;
        processPreloadQueue(); // 处理队列中的下一个
        console.log(`✅ 图片 ${index + 1} (${item.name}) 预加载完成`);
    };
    
    preloadImg.onerror = function() {
        clearTimeout(timeout);
        // 如果 WebP 失败，尝试 JPG（只在桌面端且使用WebP时）
        if (imageUrl.includes('.webp') && fallbackUrl) {
            console.log(`图片 ${index + 1} (${item.name}) WebP加载失败，尝试JPG回退`);
            const fallbackImg = new Image();
            const fallbackTimeout = setTimeout(() => {
                fallbackImg.onload = null;
                fallbackImg.onerror = null;
                img.dataset.preloading = 'false';
                activePreloads--;
                processPreloadQueue();
            }, 10000);
            
            fallbackImg.onload = function() {
                clearTimeout(fallbackTimeout);
                img.dataset.preloaded = 'true';
                img.dataset.preloadFallback = fallbackUrl;
                img.dataset.preloading = 'false';
                // 保存预加载的URL，供切换时使用
                if (fallbackImg.src) {
                    // 移动端：将fallback图片添加到缓存
                    if (isMobile) {
                        imageCache.set(fallbackUrl, fallbackImg);
                        imageCacheStatus.set(fallbackUrl, 'loaded');
                        imageCacheStatus.set(imageUrl, 'loaded'); // 标记原URL也为已加载
                    }
                    
                    img.dataset.preloadSrc = fallbackImg.src;
                    // 直接设置img的src，这样切换时图片已经在缓存中
                    if (!img.src || img.src !== fallbackImg.src) {
                        img.src = fallbackImg.src;
                    }
                    // 确保图片样式正确
                    img.style.setProperty('position', 'absolute', 'important');
                    img.style.setProperty('top', '50%', 'important');
                    img.style.setProperty('left', '50%', 'important');
                    img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    // 如果图片已经在缓存中，标记为已加载
                    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                        img.dataset.loaded = 'true';
                        img.style.opacity = '1';
                        img.style.visibility = 'visible';
                        img.style.transition = 'none'; // 移除过渡，立即显示
                    }
                }
                activePreloads--;
                processPreloadQueue();
                console.log(`✅ 图片 ${index + 1} (${item.name}) 预加载完成（使用JPG回退）`);
            };
            fallbackImg.onerror = function() {
                clearTimeout(fallbackTimeout);
                img.dataset.preloading = 'false';
                activePreloads--;
                processPreloadQueue();
                console.warn(`⚠️ 图片 ${index + 1} (${item.name}) 预加载失败（WebP和JPG都失败）`);
            };
            fallbackImg.src = fallbackUrl;
        } else {
            img.dataset.preloading = 'false';
            activePreloads--;
            processPreloadQueue();
            console.warn(`⚠️ 图片 ${index + 1} (${item.name}) 预加载失败`);
        }
    };
    
    preloadImg.src = imageUrl;
}

// 处理预加载队列
function processPreloadQueue() {
    if (activePreloads >= MAX_PRELOAD_CONCURRENT || preloadQueue.length === 0) {
        return;
    }
    
    const nextIndex = preloadQueue.shift();
    preloadImage(nextIndex);
}

// 加载图片（懒加载，带重试机制，优化版：确保加载完成后立即显示）
async function loadImage(index) {
    const card = document.querySelector(`[data-index="${index}"]`);
    if (!card) return;
    
    const img = card.querySelector('.product-image');
    if (!img) return;
    
    // 检查图片是否已经加载完成
    if (img.dataset.loaded === 'true' && img.src && img.complete && img.naturalWidth > 0) {
        // 图片已经加载，确保可见
        if (img.style.opacity !== '1') {
            img.style.opacity = '1';
        }
        // 确保样式正确
        img.style.setProperty('position', 'absolute', 'important');
        img.style.setProperty('top', '50%', 'important');
        img.style.setProperty('left', '50%', 'important');
        img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        img.style.setProperty('display', 'block', 'important');
        img.style.setProperty('max-width', '100%', 'important');
        img.style.setProperty('max-height', '100%', 'important');
        // 隐藏加载占位符
        const loadingPlaceholder = card.querySelector('.image-loading');
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
        return Promise.resolve(); // 返回已解决的Promise
    }
    
    // 如果图片未加载，初始化状态
    if (!img.dataset.loaded || img.dataset.loaded !== 'true') {
        img.dataset.loaded = 'false';
        img.style.opacity = '0';
        // 确保图片样式正确
        img.style.setProperty('position', 'absolute', 'important');
        img.style.setProperty('top', '50%', 'important');
        img.style.setProperty('left', '50%', 'important');
        img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        img.style.setProperty('display', 'block', 'important');
        img.style.setProperty('margin', '0', 'important');
        img.style.setProperty('max-width', '100%', 'important');
        img.style.setProperty('max-height', '100%', 'important');
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
    }
    
    // 显示加载占位符
    const loadingPlaceholder = card.querySelector('.image-loading');
    if (loadingPlaceholder) {
        loadingPlaceholder.style.display = 'flex';
    }
    
    const item = productImages[index];
    if (!item) {
        console.error(`产品 ${index} 不存在`);
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
        return;
    }
    
    // 获取图片URL（每次都重新获取，确保URL正确）
    const imageUrl = getImageUrl(item);
    
    // 生成fallback URL，确保格式正确
    // 如果当前是WebP，fallback是JPG；如果已经是JPG，则不需要fallback
    let fallbackUrl = null;
    
    if (imageUrl.includes('.webp')) {
        // 当前是WebP，设置JPG作为fallback
        const baseFallback = item.fallback || item.image.replace('.webp', '.jpg');
        fallbackUrl = baseFallback.includes('?') 
            ? baseFallback 
            : `${baseFallback}?v=${IMAGE_VERSION}`;
    }
    // 如果已经是JPG，则不需要fallback
    
    console.log(`开始加载图片 ${index + 1} (${item.name}): ${imageUrl}`);
    
    // 确保图片URL有效
    if (!imageUrl) {
        console.error(`图片 ${index + 1} (${item.name}) URL为空`);
        if (loadingPlaceholder) {
            loadingPlaceholder.innerHTML = '<div class="image-error">图片URL无效</div>';
        }
        return;
    }
    
    // 如果已经预加载，检查是否可以直接使用
    if (img.dataset.preloaded === 'true') {
        // 优先使用预加载的URL（如果存在）
        const preloadSrc = img.dataset.preloadSrc || img.dataset.preloadFallback || imageUrl;
        
        // 如果预加载的URL和当前URL匹配，或者有预加载的URL，直接使用
        if (preloadSrc && (preloadSrc === imageUrl || preloadSrc === fallbackUrl || img.dataset.preloadSrc)) {
            // 尝试直接设置src，如果已经在缓存中，会立即加载完成
            if (!img.src || img.src !== preloadSrc) {
                img.src = preloadSrc;
            }
            // 检查是否已经加载完成（可能在缓存中）
            if (img.complete && img.naturalWidth > 0) {
                // 图片已经加载，直接显示
                img.dataset.loaded = 'true';
                img.style.opacity = '1';
                if (loadingPlaceholder) {
                    loadingPlaceholder.style.display = 'none';
                }
                // 确保样式正确
                img.style.setProperty('position', 'absolute', 'important');
                img.style.setProperty('top', '50%', 'important');
                img.style.setProperty('left', '50%', 'important');
                img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                img.style.setProperty('display', 'block', 'important');
                img.style.setProperty('max-width', '100%', 'important');
                img.style.setProperty('max-height', '100%', 'important');
                console.log(`✅ 图片 ${index + 1} 使用预加载的图片（缓存）`);
                return Promise.resolve(); // 返回已解决的Promise
            }
            // 如果还没加载完成，等待加载完成（但设置较短的超时，避免等待太久）
            return new Promise((resolve) => {
                const onLoad = () => {
                    img.dataset.loaded = 'true';
                    img.style.opacity = '1';
                    if (loadingPlaceholder) {
                        loadingPlaceholder.style.display = 'none';
                    }
                    // 确保样式正确
                    img.style.setProperty('position', 'absolute', 'important');
                    img.style.setProperty('top', '50%', 'important');
                    img.style.setProperty('left', '50%', 'important');
                    img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
                    img.style.setProperty('display', 'block', 'important');
                    img.style.setProperty('max-width', '100%', 'important');
                    img.style.setProperty('max-height', '100%', 'important');
                    img.removeEventListener('load', onLoad);
                    img.removeEventListener('error', onError);
                    console.log(`✅ 图片 ${index + 1} 使用预加载的图片（加载完成）`);
                    resolve();
                };
                const onError = () => {
                    img.removeEventListener('load', onLoad);
                    img.removeEventListener('error', onError);
                    // 预加载失败，继续使用正常加载流程
                    console.warn(`⚠️ 预加载的图片加载失败，使用正常加载流程`);
                    // 继续执行下面的正常加载流程
                    loadImageWithRetry(img, imageUrl, fallbackUrl).then(resolve).catch(resolve);
                };
                img.addEventListener('load', onLoad, { once: true });
                img.addEventListener('error', onError, { once: true });
                // 设置较短的超时（2秒），如果还没加载完成，继续正常流程
                setTimeout(() => {
                    if (img.dataset.loaded !== 'true') {
                        img.removeEventListener('load', onLoad);
                        img.removeEventListener('error', onError);
                        loadImageWithRetry(img, imageUrl, fallbackUrl).then(resolve).catch(resolve);
                    }
                }, 2000);
            });
        }
    }
    
    // 使用重试机制加载图片
    // WebP格式加载更快，缩短超时时间
    const isMobile = isMobileDevice();
    const loadTimeoutDuration = isMobile ? 20000 : 18000; // WebP更快，缩短超时时间
    const loadTimeout = setTimeout(() => {
        if (img.dataset.loaded !== 'true' && loadingPlaceholder) {
            console.warn(`图片 ${index + 1} 加载超时，隐藏占位符`);
            loadingPlaceholder.style.display = 'none';
        }
    }, loadTimeoutDuration);
    
    try {
        await loadImageWithRetry(img, imageUrl, fallbackUrl);
        clearTimeout(loadTimeout);
        // 加载成功后，确保隐藏占位符
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
        // 确保图片可见并正确显示
        img.dataset.loaded = 'true';
        // 确保图片样式正确（刷新后可能丢失）
        img.style.setProperty('position', 'absolute', 'important');
        img.style.setProperty('top', '50%', 'important');
        img.style.setProperty('left', '50%', 'important');
        img.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        img.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        img.style.setProperty('display', 'block', 'important');
        img.style.setProperty('margin', '0', 'important');
        img.style.setProperty('max-width', '100%', 'important');
        img.style.setProperty('max-height', '100%', 'important');
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        // 立即设置opacity为1，确保图片立即显示（不使用requestAnimationFrame延迟）
        img.style.opacity = '1';
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
    
    // 预加载策略优化：立即预加载下一张，减少滑动时的空白
    const nextIndex = index + 1;
    
    // 立即预加载下一张（不延迟），确保滑动时已经准备好
    if (nextIndex < productImages.length) {
            preloadImage(nextIndex);
    }
    
    // 同时预加载上一张（如果存在），支持向后滑动
    if (index > 0) {
            preloadImage(index - 1);
    }
}

// 检查图片是否已加载完成（优化版：最严格的检查，确保图片真正可用且可见）
function isImageLoaded(index) {
    const card = document.querySelector(`[data-index="${index}"]`);
    if (!card) return false;
    
    const img = card.querySelector('.product-image');
    if (!img) return false;
    
    // 严格检查：图片必须完全加载（包括naturalHeight，确保图片数据完整）
    const isComplete = img.src && 
           img.complete && 
           img.naturalWidth > 0 &&
                       img.naturalHeight > 0;
    
    // 检查图片是否真正可见（offsetWidth和offsetHeight必须大于0）
    const isVisible = img.offsetWidth > 0 && img.offsetHeight > 0;
    
    // 检查图片是否已加载完成（优先检查预加载状态）
    // 如果已预加载且图片数据完整，立即标记为已加载
    if (img.dataset.preloaded === 'true' && isComplete) {
        // 预加载的图片已准备好，立即标记为已加载
        img.dataset.loaded = 'true';
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.transition = 'none';
        return true;
    }
    
    // 标准检查：图片已加载完成、数据完整、且可见
    return img.dataset.loaded === 'true' && 
           isComplete &&
           (isVisible || img.style.opacity === '1') &&
           img.style.opacity !== '0';
}

// 显示指定产品（优化版：确保图片加载完成后再切换，避免空白和闪烁）
async function showProduct(index) {
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
    
    // 检查目标图片是否已加载完成
    const targetCard = document.querySelector(`[data-index="${index}"]`);
    const targetImg = targetCard ? targetCard.querySelector('.product-image') : null;
    const targetContainer = targetCard ? targetCard.querySelector('.product-image-container') : null;
    
    // 确保容器有背景色，避免空白
    if (targetContainer) {
        targetContainer.style.background = '#f8f9fa';
    }
    
    // 显示加载占位符（如果图片还没加载完成）
    const loadingPlaceholder = targetCard ? targetCard.querySelector('.image-loading') : null;
    
    // 检查图片是否已加载完成（移动端和电脑端使用相同的快速切换逻辑）
    const isMobile = isMobileDevice();
    let imageReady = isImageLoaded(index);
    
    // 统一处理：快速检查并加载，移动端优先使用缓存
    if (!imageReady && targetImg) {
        // 移动端：优先从缓存获取图片
        if (isMobile) {
            const item = productImages[index];
            const imageUrl = getImageUrl(item);
            const cachedImg = getCachedImage(imageUrl);
            
            if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0 && cachedImg.naturalHeight > 0) {
                // 缓存中有图片，直接使用
                targetImg.src = cachedImg.src;
                targetImg.dataset.loaded = 'true';
                targetImg.dataset.preloaded = 'true';
                targetImg.dataset.preloadSrc = cachedImg.src;
                targetImg.style.opacity = '1';
                targetImg.style.visibility = 'visible';
                targetImg.style.transition = 'none';
                if (loadingPlaceholder) {
                    loadingPlaceholder.style.display = 'none';
    }
                imageReady = true;
            } else if (item.fallback) {
                // 尝试fallback缓存
                const fallbackUrl = getImageUrl({ ...item, image: item.fallback });
                const cachedFallback = getCachedImage(fallbackUrl);
                if (cachedFallback && cachedFallback.complete && cachedFallback.naturalWidth > 0) {
                    targetImg.src = cachedFallback.src;
                    targetImg.dataset.loaded = 'true';
                    targetImg.dataset.preloaded = 'true';
                    targetImg.dataset.preloadSrc = cachedFallback.src;
                    targetImg.style.opacity = '1';
                    targetImg.style.visibility = 'visible';
                    targetImg.style.transition = 'none';
                    if (loadingPlaceholder) {
                        loadingPlaceholder.style.display = 'none';
                    }
                    imageReady = true;
                }
            }
        }
        
        // 如果缓存中没有，使用预加载逻辑
        if (!imageReady) {
        // 检查是否已预加载
            const isPreloaded = targetImg.dataset.preloaded === 'true';
        
        if (isPreloaded) {
                // 已预加载，立即设置src并检查
            const preloadSrc = targetImg.dataset.preloadSrc || targetImg.dataset.preloadFallback;
            if (preloadSrc) {
                // 如果src还没设置或不同，立即设置
                if (!targetImg.src || targetImg.src !== preloadSrc) {
                    targetImg.src = preloadSrc;
                }
                
                    // 立即检查图片是否已经在浏览器缓存中（预加载可能已完成）
                    if (targetImg.complete && targetImg.naturalWidth > 0 && targetImg.naturalHeight > 0) {
                    // 图片已在缓存中，立即显示
                    targetImg.dataset.loaded = 'true';
                    targetImg.style.opacity = '1';
                        targetImg.style.visibility = 'visible';
                        targetImg.style.transition = 'none';
                    if (loadingPlaceholder) {
                        loadingPlaceholder.style.display = 'none';
                    }
                        imageReady = true;
                } else {
                        // 图片正在加载，移动端短暂等待确保图片准备好
                        if (isMobile) {
                            // 移动端：等待图片加载完成（最多等待200ms，避免卡顿）
                            await new Promise(resolve => {
                            let resolved = false;
                            const maxWait = 200; // 最多等待200ms
                            const startTime = Date.now();
                            
                            const checkAndResolve = () => {
                                if (resolved) return;
                                if (targetImg.complete && targetImg.naturalWidth > 0 && targetImg.naturalHeight > 0) {
                                    resolved = true;
                                    targetImg.dataset.loaded = 'true';
                                    targetImg.style.opacity = '1';
                                    targetImg.style.visibility = 'visible';
                                    targetImg.style.transition = 'none';
                                    if (loadingPlaceholder) {
                                        loadingPlaceholder.style.display = 'none';
                                    }
                                    resolve();
                                } else if (Date.now() - startTime > maxWait) {
                                    resolved = true;
                                    resolve(); // 超时后继续，不阻塞
                                }
                            };
                            
                            // 立即检查一次
                            checkAndResolve();
                            if (resolved) return;
                            
                            // 添加load事件监听
                    const onLoad = () => {
                                if (resolved) return;
                                resolved = true;
                        targetImg.dataset.loaded = 'true';
                        targetImg.style.opacity = '1';
                                targetImg.style.visibility = 'visible';
                                targetImg.style.transition = 'none';
                        if (loadingPlaceholder) {
                            loadingPlaceholder.style.display = 'none';
                        }
                        targetImg.removeEventListener('load', onLoad);
                                targetImg.removeEventListener('error', onError);
                                resolve();
                            };
                            
                            const onError = () => {
                                if (resolved) return;
                                resolved = true;
                                targetImg.removeEventListener('load', onLoad);
                                targetImg.removeEventListener('error', onError);
                                resolve();
                            };
                            
                            // 如果图片已经加载完成但事件还没触发
                            if (targetImg.complete && targetImg.naturalWidth > 0) {
                                onLoad();
                                return;
                            }
                            
                    targetImg.addEventListener('load', onLoad, { once: true });
                            targetImg.addEventListener('error', onError, { once: true });
                            
                            // 轮询检查（每20ms检查一次）
                            const checkInterval = setInterval(() => {
                                checkAndResolve();
                                if (resolved) {
                                    clearInterval(checkInterval);
                                }
                            }, 20);
                            
                            setTimeout(() => {
                                clearInterval(checkInterval);
                                if (!resolved) {
                                    resolved = true;
                                    resolve();
                                }
                            }, maxWait);
                    });
                            imageReady = isImageLoaded(index);
            } else {
                            // 桌面端：异步处理，不等待
                            const onLoad = () => {
                            targetImg.dataset.loaded = 'true';
                            targetImg.style.opacity = '1';
                            targetImg.style.transition = 'none';
                            if (loadingPlaceholder) {
                                loadingPlaceholder.style.display = 'none';
                            }
                            targetImg.removeEventListener('load', onLoad);
                        };
                        
                            if (targetImg.complete && targetImg.naturalWidth > 0) {
                                onLoad();
                            } else {
                                targetImg.addEventListener('load', onLoad, { once: true });
                            }
                        }
                    }
                }
            }
        } else {
            // 未预加载，立即开始加载图片
            if (isMobile) {
                // 移动端：等待图片加载完成（最多等待300ms）
                try {
                    await loadImage(index);
                    // 短暂等待确保图片已渲染
                    await new Promise(resolve => {
                        const maxWait = 100;
                        const startTime = Date.now();
                        const checkInterval = setInterval(() => {
                            if ((targetImg.complete && targetImg.naturalWidth > 0 && targetImg.naturalHeight > 0) || 
                                Date.now() - startTime > maxWait) {
                                clearInterval(checkInterval);
                                resolve();
                            }
                        }, 20);
                setTimeout(() => {
                            clearInterval(checkInterval);
                            resolve();
                        }, maxWait);
                    });
                    imageReady = isImageLoaded(index);
                } catch (error) {
                    console.error(`加载图片 ${index} 失败:`, error);
                }
            } else {
                // 桌面端：异步处理，不阻塞
                    loadImage(index).catch(err => {
                        console.error(`加载图片 ${index} 失败:`, err);
                    });
            }
        }
    }
    
    // 确保图片在切换前已经可见（避免空白和闪烁）
    if (targetImg) {
        // 确保图片样式正确（立即应用，不等待）
        targetImg.style.setProperty('position', 'absolute', 'important');
        targetImg.style.setProperty('top', '50%', 'important');
        targetImg.style.setProperty('left', '50%', 'important');
        targetImg.style.setProperty('transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        targetImg.style.setProperty('-webkit-transform', 'translate(-50%, -50%) translateZ(0)', 'important');
        targetImg.style.setProperty('display', 'block', 'important');
        targetImg.style.setProperty('margin', '0', 'important');
        targetImg.style.setProperty('max-width', '100%', 'important');
        targetImg.style.setProperty('max-height', '100%', 'important');
        
        // 统一处理：检查图片是否已加载（移动端和电脑端相同逻辑）
        const imgLoaded = targetImg.dataset.loaded === 'true' && 
                          targetImg.src && 
                          targetImg.complete && 
                          targetImg.naturalWidth > 0 &&
                          targetImg.naturalHeight > 0;
        
        if (imgLoaded) {
            // 图片已加载，立即显示（不淡入，避免闪烁）
            targetImg.style.opacity = '1';
            targetImg.style.transition = 'none'; // 移除过渡，立即显示
            targetImg.style.visibility = 'visible'; // 确保可见
            // 隐藏加载占位符
            if (loadingPlaceholder) {
                loadingPlaceholder.style.display = 'none';
            }
        } else {
            // 图片未加载完成
            if (loadingPlaceholder) {
                // 如果已预加载，隐藏占位符（避免闪烁）
                if (targetImg.dataset.preloaded === 'true') {
                    loadingPlaceholder.style.display = 'none';
                } else {
            loadingPlaceholder.style.display = 'flex';
                }
            }
            // 确保图片opacity为0，等待加载完成
            if (targetImg.style.opacity !== '1') {
                targetImg.style.opacity = '0';
            }
        }
    }
    
    // 更新当前索引
    currentIndex = index;
    
    // 移动端：确保图片已渲染后再切换，避免短暂空白
    if (isMobile && targetImg) {
        // 使用requestAnimationFrame确保图片已渲染
        await new Promise(resolve => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // 确保图片已加载并可见
                    if (targetImg.complete && targetImg.naturalWidth > 0 && targetImg.naturalHeight > 0) {
                        targetImg.dataset.loaded = 'true';
                        targetImg.style.opacity = '1';
                        targetImg.style.visibility = 'visible';
                        targetImg.style.transition = 'none';
                        if (loadingPlaceholder) {
                            loadingPlaceholder.style.display = 'none';
                        }
                    }
                    resolve();
                });
            });
        });
    }
    
    // 计算并应用transform，确保只显示当前产品
    // 使用容器宽度来计算，确保精确移动
    const translateX = -index * containerWidth;
    // 立即应用变换
    carouselWrapper.style.transform = `translateX(${translateX}px)`;
    carouselWrapper.style.willChange = 'transform';
    // 强制重新计算布局（同步执行，确保立即生效）
    void carouselWrapper.offsetHeight;
    
    // 移动端和桌面端：统一的预加载策略，更激进的预加载确保切换前图片已准备好
    // 注意：isMobile 已在函数前面声明，直接使用
    
    // 立即预加载下一张图片（最高优先级），确保切换前已准备好
        if (index + 1 < productImages.length) {
            preloadImage(index + 1);
        }
        
    // 预加载接下来的多张图片（移动端更激进，预加载更多）
    const preloadCount = isMobile ? 8 : 5; // 移动端预加载8张，桌面端5张
        for (let i = 2; i <= preloadCount && (index + i) < productImages.length; i++) {
        // 错开时间，避免网络拥塞
            setTimeout(() => {
                preloadImage(index + i);
        }, (i - 1) * 10); // 缩短到10ms，更快预加载
    }
    
    // 同时预加载上一张图片（如果存在），支持向后滑动
    if (index > 0) {
        preloadImage(index - 1);
    }
    
    // 预加载更前面的图片（向后滑动时使用）
    if (index > 1) {
        setTimeout(() => {
            preloadImage(index - 2);
        }, 20);
    }
    
    // 移动端：确保缓存中有足够的图片
    if (isMobile && !cacheInitialized) {
        // 如果缓存未初始化，立即初始化
        initializeImageCache().catch(err => {
            console.error('图片缓存初始化失败:', err);
        });
    }
    
    updateProgress();
    updateNavButtons();
    
    // 启动自动轮播
    startAutoPlay();
}

// 上一个产品（支持循环）- 统一逻辑：快速切换，不等待
function previousQuestion() {
    stopAutoPlay(); // 用户手动操作时停止自动轮播
    
    // 立即执行，不等待异步操作
    const targetIndex = currentIndex > 0 ? currentIndex - 1 : productImages.length - 1;
    
    // 直接调用，快速切换（移动端和电脑端相同逻辑）
        showProduct(targetIndex);
}

// 下一个产品（支持循环）- 统一逻辑：快速切换，不等待
function nextQuestion() {
    stopAutoPlay(); // 用户手动操作时停止自动轮播
    
    // 立即执行，不等待异步操作
    const targetIndex = currentIndex < productImages.length - 1 ? currentIndex + 1 : 0;
    
    // 直接调用，快速切换（移动端和电脑端相同逻辑）
        showProduct(targetIndex);
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

// 触摸滑动支持（移动设备和平板）- 优化版：确保滑动优先，不受双击阻止影响
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let touchStartTime = 0;
let isSwipeGesture = false; // 标记是否为滑动手势

// 使用捕获阶段确保滑动检测优先执行
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartTime = Date.now();
    isSwipeGesture = false;
}, { passive: true, capture: true });

document.addEventListener('touchmove', (e) => {
    if (!touchStartX) return;
    
    const currentX = e.changedTouches[0].screenX;
    const currentY = e.changedTouches[0].screenY;
    const diffX = Math.abs(touchStartX - currentX);
    const diffY = Math.abs(touchStartY - currentY);
    
    // 如果水平滑动距离大于垂直滑动距离，且超过10px，认为是滑动手势
    if (diffX > 10 && diffX > diffY) {
        isSwipeGesture = true;
        
        // 在滑动过程中立即预加载下一张图片（提前准备，减少空白）
        if (diffX > 20 && currentIndex !== undefined) {
            const swipeDirection = touchStartX > currentX ? 'left' : 'right';
            const nextIndex = swipeDirection === 'left' ? currentIndex + 1 : currentIndex - 1;
            
            // 确保索引有效
            if (nextIndex >= 0 && nextIndex < productImages.length) {
                // 立即预加载，不等待
                preloadImage(nextIndex);
            }
        }
    }
}, { passive: true, capture: true });

document.addEventListener('touchend', (e) => {
    if (!touchStartX) return;
    
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    const touchDuration = Date.now() - touchStartTime;
    const diff = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    
    // 降低滑动阈值，提高响应速度（平板和移动端都使用更低的阈值）
    const swipeThreshold = 30; // 降低到30px，提高响应速度
    
    // 判断是否为有效的水平滑动
    // 1. 水平滑动距离大于阈值
    // 2. 水平滑动距离大于垂直滑动距离（避免误触）
    // 3. 滑动时间小于800ms（快速滑动）
    // 4. 或者已经标记为滑动手势
    if ((Math.abs(diff) > swipeThreshold && Math.abs(diff) > diffY && touchDuration < 800) || isSwipeGesture) {
        // 立即停止自动轮播
        stopAutoPlay();
        
        if (diff > 0) {
            // 向左滑动，下一张
            nextQuestion();
        } else {
            // 向右滑动，上一张
            previousQuestion();
        }
    }
    
    // 重置状态
    touchStartX = 0;
    touchEndX = 0;
    touchStartY = 0;
    touchEndY = 0;
    isSwipeGesture = false;
}, { passive: true, capture: true });

function handleSwipe() {
    // 此函数已废弃，保留以兼容性
    // 实际处理逻辑已移到 touchend 事件中
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

// 阻止移动端双击缩放（优化版：不影响滑动操作）
(function() {
    let lastTouchEnd = 0;
    let lastTouchStart = 0;
    let lastTouchStartX = 0;
    let lastTouchStartY = 0;
    let hasMoved = false; // 标记是否移动过
    
    const preventDoubleZoom = function(e) {
        const now = Date.now();
        const timeSinceLastTouch = now - lastTouchEnd;
        
        // 只有在短时间内（300ms内）且没有移动的情况下才阻止双击缩放
        // 如果用户滑动了，不阻止（允许滑动操作）
        if (timeSinceLastTouch <= 300 && !hasMoved) {
            e.preventDefault();
            return false;
        }
        lastTouchEnd = now;
        hasMoved = false; // 重置移动标记
    };
    
    // 如果是移动设备，阻止双击缩放
    if (isMobileDevice()) {
        // 使用捕获阶段，但优先级低于滑动检测
        document.addEventListener('touchstart', function(e) {
            const currentTime = Date.now();
            const tapLength = currentTime - lastTouchStart;
            const currentX = e.changedTouches[0].screenX;
            const currentY = e.changedTouches[0].screenY;
            
            // 检查是否移动（与上次触摸位置比较）
            if (lastTouchStartX !== 0 && lastTouchStartY !== 0) {
                const moveDistance = Math.sqrt(
                    Math.pow(currentX - lastTouchStartX, 2) + 
                    Math.pow(currentY - lastTouchStartY, 2)
                );
                if (moveDistance > 5) { // 移动超过5px认为是滑动
                    hasMoved = true;
                }
            }
            
            // 只有在短时间内（300ms内）且没有移动的情况下才阻止
            if (tapLength < 300 && tapLength > 0 && !hasMoved) {
                e.preventDefault();
                return false;
            }
            lastTouchStart = currentTime;
            lastTouchStartX = currentX;
            lastTouchStartY = currentY;
        }, { passive: false, capture: false }); // 不使用捕获阶段，让滑动检测优先
        
        document.addEventListener('touchend', preventDoubleZoom, { passive: false, capture: false });
    }
})();

// 检测刷新操作并设置标记（在页面加载时立即执行）
(function() {
    const refreshKey = 'page_refreshed';
    const softRefreshKey = 'soft_refresh';
    
    // 检查是否是刷新
    const isRefresh = (window.performance && window.performance.navigation && 
                      (window.performance.navigation.type === 1 || window.performance.navigation.type === 255)) ||
                     (window.performance && window.performance.getEntriesByType && 
                      window.performance.getEntriesByType('navigation')[0] && 
                      window.performance.getEntriesByType('navigation')[0].type === 'reload');
    
    if (isRefresh) {
        console.log('检测到页面刷新，设置刷新标记');
        sessionStorage.setItem(refreshKey, 'true');
        // 标记为软刷新（不是硬刷新）
        sessionStorage.setItem(softRefreshKey, 'true');
    } else {
        // 首次加载或硬刷新（没有刷新标记）
        console.log('首次加载或硬刷新');
        // 清除软刷新标记，这样isHardRefresh()会返回true
        sessionStorage.removeItem(softRefreshKey);
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
