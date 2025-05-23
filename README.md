# 🥐 可颂

## 1、搭建
`npm info vite versions` 列出所有版本

## 2、查看结构
删除目前无用的目录和文件（css 等），使用 `VS Code` 插件 `npm Intellisense` 锁定库版本

使用 `npm config set save-prefix=""`, `pnpm config set save-prefix=""` 配置新增版本也不会带尖尖 `^`

调整、删除部分代码， **永远不要使用默认导出**

## 3、引入 `eslint`

[规则](https://github.com/antfu/eslint-config)

## 4、分开引入 tailwindcss@3 和 shadcn@2.3.0

> 暂时不要用最新版！

`pnpm dlx shadcn@2.3.0 add button`

## 查找监听该端口的进程
`sudo netstat -tulnp | grep <端口号>`

输出示例：
`tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      1234/python`
这里 1234 是进程 ID（PID）。

## 终止该进程
sudo kill -9 <PID>

# 参考
## 1. 原型图： https://excalidraw.com/

## 2. Loader

[CSS 加载器](https://css-loaders.com/maze/)

[CSS 旋转加载器专题](https://css-tricks.com/single-element-loaders-the-spinner/)
