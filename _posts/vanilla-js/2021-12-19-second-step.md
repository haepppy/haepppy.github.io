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
    - event
    - 자바스크립트와 CSS
    - .addEventListener( )

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

## HTML in Javascript    
자바스크립트에서 더 구체적으로 한가지 혹은 여러개의 HTML 요소들을 선택해 불러올 수 있다.  

### id 선택자  
- `document.getElementById("##")`
  - HTML에서 "##" 아이디를 가진 요소를 불러온다.

```html
<h1 id="title">Grab me!</h1>

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
<h1 class="hello">Grab me!</h1>

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
  <h1 >Grab me!</h1>
</div>

<script>

  let title = document.querySelector(".title h1")
  //html에서 title 클래스 아래에 있는 h2 태그 요소를 변수 title에 저장

  title.innerText = "Got you!"
  //h2 태그 텍스트 "Geab me!"를 "Got you!"로 변경

</script>
```

- 자바스크립트에서 html의 object properties를 보는 방법
  - `console.dir(title);` -> 콘솔창에서 확인 가능!
  - 이렇게 확인한 프로퍼티에 접근해 값을 수정하거나 추가할 수 있음.

```js
title.style.color = "blue";
//title - style - color 값에 접근해 수정 가능
```

- 추가로, 선택속성을 따로 사용하지 않아도 되는 경우가 있다.
  - `document.body`, `document.head`, `document.title`은 중요한 요소이기 때문에 바로 가져올 수 있다.

## Event  
- `console.dir()`에서 본 객체의 프로퍼티 중 앞에 'on'이 붙은 것은 event임.
- event : 어떤 행위를 하는 것.
- 자바스크립트는 event를 listen한다.
  - `addEventListener()` 사용
  - 이 방법으로 작성된 이벤트는 `removeEventListener()`를 이용해 제거할 수 있다.

### addEventListener( )  

```html
<div class="title">
  <h1 >Grab me!</h1>
</div>

<script>

  const title = document.querySelector(".title h1");

  function handleTitleClick() {
      title.style.color = "blue";
  };
  //title 색을 파란색으로 바꾸는 함수

  title.addEventListener("click", handleTitleClick);
  //title 클릭시 handleTitleClick 함수 실행

  //title 클릭하면 색이 파란색으로 바뀜

</script>
```

- event 리스트
  - <span class="highlight_gray">(원하는 태그) html element mdn</span> 검색
  - <span class="highlight_gray">Web APIs</span>가 포함된 게시글

- 응용
  - 타이틀 위에 마우스 포인터를 올리면 "Mouse is here!", 내리면 "Mouse is gone!"으로 바뀜

```js
function handleMouseEnter() {
    title.innerText = "Mouse is here!";
};

function handleMouseLeave() {
    title.innerText = "Mouse is gone!";
};

title.addEventListener("mouseenter", handleMouseEnter);
title.addEventListener("mouseleave", handleMouseLeave);
```

### on _eventname_    
- event를 실행시키는 두번째 방법  
- 단 이벤트 제거 등의 이유로 `addEventListener()` 사용을 권장.

```js
title.addEventListener("click", handleTitleClick);
=
title.onclick = handleTitleClick;

title.addEventListener("mouseenter", handleMouseEnter);
=
title.onmouseenter = handleMouseEnter;
.
.
.
```

### 다양한 evnet들  
- window의 event 중 'resize'는 브라우저창의 크기가 바뀔 때 작동한다.

```js
const h1 = document.querySelector(".title h1");

function handleWindowResize () {
    document.body.style.backgroundColor = "tomato";
}
//html body의 배경 색상을 red로 변경하는 함수

window.addEventListener("resize", handleWindowResize);
//window의 크기가 바뀔 때 handleWindowResize함수 실행
```

- clipboard 관련 event 중 'copy'는 뭔가를 복사했을 때 작동한다.

```js
const h1 = document.querySelector(".title h1");

function handleWindowCopy() {
    alert("copier!");
};
//"copier!"라는 알림 창을 띄운다.

window.addEventListener("copy", handleWindowCopy);
//window에서 뭔가를 복사했을 때 handleWindowCopy함수 실행
```

- connection 관련 event 중 'offline'과 'online'은 각각 네트워크의 연결 여부에 따라 작동한다.

```js
function handleWindowOffline() {
    alert("WIFI OFF");
};
//네트워크 연결이 해제될 때 실행

function handleWindowOnline() {
    alert("WIFI ON")
}
//네트워크 연결이 될 때 실행

window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);
```

## CSS in Javascript  
자바 스크립트에서 스타일을 수정하는 방법은 여러가지가 있다.  
- 요소를 클릭하면 파란색-빨간색으로 번갈아 바뀌는 스크립트

```js
const h1 = document.querySelector(".title h1");

function handleTitleClick() {
    const currentColor = h1.style.color;
    let newColor;

    if (currentColor === "blue") {
        newColor = "tomato";
    } else {
        newColor = "blue";
    }

    h1.style.color = newColor;
};

h1.addEventListener("click", handleTitleClick);
```
<br/>

---
**<span class="highlight_violet">문제 발생</span>**  
번갈아 바뀌는 스크립트를 듣고 처음 구상하고 실행했던 스크립트에서 
색이 바뀌지 않았다. 콘솔창을 확인해보니 if문 앞뒤로 할당되지 않은 빈 변수와 
blue만 반복되어 나타날 뿐 변수의 변화나 html 상에 나타나는 변화는 없었다.  
<br/>
▾ 내가 처음 구상했던 스크립트

```js
const h1 = document.querySelector(".title h1");

function handleTitleClick() {
    let currentColor = h1.style.color;
    /* let newColor; */

    if (currentColor === "blue") {
        currnetColor = "tomato";
        /* newColor = "tomato" */
    } else {
        currnetColor = "blue";
        /* newColor = "blue"; */
    }

    /*h1.style.color = newColor; */
};

h1.addEventListener("click", handleTitleClick);
```

**<span class="highlight_violet">문제 파악 및 해결</span>**  

- <span class="highlight_blue">내가 구상했던 스크립트가 정상적으로 작동하지 않았던 이유</span>  
  - 마지막에 [h1.style.color = currentColor;]가 빠졌기 때문에. (이것만 있어도 작동은 됨)  
- <span class="highlight_blue">마지막 과정이 필요한 이유</span>
  - if문 안에서 새롭게 할당된 변수는 값인 상태로 있고 요소에 적용되지 않는다. 그래서 할당된 값을 요소에 대입시키기 위한 과정이 필요하다.
- <span class="highlight_blue">newColor라는 변수가 필요한 이유</span>
  - 변수의 이름은 그 용도나 의미에 따라 달라진다. currentColor는 현재의 색상 값을 의미하고, newColor는 새로운 색상 값을 의미한다.
  - 그리고 새 변수를 지정하는 것이 식이 더 예쁘다. 마지막 과정이 필요함에 따라 내 눈에도 새 변수를 지정하는 편이 더 예뻐보인다

---
<br/>

- 하지만 style은 자바스크립트가 아닌 css에서 수정하는 편이 더 좋다.

```html
<style>
  h1 {
    color: cornflowerblue;
    transition: color 0.5s ease-in-out;
  }

  .active {
      color: tomato;
  }
</style>


<script>
  const h1 = document.querySelector(".title h1");

  function handleTitleClick() {
      if (h1.className === "active") {
          h1.className = "";
      } else {
          h1.className = "active";
      }
  };

  h1.addEventListener("click", handleTitleClick);
</script>
```

이 스크립트는 위에 작성했던 것과 똑같이 작동하지만 완벽한 코드는 아니다.  
1. 함수식 안에 있는 클래스명(string)은 오타가 나기 쉽고, 그 오타를 발견하기 어려우며, 클래스명이 수정되었을 때 스크립트를 다 고쳐야만 하는 번거로움이 있다.
  - 클래스명을 변수에 저장하는 것으로 해결
2. 위와 같은 방법으로는 기존 요소에 클래스가 있는지는 신경쓰지 않고 클래스명이 active이던지 없던지 두가지만 이야기한다. 기존에 다른 클래스가 있다면 오류가 나게 된다.
  - `classList`를 이용하는 것으로 해결
  - <span class="highlight_gray">_element_.classList.contains(_string_)</span> : element의 클래스명에 string이 포함되어 있는지 확인한다. //포함되어 있으면 true를 반환//
  - <span class="highlight_gray">_element_.classList.add(_string_)</span> : element의 클래스 리스트에 클래스 추가 //classList.remove( ) : 제거//

```js
const h1 = document.querySelector(".title h1");

function handleTitleClick() {
    const clickedClass = "active"; //1번
    if (h1.classList.contains(clickedClass)) { //2번
        h1.classList.remove(clickedClass);
    } else {
        h1.classList.add(clickedClass);
    }
};

h1.addEventListener("click", handleTitleClick);
```
### 최적의 방법  
그럼에도 불구하고 더 좋은 방법이 있다.  
- `classList.toggle()` 사용하기
  - 괄호 안에 있는 클래스가 이미 있다면 지우고, 없다면 추가한다.
  - 위 if문의 내용과 일치하되 한줄로 작성할 수 있다.
  - 또한 active클래스명을 한번만 사용하기 때문에 변수에 저장할 필요도 없다.

```js 
const h1 = document.querySelector(".title h1");

function handleTitleClick() {
    h1.classList.toggle("active");
};

h1.addEventListener("click", handleTitleClick);
```

## 요약  
1. 자바스크립트에서 HTML의 요소를 가져오는 최적의 방법
  - <span class="highlight_gray">document.querySelector( )</span> 사용
  - 괄호 안에 CSS의 방식으로 요소를 선택할 수 있다.
2. event는 어떠한 행위를 하는 것
  - <span class="highlight_gray">_element_.addEventListener( )</span>사용
  - "어떠한 행위를 받았을 때 이러한 반응을 해라"
3. 자바스크립트에서 CSS를 수정할 수 있는 최적의 방법
  - <span class="highlight_gray">_element_.classList</span>사용
  - 직접 스타일을 수정하기 보다 CSS에 있는 클래스를 가져와 적용한다.