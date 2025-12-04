// 产品图片数据 - 使用本地图片
// 支持 WebP 格式，自动回退到 JPG
// 使用绝对路径确保在 Vercel 上正确加载
const productImages = [
    {
        id: 1,
        image: '/Picture/1.webp', // WebP 格式，自动回退到 JPG
        fallback: '/Picture/1.jpg',
        name: '玩偶'
    },
    {
        id: 2,
        image: '/Picture/2.webp',
        fallback: '/Picture/2.jpg',
        name: '蓝色单肩包'
    },
    {
        id: 3,
        image: '/Picture/3.webp',
        fallback: '/Picture/3.jpg',
        name: '白色单肩包'
    },
    {
        id: 4,
        image: '/Picture/4.webp',
        fallback: '/Picture/4.jpg',
        name: '镜子'
    },
    {
        id: 5,
        image: '/Picture/5.webp',
        fallback: '/Picture/5.jpg',
        name: '石膏香片'
    },
    {
        id: 6,
        image: '/Picture/6.webp',
        fallback: '/Picture/6.jpg',
        name: '充电宝'
    }
];

// 检测浏览器是否支持 WebP
function supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// 获取图片 URL（支持 WebP 回退）
function getImageUrl(item) {
    // 如果浏览器支持 WebP，使用 WebP，否则使用 JPG
    if (supportsWebP() && item.image) {
        return item.image;
    }
    return item.fallback || item.image.replace('.webp', '.jpg');
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

// 初始化问卷
async function initQuestionnaire() {
    const carouselWrapper = document.getElementById('carouselWrapper');
    
    // 先尝试从服务器加载爱心数量（如果失败，使用默认值）
    console.log('开始从服务器加载爱心数量...');
    await loadHeartCountsFromServer();
    
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
    
    // 显示第一个产品
    showProduct(0);
    updateProgress();
    updateNavButtons();
    
    // 定期从服务器同步爱心数量（每10秒）
    setInterval(async () => {
        await loadHeartCountsFromServer();
    }, 10000);
}

// 创建产品卡片
function createProductCard(item, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.index = index;
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image-container';
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
    img.loading = 'lazy'; // 浏览器原生懒加载
    
    // 获取图片 URL（支持 WebP 回退）
    const imageUrl = getImageUrl(item);
    const fallbackUrl = item.fallback || imageUrl.replace('.webp', '.jpg');
    
    // 设置回退图片
    img.onerror = function() {
        // 如果 WebP 加载失败，尝试加载 JPG
        if (this.src !== fallbackUrl && this.src.includes('.webp')) {
            console.log(`WebP 加载失败，回退到 JPG: ${item.name}`);
            this.src = fallbackUrl;
        }
    };
    
    // 使用 data-src 存储图片路径，实现懒加载
    // 只对第一张图片立即加载，其他图片延迟加载
    if (index === 0) {
        img.src = imageUrl;
        img.dataset.loaded = 'false';
    } else {
        img.dataset.src = imageUrl;
        img.dataset.fallback = fallbackUrl;
        img.dataset.loaded = 'false';
        loadingPlaceholder.style.display = 'none'; // 未加载的图片先隐藏占位符
    }
    
    // 预加载前两张图片（提高初始加载速度）
    if (index === 0) {
        // 第一张立即加载，同时预加载第二张
        setTimeout(() => {
            if (productImages.length > 1) {
                preloadImage(1);
            }
        }, 500);
    } else if (index === 1) {
        // 第二张也预加载
        setTimeout(() => {
            preloadImage(1);
        }, 1000);
    }
    
    // 图片加载完成事件（统一处理所有图片）
    img.addEventListener('load', function() {
        this.dataset.loaded = 'true';
        const placeholder = this.parentElement.querySelector('.image-loading');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        // 淡入动画
        this.style.opacity = '0';
        requestAnimationFrame(() => {
            this.style.transition = 'opacity 0.3s ease';
            this.style.opacity = '1';
        });
    });
    
    // 图片加载错误事件
    img.addEventListener('error', function() {
        const placeholder = this.parentElement.querySelector('.image-loading');
        if (placeholder) {
            placeholder.innerHTML = '<div class="image-error">图片加载失败<br><button onclick="location.reload()" style="margin-top:10px;padding:8px 16px;background:#667eea;color:white;border:none;border-radius:4px;cursor:pointer;">重试</button></div>';
        }
    });
    
    // 如果图片已经缓存（complete），立即触发加载完成
    if (img.complete && img.naturalHeight !== 0) {
        img.dataset.loaded = 'true';
        loadingPlaceholder.style.display = 'none';
        img.style.opacity = '1';
    }
    
    img.onerror = function() {
        // 如果图片加载失败，显示占位符
        loadingPlaceholder.innerHTML = '<div class="image-placeholder">图片加载失败</div>';
        this.style.display = 'none';
    };
    
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

// 选择产品
function selectProduct(productIndex) {
    stopAutoPlay(); // 用户选择产品时停止自动轮播
    
    answers[productIndex] = true;
    
    // 更新UI显示选中状态
    const card = document.querySelector(`[data-index="${productIndex}"]`);
    const imageContainer = card.querySelector('.product-image-container');
    
    // 始终设置为选中状态
    imageContainer.classList.add('selected');
    
    // 触发明显的心跳动画
    const heartIcon = imageContainer.querySelector('.heart-icon');
    triggerHeartbeat(heartIcon);
    
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
    
    updateNavButtons();
}

// 图片加载重试机制
function loadImageWithRetry(img, imageUrl, fallbackUrl, maxRetries = 3, retryCount = 0) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            if (retryCount < maxRetries) {
                console.log(`图片加载超时，重试 ${retryCount + 1}/${maxRetries}: ${imageUrl}`);
                loadImageWithRetry(img, imageUrl, fallbackUrl, maxRetries, retryCount + 1)
                    .then(resolve)
                    .catch(reject);
            } else {
                reject(new Error('图片加载失败：超过最大重试次数'));
            }
        }, 10000); // 10秒超时

        const tempImg = new Image();
        tempImg.onload = function() {
            clearTimeout(timeout);
            img.src = imageUrl;
            img.dataset.loaded = 'true';
            resolve();
        };
        tempImg.onerror = function() {
            clearTimeout(timeout);
            // 如果是 WebP 且还有回退图片，尝试回退
            if (imageUrl.includes('.webp') && fallbackUrl && retryCount === 0) {
                console.log('WebP 加载失败，尝试回退到 JPG');
                loadImageWithRetry(img, fallbackUrl, null, maxRetries, retryCount + 1)
                    .then(resolve)
                    .catch(reject);
            } else if (retryCount < maxRetries) {
                // 重试
                setTimeout(() => {
                    loadImageWithRetry(img, imageUrl, fallbackUrl, maxRetries, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                }, 1000 * (retryCount + 1)); // 指数退避
            } else {
                reject(new Error('图片加载失败'));
            }
        };
        tempImg.src = imageUrl;
    });
}

// 预加载图片（静默加载，不显示占位符）
function preloadImage(index) {
    if (index < 0 || index >= productImages.length) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    if (!card) return;
    
    const img = card.querySelector('.product-image');
    if (!img || img.dataset.loaded === 'true' || img.dataset.preloading === 'true') return;
    
    img.dataset.preloading = 'true';
    const item = productImages[index];
    const imageUrl = getImageUrl(item);
    const fallbackUrl = item.fallback || imageUrl.replace('.webp', '.jpg');
    
    const preloadImg = new Image();
    preloadImg.onload = function() {
        img.dataset.preloaded = 'true';
        img.dataset.preloading = 'false';
        console.log(`✅ 图片 ${index + 1} 预加载完成`);
    };
    preloadImg.onerror = function() {
        // 如果 WebP 失败，尝试 JPG
        if (imageUrl.includes('.webp') && fallbackUrl) {
            const fallbackImg = new Image();
            fallbackImg.onload = function() {
                img.dataset.preloaded = 'true';
                img.dataset.preloadFallback = fallbackUrl;
                img.dataset.preloading = 'false';
                console.log(`✅ 图片 ${index + 1} 预加载完成（使用回退格式）`);
            };
            fallbackImg.onerror = function() {
                img.dataset.preloading = 'false';
                console.warn(`⚠️ 图片 ${index + 1} 预加载失败`);
            };
            fallbackImg.src = fallbackUrl;
        } else {
            img.dataset.preloading = 'false';
            console.warn(`⚠️ 图片 ${index + 1} 预加载失败`);
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
    
    // 如果图片已经加载，直接返回
    if (img.dataset.loaded === 'true') return;
    
    // 显示加载占位符
    const loadingPlaceholder = card.querySelector('.image-loading');
    if (loadingPlaceholder) {
        loadingPlaceholder.style.display = 'flex';
    }
    
    const item = productImages[index];
    const imageUrl = getImageUrl(item);
    const fallbackUrl = item.fallback || imageUrl.replace('.webp', '.jpg');
    
    // 如果已经预加载，直接使用
    if (img.dataset.preloaded === 'true') {
        img.src = img.dataset.preloadFallback || imageUrl;
        img.dataset.loaded = 'true';
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
        return;
    }
    
    // 使用重试机制加载图片
    try {
        await loadImageWithRetry(img, imageUrl, fallbackUrl);
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
    } catch (error) {
        console.error(`❌ 图片 ${index + 1} 加载失败:`, error);
        if (loadingPlaceholder) {
            loadingPlaceholder.innerHTML = '<div class="image-error">加载失败<br><button onclick="location.reload()">重试</button></div>';
        }
    }
    
    // 预加载相邻的图片（提前加载下一张和上一张）
    const nextIndex = index + 1;
    const prevIndex = index - 1;
    
    // 预加载下一张
    if (nextIndex < productImages.length) {
        preloadImage(nextIndex);
    }
    
    // 预加载上一张（如果还没加载）
    if (prevIndex >= 0) {
        preloadImage(prevIndex);
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
    const translateX = -index * 100;
    carouselWrapper.style.transform = `translateX(${translateX}%)`;
    
    // 加载当前图片（懒加载）
    loadImage(index);
    
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

