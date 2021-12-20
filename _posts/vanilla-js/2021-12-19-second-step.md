---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - (3)"
folder: "vanilla-js"

categories:
    - vanilla-js
tags:
    - 인강 정리
    - 기본 개념
    - 자바스크립트와 HTML

author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

자바스크립트와 HTML의 상호작용  

## 자바스크립트와 HTML - document 객체  
기본적으로 자바스크립트에 HTML와 연결된 document라는 이름의 객체가 있다.  
다시 말해, 자바스크립트에서 HTML document에 접근할 수 있다는 것이다.  
= 동시에 자바스크립트에서 HTML 내용을 수정 및 추가할 수도 있음!  
ex)  

```js
document.title = "hi"
//HTML의 title이 hi로 수정됨
```

## HTML in 자바스크립트  
