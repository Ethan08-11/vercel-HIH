# 图片轮播式产品调查问卷

一个纯图片的产品轮播式调查问卷系统，消费者通过点击图片来选择喜欢的产品。

## 功能特点

- 🎨 **纯图片界面** - 无文字干扰，专注于产品图片展示
- 🖼️ **产品轮播** - 支持左右切换浏览产品
- 👆 **点击选择** - 点击图片即可选择喜欢的产品
- ✅ **选中标记** - 选中的产品会显示明显的标记
- 📊 **进度显示** - 实时显示浏览进度
- ⌨️ **键盘支持** - 支持方向键导航
- 📱 **响应式设计** - 适配各种屏幕尺寸
- ✨ **流畅动画** - 平滑的过渡效果和交互反馈

## 使用方法

1. 直接在浏览器中打开 `index.html` 文件
2. 浏览产品图片，点击喜欢的产品进行选择
3. 使用左右箭头按钮或键盘方向键切换产品
4. 选择完所有产品后，点击提交按钮查看结果

## 自定义产品

编辑 `script.js` 文件中的 `productImages` 数组来修改产品内容：

```javascript
const productImages = [
    {
        id: 1,
        image: 'https://your-image-url.com/product1.jpg',  // 产品图片URL
        name: '产品1'  // 产品名称（仅用于标识）
    },
    {
        id: 2,
        image: 'https://your-image-url.com/product2.jpg',
        name: '产品2'
    }
];
```

## 文件结构

- `index.html` - 主HTML文件
- `style.css` - 样式文件
- `script.js` - JavaScript逻辑文件
- `README.md` - 说明文档

## 浏览器支持

支持所有现代浏览器（Chrome、Firefox、Safari、Edge等）

