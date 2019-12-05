# Tokyo: GatsbyJS Ghost Theme

[![Netlify Status](https://api.netlify.com/api/v1/badges/efe12261-c4b4-498c-b74a-ba438133c252/deploy-status)](https://app.netlify.com/sites/sleepy-shirley-d61a1e/deploys)
![Ghost](https://img.shields.io/badge/Ghost-^v3.0.0-lightgrey.svg?longCache=true&style=flat-square&logo=ghost&logoColor=white&colorB=656c82&colorA=4c566a)
![Node](https://img.shields.io/badge/NodeJS-v10.15.0-green.svg?longCache=true&style=flat-square&logo=node.js&logoColor=white&colorB=a3be8c&colorA=4c566a)
![Gatsby](https://img.shields.io/badge/Gatsby-v^2.8-yellow.svg?longCache=true&style=flat-square&logo=Gatsby&logoColor=white&colorA=4c566a&colorB=b48ead)
![Less](https://img.shields.io/badge/Less-v^3.10.3-blue.svg?longCache=true&logo=javascript&longCache=true&style=flat-square&logoColor=white&colorB=5e81ac&colorA=4c566a)
![GitHub Last Commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square&colorA=4c566a&colorB=a3be8c&logo=GitHub)
[![GitHub issues](https://img.shields.io/github/issues/toddbirchard/gatsby-ghost-tokyo.svg?style=flat-square&colorB=ebcb8b&colorA=4c566a&logo=GitHub)](https://github.com/toddbirchard/gatsby-ghost-tokyo/issues)
[![GitHub stars](https://img.shields.io/github/stars/toddbirchard/gatsby-ghost-tokyo.svg?style=flat-square&colorB=ebcb8b&colorA=4c566a&logo=GitHub)](https://github.com/toddbirchard/gatsby-ghost-tokyo/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/toddbirchard/gatsby-ghost-tokyo.svg?style=flat-square&colorA=4c566a&colorB=ebcb8b&logo=GitHub)](https://github.com/toddbirchard/gatsby-ghost-tokyo/network)

Ghost theme suitable for creators focused on quality content. Lightweight yet tasteful collection of features intended to elevate authors. Live preview can be seen here: https://toddbirchard.com

![Tokyo Theme](/static/images/tokyo.jpg)

## About

_Tokyo_ is a minimalist Ghost theme emphasizing readability, load times, and customization. Stays true to a philosophy of simplicity while expanding on Ghost features to elevate authors.

### Features
- Responsive layout
- Featured hero pages
- Related articles widget
- Twitter widget
- Tag cloud widget
- Author widget

## Getting Started

### Installation

The easiest way to install is by using [gatsby-cli](https://www.npmjs.com/package/gatsby-cli):

```bash
# With Gatsby CLI
$ gatsby new gatsby-starter-ghost https://github.com/toddbirchard/gatsby-ghost-tokyo.git
```

Otherwise the repo can be initiated as any other Gatsby app:

```bash
# From Source
$ git clone https://github.com/toddbirchard/gatsby-ghost-tokyo.git
$ cd gatsby-starter-ghost
$ npm install
$ gatsby develop
```

This theme will source from toddbirchard.com by default; you'll need to edit the `.ghost.json` config file with your own credentials to source content. Create an "integration" in your Ghost CMS, and change the `apiUrl` and `contentApiKey` values of `.ghost.json` to match those generated by your integration.

**Templates:**
- `index.js` - Home page
- `post.js` - Individual posts
- `page.js` - Standalone pages
- `tag.js` - Tag archives
- `author.js` - Author archives

**Stack**
- GatsbyJS
- Ghost CMS
- React
- GraphQL
- LESS

## Roadmap

This theme is still in active development.

### Upcoming changes
- Twitter source widget
- Github profile widget
- LESS refactor
- Additional widget options
- Speed optimizations
- Documentation

-----

This theme and all publically-visible repositories are free of charge. If you find this project to be helpful, a [small donation](https://www.buymeacoffee.com/hackersslackers) would be greatly appreciated to keep us in business. All proceeds go towards coffee, and all coffee goes towards improving these projects.
