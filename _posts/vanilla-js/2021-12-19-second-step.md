---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - (3)"
folder: "vanilla-js"

categories:
    - vanilla-js
tags:
    - 인강 정리
    - 기본 개념
    - 자바 스크립트와 HTML

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

## 자바스크립트에서 HTML 요소 불러오기  
자바스크립트에서 더 구체적으로 한가지 혹은 여러개의 HTML 요소들을 선택해 불러올 수 있다.  

### id 선택자  
- `document.getElementById("##")`
  - HTML에서 "##" 아이디를 가진 요소를 불러온다.

```html
<h1 id="title">Grab me!</h2>

<script>

  let title = document.getElementById("title");
  //html에서 아이디가 title인 요소를 변수 title에 저장

  title.innerText = "Got you!"
  //h2 태그 텍스트 "Geab me!"를 "Got you!"로 변경

</script>
```

### class 선택자  
- `document.getElementByClassName("..")`
  - HTML에서 ".." 클래스를 가진 요소를 불러온다.

```html
<h1 class="hello">Grab me!</h2>

<script>

  let helloClass = document.getElementByClassName("hello");
  //html에서 클래스가 hello인 요소를 변수 helloClass에 저장

  helloClass.innerText = "Got you!"
  //h2 태그 텍스트 "Geab me!"를 "Got you!"로 변경

</script>
```

### css 선택자⭐  
- ⭐`document.querySelector("~~")`
  - <span class="highlight_yellow">가장 유용하고 자주 쓰이는 방식!</span>
  - HTMl에서 가져올 요소를 css 선택자로 선택해서 불러온다. (첫번째 요소)
- `document.querySelctorAll("~~")`
  - 괄호 안에 선택자와 일치하는 요소들의 배열을 불러온다. (모든 요소)

```html
<div class="title">
  <h1 >Grab me!</h2>
</div>

<script>

  let title = document.querySelector(".title h1")
  //html에서 title 클래스 아래에 있는 h2 태그 요소를 변수 title에 저장

  helloClass.innerText = "Got you!"
  //h2 태그 텍스트 "Geab me!"를 "Got you!"로 변경

</script>
```

- 자바스크립트에서 html의 object properties를 보는 방법
  - `console.dir(title);` -> 콘솔창에서 확인 가능!

