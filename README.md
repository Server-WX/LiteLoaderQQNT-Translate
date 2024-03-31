# LLTranslator

为 QQ 实现一个简单的消息翻译功能

## 安装

请确保你已经安装了 [LiteLoaderQQNT](https://github.com/LiteLoaderQQNT/LiteLoaderQQNT) 并且能正常运作。

1. 前往本仓库 [Release](https://github.com/MisaLiu/LiteLoaderQQNT-Pangu/releases) 下载最新版的插件压缩包
2. 将从本仓库 Release 中下载的压缩包解压至 LiteLoaderQQNT 的插件目录中
3. 启动或重启 QQNT

## 使用

本插件无任何配置项，插件启用时便已在运作。如需禁用插件只需要在 LiteLoaderQQNT 的设置页内禁用即可。

在发送的消息前加上前缀 `>` + `要翻译的目标语言（比如英语EN、日语JA等）` 即可将消息翻译为目标语言。

## 注意事项

由于本插件直接拦截并修改 QQNT 的发信通道，因此 **所有后于本插件初始化的插件自行发出的消息也受本插件影响**。如果您安装了太多会在后台自动发信的插件，请自行斟酌是否该使用本插件。

## 鸣谢

* [LiteLoaderQQNT-Pangu](https://github.com/MisaLiu/LiteLoaderQQNT-Pangu)
* [LiteLoaderQQNT](https://github.com/LiteLoaderQQNT/LiteLoaderQQNT)
* [LLOneBot](https://github.com/LLOneBot/LLOneBot)
* [pangu.js](https://github.com/vinta/pangu.js)

## License

```
    LLTranslator - A simple message translator for QQNT
    Copyright (C) 2024 liaozhangsheng

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```