---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - (6) 매번 바뀌는 명언과 배경"
folder: "vanilla-js"

categories:
    - vanilla-js
tags:
    - 인강 정리
    - 기본 개념
    - Quotes and Background
    - Math.random( )
    - Math.fllor( )
    - .createElement( )
    - .appendChild( )
    - 랜덤 숫자 반환

author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

## 랜덤하게 바뀌는 명언  
- 재료
    - 명언 내용과 작가 이름이 담긴 객체
    - `Math.randome()` : 0~1 사이의 수를 랜덤하게 가져옴
    - `Math.floor()` : 소수점 위의 숫자만 남김

1. 명언 내용과 작가 이름이 담긴 객체 quotes 생성
    ```js
    const quotes = [
    {
        quote: "기대해 즐겨 듣던 그 멜로디.",
        author: "괜찮아요",
    },
    ...,
    ]
    ```

2. html 요소 (span 태그)를 변수에 할당
    ```js
    const quote = document.querySelector("#quote span:first-child");
    const author = document.querySelector("#quote span:last-child");
    ```

3. quotes 객체의 내용을 랜덤하게 가져오는 변수 생성
    - `Math.random()` 0~1 사이의 수를 랜덤하게 가져온다. (소수점 포함)
    - 가져온 수에 명언의 개수를 곱한다.
        - 명언이 10개라면 0~9의 수를 가져와야 함 : 10을 곱하면 = 0~10 (0.00∙∙∙1~ 9.99∙∙∙9)
        - `quotes.length`을 곱한다.
    - 가져온 수의 소수점 아래의 수는 지워준다. - 3가지 방법
        - `Math.round()` 소수점 아래 숫자들을 반올림 한다. ex) 1.1 = 1 / 1.9 = 2
        - `Math.ceil()` 소수점 아래 숫자들을 무조건 올린다. ex) 1.1 = 2 / 1.9 = 2
        - `Math.floor()` 소수점 아래 숫자들을 무조건 내린다. ex) 1.1 = 1 / 1.9 = 1
    - 완성된 랜덤 숫자로 프로퍼티를 가져와 변수에 할당한다.
        - quotes[ _n_ ] : _n_ 번째 프로퍼티 가져오기

    ```js
    const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];
    ```

4. 각 요소의 innerText를 변경한다.
    ```js
    quote.innerText = todayQuote.quote;
    author.innerText = todayQuote.author;
    ```
<br/>

```js
const quotes = [∙∙∙];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todayQuote.quote;
author.innerText = todayQuote.author;
```

## 랜덤하게 바뀌는 배경 이미지  
- 재료
    - images 폴더에 넣어둔 이미지 파일
    - images 배열
    - 랜덤 숫자 뽑아오는 식
    - `document.createElement()`
    - `.appendChild()`

1. 명언처럼 배열을 만들고 랜덤 숫자를 가져올 변수를 생성한다.
    ```js
    const images = ["0.jpg", "1.jpg", "2.jpg"];

    const choosenImge = images[Math.floor(Math.random() * images.length)];
    ```

2. 이미지 태그 요소를 만들어 변수에 할당한다.
    - `document.createElement("tag-name")` 입력한 태그의 HTML 요소를 반환한다.

    ```js
    const bgImage = document.createElement("img");
    ```

3. 추가한 img의 주소를 설정한다.
    - `(img 변수).src` img 태그의 src 속성에 접근한다.
    - images폴더의 파일 세개 중 랜덤하게 가져와 지정한다.

    ```js
    bgImage.src = `images/${choosenImge}`;
    ```

4. 생성한 요소를 body에 추가한다.
    - `document.body.appendChild();` body의 가장 아래에 자식요소를 추가한다.
    - `document.body.prependChild();` body의 가장 위에 자식요소를 추가한다.

    ```js
    document.body.appendChild(bgImage);
    ```
<br/>

```js
const images = ["0.jpg", "1.jpg", "2.jpg"];

const choosenImge = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `images/${choosenImge}`;

document.body.appendChild(bgImage);
```

