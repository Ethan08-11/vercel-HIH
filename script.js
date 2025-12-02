// 产品图片数据 - 使用本地图片
// 使用绝对路径确保在 Vercel 上正确加载
const productImages = [
    {
        id: 1,
        image: '/Picture/1.jpg',
        name: '玩偶'
    },
    {
        id: 2,
        image: '/Picture/2.jpg',
        name: '蓝色单肩包'
    },
    {
        id: 3,
        image: '/Picture/3.jpg',
        name: '白色单肩包'
    },
    {
        id: 4,
        image: '/Picture/4.jpg',
        name: '镜子'
    },
    {
        id: 5,
        image: '/Picture/5.jpg',
        name: '石膏香片'
    },
    {
        id: 6,
        image: '/Picture/6.jpg',
        name: '充电宝'
    }
];

// 存储用户答案
let answers = {};
let currentIndex = 0;
let autoPlayTimer = null; // 自动轮播定时器
const AUTO_PLAY_INTERVAL = 5000; // 自动轮播间隔（5秒）

// 初始化问卷
function initQuestionnaire() {
    const carouselWrapper = document.getElementById('carouselWrapper');
    
    // 创建所有产品卡片
    productImages.forEach((item, index) => {
        const card = createProductCard(item, index);
        carouselWrapper.appendChild(card);
    });
    
    // 显示第一个产品
    showProduct(0);
    updateProgress();
    updateNavButtons();
    checkAllAnswered(); // 初始化时检查提交按钮状态
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
    
    // 使用 data-src 存储图片路径，实现懒加载
    // 只对第一张图片立即加载
    if (index === 0) {
        img.src = item.image;
        img.dataset.loaded = 'false';
    } else {
        img.dataset.src = item.image;
        img.dataset.loaded = 'false';
        loadingPlaceholder.style.display = 'none'; // 未加载的图片先隐藏占位符
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
        setTimeout(() => {
            this.style.opacity = '1';
        }, 10);
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
    
    // 选中标记
    const selectedMark = document.createElement('div');
    selectedMark.className = 'selected-mark';
    selectedMark.innerHTML = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>';
    
    imageContainer.appendChild(loadingPlaceholder);
    imageContainer.appendChild(img);
    imageContainer.appendChild(selectedMark);
    card.appendChild(imageContainer);
    
    // 添加文字说明
    const textContainer = document.createElement('div');
    textContainer.className = 'product-text-container';
    
    // 文字内容区域
    const textContent = document.createElement('div');
    textContent.className = 'product-text-content';
    
    const chineseText = document.createElement('div');
    chineseText.className = 'product-text-chinese';
    chineseText.textContent = '这是我们的文创样板之一哦！想知道哪种款式、设计最合你的心意？';
    
    const englishText = document.createElement('div');
    englishText.className = 'product-text-english';
    englishText.textContent = 'This is one of our cultural and creative samples! We\'d like to know which style and design appeals to you most?';
    
    // 添加提示文字
    const hintChineseText = document.createElement('div');
    hintChineseText.className = 'product-text-hint-chinese';
    hintChineseText.textContent = '请点击图片选择你喜欢的产品并提交。';
    
    const hintEnglishText = document.createElement('div');
    hintEnglishText.className = 'product-text-hint-english';
    hintEnglishText.textContent = 'Please click on the image to select your favorite product and submit.';
    
    textContent.appendChild(chineseText);
    textContent.appendChild(englishText);
    textContent.appendChild(hintChineseText);
    textContent.appendChild(hintEnglishText);
    
    textContainer.appendChild(textContent);
    
    // 如果是最后一张图片，添加提交按钮
    if (index === productImages.length - 1) {
        const submitBtnContainer = document.createElement('div');
        submitBtnContainer.className = 'product-submit-container';
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'product-submit-btn';
        submitBtn.id = 'productSubmitBtn';
        submitBtn.onclick = submitQuestionnaire;
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>提交</span>
        `;
        
        submitBtnContainer.appendChild(submitBtn);
        textContainer.appendChild(submitBtnContainer);
    }
    
    card.appendChild(textContainer);
    
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

// 选择产品
function selectProduct(productIndex) {
    stopAutoPlay(); // 用户选择产品时停止自动轮播
    
    answers[productIndex] = true;
    
    // 更新UI显示选中状态
    const card = document.querySelector(`[data-index="${productIndex}"]`);
    const imageContainer = card.querySelector('.product-image-container');
    
    if (imageContainer.classList.contains('selected')) {
        // 取消选择
        imageContainer.classList.remove('selected');
        delete answers[productIndex];
    } else {
        // 选中
        imageContainer.classList.add('selected');
        
        // 自动跳转到下一个产品（延迟一下让用户看到选中效果）
        setTimeout(() => {
            if (currentIndex === productIndex && currentIndex < productImages.length - 1) {
                nextProduct();
            }
        }, 500);
    }
    
    updateNavButtons();
    checkAllAnswered();
}

// 加载图片（懒加载）
function loadImage(index) {
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
    
    // 如果图片还没有 src，从 data-src 加载
    if (img.dataset.src && !img.src) {
        // 如果已经预加载，直接使用
        if (img.dataset.preloaded === 'true') {
            img.src = img.dataset.src;
        } else {
            img.src = img.dataset.src;
        }
    }
    
    // 预加载相邻的图片（提前一张）
    const nextIndex = index + 1;
    if (nextIndex < productImages.length) {
        const nextCard = document.querySelector(`[data-index="${nextIndex}"]`);
        if (nextCard) {
            const nextImg = nextCard.querySelector('.product-image');
            if (nextImg && nextImg.dataset.src && nextImg.dataset.loaded !== 'true') {
                // 预加载下一张图片（静默加载，不显示占位符）
                const preloadImg = new Image();
                preloadImg.src = nextImg.dataset.src;
                preloadImg.onload = function() {
                    // 预加载完成，但不立即设置到img元素，等用户切换时再设置
                    nextImg.dataset.preloaded = 'true';
                };
            }
        }
    }
}

// 显示指定产品
function showProduct(index) {
    currentIndex = index;
    const carouselWrapper = document.getElementById('carouselWrapper');
    const translateX = -index * 100;
    carouselWrapper.style.transform = `translateX(${translateX}%)`;
    
    // 加载当前图片（懒加载）
    loadImage(index);
    
    updateProgress();
    updateNavButtons();
    
    // 检查是否至少选择了一个产品（在最后一张图片时启用提交按钮）
    checkAllAnswered();
    
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

// 检查是否至少选择了一个产品（在最后一张图片时）
function checkAllAnswered() {
    const hasSelected = Object.keys(answers).length > 0;
    const submitBtn = document.getElementById('productSubmitBtn');
    
    // 只有在最后一张图片时才显示和启用提交按钮
    if (submitBtn && currentIndex === productImages.length - 1) {
        if (hasSelected) {
            submitBtn.disabled = false;
            submitBtn.classList.add('enabled');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('enabled');
        }
    }
}

// 提交问卷
async function submitQuestionnaire() {
    // 检查是否至少选择了一个产品
    const hasSelected = Object.keys(answers).length > 0;
    if (!hasSelected) {
        alert('请至少选择一个产品后再提交！');
        return;
    }

    // 构建提交数据
    const selectedProducts = [];
    productImages.forEach((item, index) => {
        if (answers[index]) {
            selectedProducts.push({
                id: item.id,
                name: item.name,
                image: item.image
            });
        }
    });

    const submitData = {
        answers: answers,
        selectedProducts: selectedProducts,
        timestamp: new Date().toISOString()
    };

    // 显示加载状态
    const submitBtn = document.getElementById('productSubmitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>提交中...</span>';
    }

    try {
        // 获取API基础URL（支持环境变量）
        const API_BASE_URL = window.API_BASE_URL || (window.location.origin);
        
        // 发送到后端服务器
        const response = await fetch(`${API_BASE_URL}/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData)
        });

        const result = await response.json();

        if (result.success) {
            // 构建结果 - 显示所有选中的产品图片
            let resultHTML = '<div class="result-grid">';
            
            selectedProducts.forEach((item) => {
                resultHTML += `
                    <div class="result-product">
                        <img src="${item.image}" alt="${item.name}" class="result-image">
                        <div class="result-product-name">${item.name}</div>
                    </div>
                `;
            });
            
            resultHTML += '</div>';
            resultHTML += `<div style="text-align: center; margin-top: 20px; color: #667eea; font-weight: 600;">${result.message}</div>`;
            
            // 显示结果弹窗
            document.getElementById('resultContent').innerHTML = resultHTML;
            document.getElementById('resultModal').classList.add('show');
            
            console.log('提交成功:', result);
            
            // 恢复提交按钮状态（在重置前先恢复，避免闪烁）
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>提交</span>
                `;
            }
            
            // 3秒后自动关闭弹窗并刷新页面状态
            setTimeout(() => {
                closeModal();
                resetQuestionnaire();
            }, 3000);
        } else {
            throw new Error(result.message || '提交失败');
        }
    } catch (error) {
        console.error('提交错误:', error);
        alert('提交失败：' + error.message + '\n请确保后端服务器正在运行。');
        
        // 恢复按钮状态
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>提交</span>
            `;
        }
    }
}

// 关闭弹窗
function closeModal() {
    document.getElementById('resultModal').classList.remove('show');
}

// 刷新页面状态
function resetQuestionnaire() {
    // 停止自动轮播
    stopAutoPlay();
    
    // 清空所有答案
    answers = {};
    
    // 重置所有产品的选中状态
    productImages.forEach((item, index) => {
        const card = document.querySelector(`[data-index="${index}"]`);
        if (card) {
            const imageContainer = card.querySelector('.product-image-container');
            if (imageContainer) {
                imageContainer.classList.remove('selected');
            }
        }
    });
    
    // 重置进度条
    document.getElementById('progressBar').style.width = '0%';
    
    // 回到第一张图片
    showProduct(0);
    
    // 重置提交按钮状态
    const submitBtn = document.getElementById('productSubmitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.remove('enabled');
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>提交</span>
        `;
    }
    
    console.log('页面状态已重置');
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

