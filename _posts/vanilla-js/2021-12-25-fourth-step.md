---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - (5) 시계"
folder: "vanilla-js"

categories:
    - vanilla-js
tags:
    - 인강 정리
    - 기본 개념
    - 자바스크립트
keywords:
    - Application_Clock
    - setInterval( )
    - setTimeout( )
    - Date 객체
    - String( )
    - .padStart( )
    - .padEnd( )

author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

setInterval과 setTimeout의 개념과 Date() 객체를 이해하고 간단한 시계를 만들 수 있다.


## setInterval과 setTimeout  
- setInterval
    - 매번 일정한 속도로 함수를 실행한다.
    - ex) 매 3초마다 함수 실행
- setTimeout
    - 얼마 후에 함수를 한번 실행한다.
    - ex) 3초 후에 함수 한번 실행  
<br/>

▾ start 버튼을 누르면 각 함수 실행, stop 버튼 누르면 정지  

<p id="startBtn" style="display:inline-block; cursor: pointer; font-weight: bold; margin-right:10px">Start</p>
<p id="stopBtn" style="display:inline-block; cursor: pointer; font-weight: bold">Stop</p>
<p id="interval">interval : </p>
<p id="timeout">timeout : </p>


<script>
    const startBtn = document.querySelector("#startBtn");
    const stopBtn = document.querySelector("#stopBtn");
    const interval = document.querySelector("#interval");
    const timeout = document.querySelector("#timeout");

    let intervalTimer;

    function intervalAction() {
        interval.innerText = `${interval.innerText} Hey!`;
    };
    function timeoutAction() {
        timeout.innerText = `${timeout.innerText} Hey!`
    }

    function intervalStart() {
        intervalAction();
        intervalTimer = setInterval(intervalAction, 3000);
        setTimeout(timeoutAction, 3000);
    };
    function intervalStop() {
        clearInterval(intervalTimer);
    }

    startBtn.addEventListener("click", intervalStart);
    stopBtn.addEventListener("click", intervalStop);
</script>

## Date( )  
Date는 날짜 및 시간 정보를 담고 있는 객체이다.  
새로운 Date 객체를 얻기 위해서는 `new`연산자를 사용하는 것이 유일한 방법이다.
- `let date = new Date();` : 새로운 Date 객체를 date 변수에 할당한다.
    - `date.getMonth();` : date 변수가 할당될 때의 월을 불러온다.
    - `date.getDate();` : date 변수가 할당될 때의 일을 불러온다.
    - `date.getDay();` : date 변수가 할당될 때의 요일을 불러온다.
        - 요일은 일요일 0부터 ~ 토요일 6까지 숫자로 표시된다.
    - `date.getHours();` : date 변수가 할당될 때의 시을 불러온다.
    - `date.getMinutes();` : date 변수가 할당될 때의 분을 불러온다.
    - `date.getSeconds();` : date 변수가 할당될 때의 초을 불러온다.

## 간단한 시계 만들기  
위에서 서술된 생성자 및 객체로 간단한 시계를 만들 수 있다.

1. 함수 getClock을 생성한다.
    - (현재 시간 정보)`new Date();`가 할당된 변수를 생성한다.
        - 매번 새 Date 객체를 할당해야 하므로 반복 실행시킬 함수 안에 작성
    - html 요소 innerText에 (시간):(분);(초) `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`를 할당한다.
2. 함수 getClock을 일단 한번 실행시킨다.
    - setInterval의 최초 실행은 설정된 딜레이 시간이 지난 후이다, 여기선 1초 후에 첫 함수가 실행된다.
3. setInterval 생성자로 함수 getClock을 1초마다 실행시킨다.

```html
<p id="clock">00:00</p>

<script>
    const clock = document.querySelector("#clock");

    function getClock() {
        const date = new Date();
        clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    getClock();
    setInterval(getClock, 1000);
</script>
```
▾  
<p id="clock" style="background: #eee; width: fit-content">00:00</p>

<script>
    const clock = document.querySelector("#clock");

    function getClock() {
        const date = new Date();
        clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    getClock();
    setInterval(getClock, 1000);
</script>

## 숫자 표현 다듬기  
1 -> 01 처럼 표현하기  

### padStart( )  
 : 현재 문자열의 시작을 다른 문자열로 채워, 주어진 길이를 만족하는 새로운 문자열을 반환합니다. - MDN 참고  
**_string_.padStart(_targetLength_[, _padString_])**  
- targetLength : 목표 문자열의 길이. 현재 문자열의 길이보다 작다면 채우지 않고 그대로 반환
- padString : 현재 문자열에 채워넣을 다른 문자열.
- `"1".padStart(2, "0");`
    - 문자열 "1"의 길이가 2보다 짧기 때문에 길이가 2가 될 때까지 좌측에 문자열 "0"을 추가한다.
    - "1" -> "01" 반환
- `"98".paadStart(2, "0");` //'98' 반환
- `"Haein".padStart(10, "to");` //'tototHaein' 반환
    - 문자열이 너무 길어 목표 문자열 길이를 초과한다면 좌측 일부를 잘라서 넣음
- _.padEnd는 기존 문자열의 우측으로 문자열을 추가한다._  

함수 안에 hours, minutes, seconds 변수를 생성한다.
- `const hours = String(date.getHours()).padStart(2, "0");`
- `const minutes = String(date.getMinutes()).padStart(2, "0");`
- `const seconds = String(date.getSeconds()).padStart(2, "0");`
- String()은 매개변수를 문자열로 반환한다.  

innerText를 수정한다.
- ``clock.innerText = `${hours}:${minutes}:${seconds}`;``  

최종 정리 : 
```js
const clock = document.querySelector("h2#clock");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
};
getCloc();
setInterval(getClock, 1000);
```

▾ 한자리 숫자 앞에 0을 붙여 표현  
<p id="clock2" style="background: #eee; width: fit-content">00:00</p>

<script>
    const clock2 = document.querySelector("#clock2");

    function getClock2() {
        const date2 = new Date();
        const hours = String(date2.getHours()).padStart(2, "0");
        const minutes = String(date2.getMinutes()).padStart(2, "0");
        const seconds = String(date2.getSeconds()).padStart(2, "0");
        clock2.innerText = `${hours}:${minutes}:${seconds}`;
    };

    getClock2();
    setInterval(getClock2, 1000);
</script>