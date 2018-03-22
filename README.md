# vue-douban

> A Vue.js project

## 技术栈

vue + vuex + vue-router + axios + webpack + ES6

## 文章地址

#### [基于vue搭建一个简易版豆瓣](https://juejin.im/post/5aa686f86fb9a028c42ddadb)

## 项目运行

#### 源码地址： [https://github.com/nh0007/vue-douban.git](https://github.com/nh0007/vue-douban.git)

#### 如何运行
运行前请先确认电脑上已经安装好node环境

 - 克隆项目到本地

```shell
git clone https://github.com/nh0007/vue-douban.git
```

 - 进入项目根目录，在命令行运行语句安装依赖：

```shell
npm install
```

 - 运行项目

```shell
npm run dev
```

 - 等待运行完毕后，在浏览器输入命令行提示地址，可看到项目效果。

## 代码结构
```shell
├── assets  //图片资源
├── components  // 项目组件
│   ├── book  //图书组件
│       ├── BookTag.vue
│       ├── BookTagContent.vue
│       ├── BookTagMoreContent.vue
│       └── BookTypeContent.vue
│   ├── city  //同城活动组件
│       ├── CityActivityContent.vue
│       ├── CityActivityContentItem.vue
│       └── CityTag.vue
│   ├── common  //公用组件
│       ├── BaseHeader.vue
│       ├── BaseModal.vue
│       └── BaseSlide.vue
│   ├── movie  //电影组件
│       ├── MovieTag.vue
│       ├── MovieTagContent.vue
│       └── MovieTimeTypeContent.vue
│   ├── music  //音乐组件
│       └── MusicTagContent.vue
├── css  // 公用的CSS样式
│   └── style.css
├── router  // 前端路由配置
│   └── index.js
├── store  // vuex数据管理
│   ├── module  // 子模块数据
│       ├── book.js
│       ├── city.js
│       ├── movie.js
│       └── music.js
│   ├── index.js
│   └── mutation-types.js
├── util  // 公用的js函数
│   └── util.js
├── App.vue // 根组件
└── main.js  // 入口文件
```

## 项目截图
读书页：
![bookTagContent](https://github.com/nh0007/vue-douban/raw/master/screenshot/bookTagContent.png)

![bookTagMoreContent](https://github.com/nh0007/vue-douban/raw/master/screenshot/bookTagMoreContent.png)

![bookTypeContent](https://github.com/nh0007/vue-douban/raw/master/screenshot/bookTypeContent.png)

电影页：
![movieTagContent](https://github.com/nh0007/vue-douban/raw/master/screenshot/movieTagContent.png)

![movieTypeContent](https://github.com/nh0007/vue-douban/raw/master/screenshot/movieTypeContent.png)

音乐页：
![musicContent](https://github.com/nh0007/vue-douban/raw/master/screenshot/musicContent.png)

同城活动页：
![cityContent](https://github.com/nh0007/vue-douban/raw/master/screenshot/cityContent.png)

搜索页：
![search](https://github.com/nh0007/vue-douban/raw/master/screenshot/search.png)

## 结语
由于工作中使用的框架并不是vue,对vue的了解也并不深入，如果项目中有出现啥问题或者更加好的实现，欢迎issue。另外，欢迎star哦。
