<div align="center">

<a href="http://marsview.cc/"><img src="https://marsview.cdn.bcebos.com/mars-logo.png" width="150" alt="marsview logo"></a>

# Marsview Low Code Platform

Make building simpler and development more efficient

[Project documentation](http://docs.marsview.com.cn/) |
[Open source repository](https://github.com/JackySoft/marsview) |
[Communication group](https://imgcloud.cdn.bcebos.com/f35323e9a2625a85909cb6f02.png)

</div>

<div align="center">

![GitHub Repo stars](https://img.shields.io/github/stars/JackySoft/marsview)

![GitHub package.json version](https://img.shields.io/github/package-json/v/JackySoft/marsview)
![GitHub License](https://img.shields.io/github/license/JackySoft/marsview)
![version](https://img.shields.io/npm/v/amis)
![language](https://img.shields.io/github/languages/top/JackySoft/marsview)
![last](https://img.shields.io/github/last-commit/JackySoft/marsview.svg)

English | [中文](./README.zh-CN.md)

</div>

## Intro 🚀

Marsview is a low code visualization platform for middle and backend development. Developers can create projects, pages, and components on the platform, supporting event interaction, interface calling, data linkage, and logical orchestration. Developers can also quickly integrate them into their own business systems through the microApp front-end framework.

## Online use 🛸

- 🌍 [Marsview](https://www.marsview.com.cn/)

|                                                                        |                                                                        |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![Demo](https://imgcloud.cdn.bcebos.com/09d56ca14e47f7880d67bae37.png) | ![Demo](https://imgcloud.cdn.bcebos.com/09d56ca14e47f7880d67bae38.png) |
| ![Demo](https://imgcloud.cdn.bcebos.com/09d56ca14e47f7880d67bae39.png) | ![Demo](https://imgcloud.cdn.bcebos.com/09d56ca14e47f7880d67bae3a.png) |
| ![Demo](https://imgcloud.cdn.bcebos.com/09d56ca14e47f7880d67bae3b.png) | ![Demo](https://imgcloud.cdn.bcebos.com/09d56ca14e47f7880d67bae3c.png) |
| ![Demo](https://imgcloud.cdn.bcebos.com/09d56ca14e47f7880d67bae3d.png) | ![Demo](https://imgcloud.cdn.bcebos.com/09d56ca14e47f7880d67bae3e.png) |

## Platform Features 💥

- **project:**
  Project configuration (theme color, menu layout, system logo, breadcrumbs...), complete RBAC permission management.
- **page:** Page creation, page theme, page configuration, component drag and drop, style configuration, event flow configuration, logical orchestration, interface configuration.
  The page supports integration into traditional projects through microservices, whether you are Vue or React.
- **permission:** The project and page support developer and visitor permission configuration, and the project also supports RBAC control at the menu and button level.
- **Custom Components:** When the components provided by the platform cannot meet the requirements, business components can be customized and developed. The platform will compile them online and upload them to the cloud. At the same time, in the editor interface, custom components can be loaded by clicking on them.
- **interface:** Unified interface management, global interceptors, return structure modifications, etc. Support GET, POST, PUT, DELETE and other request methods, and support dynamic parameter passing through interfaces.
- **event flow:** High difficulty business logic orchestration can be completed through event flow, such as component linkage, component visibility and concealment, component disabling, custom logic processing, interface calling, route jumping, etc.
- **environment:** The platform supports three environments, STG, PRE, and PRD. The page can only be accessed on the user side after being published to the corresponding environment.
- **rollback：** After the platform is released, the page supports one click rollback.
- **Micro front-end integration:** If you are a traditional Vue project and want to use this platform, you can first build a page on the platform and publish it to the PRD environment, and finally integrate it through microservices.
- The backend provides Node versions, with MySQL as the database.

## Local development 👨‍💻

### Frontend

```bash
git clone https://github.com/JackySoft/marsview.git
```

Project Description

| directory          | description                                 |
| ------------------ | ------------------------------------------- |
| packges            | Front end project, including 4 sub projects |
| packges/admin      | Project Access Terminal                     |
| packges/editor     | Editor end                                  |
| packages/materials | Component materials, for admin use only     |
| packages/docs      | Low code usage documentation                |

### Deploy Documentation

[Documentation](https://docs.marsview.com.cn/home.html)

### Quick start

Running requires a node environment, it is recommended to have a version of 'node: 18' or higher. Use `pnpm` as a dependency management tool. If it is not installed, please execute the installation command `npm install - g pnpm` first.

1. Start the front-end

```bash

# Install dependencies (if the installation dependency time is too long, please configure the image source first)
pnpm i
# Launch Editor
pnpm start:editor
```

> Note: By default, online interfaces are used. If private deployment is required, please refer to the private deployment documentation.

### Synchronization Code

The project is in a high-speed development stage with fast version updates. It is recommended that developers set up upstream remote branches after the fork and clone projects to pull the latest code and synchronize it locally at any time.

```bash
# add upstream

git remote add upstream https://github.com/JackySoft/marsview

# Capture the source repository and modify the main branch

git fetch upstream main

# Switch Branch

git checkout main

# Merge remote branches

git merge upstream/main
```

## Team Recruitment

-Passionate about programming and open source, with a strong interest in low code.
-Continuous passion and long termism.
-After meeting the requirements, they will enter the internal team open source group and share profits in the future.

## Activities 🆕

- 2024-10-30: Marsview open-source backend service.
- 2024-09-27: Online email registration service.
- 2024-08-30: MarsView Published in [Ruan Yifeng Weekly](https://www.ruanyifeng.com/blog/2024/08/weekly-issue-315.html)
- 2024-08-27: MarsAI v1.0 is launched, and auxiliary code generation is implemented in custom writing.
- 2024-08-17: Project [Online Document](http://docs.marsview.com.cn/) Publish.
- 2024-08-13: Open source article ranks first on the hot list of the Gold Mining Forum.
- 2024-08-10: Project open source
  - Announce project open source, publish open source article: [My low code platform Marsview is finally open source](https://juejin.cn/post/7401009128204894244)
- 2024-07-16: The project is previewed for the first time on the Gold Mining Forum
  - Release trailer article: [I spent 8 months creating a high-quality zero code platform called Mars](https://juejin.cn/post/7392071348480835595)

## Update log 📅

View [Update Log](https://github.com/JackySoft/marsview/blob/master/CHANGELOG.md) Get the latest updates.

## Project communication 🏘️

If you encounter any technical or commercial authorization issues during use, please feel free to contact me via WeChat:

<img src="https://imgcloud.cdn.bcebos.com/f35323e9a2625a85909cb6f02.png"  width="200">

## Participate in donation ✨

[Please treat me to a cup of coffee ☕️](https://afdian.com/a/marsview)

Thank you to the following brothers for their donation:

| name            | profile picture                                                    |
| --------------- | ------------------------------------------------------------------ |
| 钢铁侠          | <img src="http://docs.marsview.com.cn/sponsor/10.png"  width="50"> |
| 物联网方案-肖工 | <img src="http://docs.marsview.com.cn/sponsor/3.png"  width="50">  |

## 🤝 Participate and contribute

We warmly welcome contributions in various forms. If you are interested in contributing code, you can check out our GitHub [Issues](https://github.com/JackySoft/marsview/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc),Show us your creativity and creativity.

How do you want to become a developer? Welcome to submit `PR`. Please refer to the `PR` specification for submission: [Pull Rquest](.github/PULL_REQUEST_TEMPLATE.md)

<a href="https://github.com/JackySoft/marsview/graphs/contributors" target="_blank">
<img src="https://contrib.rocks/image?repo=JackySoft/marsview">
</a>

## Star History 🌟

If you find this project helpful to you, please consider [GitHub](https://github.com/JackySoft/marsview) Give it one ⭐️ !
<a href="https://github.com/JackySoft/marsview/stargazers" target="_blank" style="display: block" align="center">
<picture>

<source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=JackySoft/marsview&type=Date&theme=dark" />
<source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=JackySoft/marsview&type=Date" />
<img alt="Star History Chart" src="https://api.star-history.com/svg?repos=JackySoft/marsview&type=Date" />
</picture>
</a>

## licence 📄

This project is authorized under the MIT License - for more information, please refer to [LICENSE](https://github.com/JackySoft/marsview/blob/main/LICENSE) the document.
