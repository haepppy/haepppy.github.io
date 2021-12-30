---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - (8) 지역과 날씨"
folder: "vanilla-js"

categories:
    - vanilla-js
tags:
    - 인강 정리
    - 기본 개념
    - Application_Weather
    - navigator
    - fetch

author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

## 1. 지역 좌표 가져오기  
1. **navigator.geolocation.getCurrentPosition(_success_, _error_);**
    - 위 함수는 사용자의 위치 정보를 가져올 수 있다.
    - 두개의 콜백함수가 필요한데 첫번째는 지역정보를 가져오는데 성공했을 때 실행할 함수고, 두번째는 실패했을 때 실행할 함수다.
2. 지역 정보를 가져오는데 성공하면 각각 위도와 경도 좌표를 변수에 지정하고 액션을 취한다.
    - 지역 정보를 담은 오브젝트를 담을 빈 자리도 채워준다. `position (임의 지정)`
    - `position.coords.latitude` : 위도 좌표, `position.coords.longitude` : 경도 좌표
    - 콘솔창에서 position 오브젝트를 펼쳐보면 위도와 경도가 저장된 프로퍼티를 알 수 있다.
3. 실패했을 경우의 함수도 작성해준다.
    - `alert("Can't find you. No weather for you.")`

```js
function onGeoOk(position) {
    const lat = position.coords.latitude; //위도 좌표
    const lng = position.coords.longitude; //경도 좌표

    console.log("You live in", lat, lng);
}

function onGeoError() {
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
```

## 2. Open Weather API  

1. [Open Weather Map API](https://openweathermap.org/) 가입하고 얻은 키코드 새 변수에 지정
2. 위 사이트의 API - Current Weather Data - By geographic coordinates의 API Call을 복사한다.
    - {lat}에 위도, {lon}에 경도, {API key}에 키코드를 입력하면 날씨 정보를 보여준다.
3. 필요한 정보를 가져온다.


```js
const API_KEY = "6cc0827653a5b58388a4d8881424738c";

function onGeoOk(position) {
    const lat = position.coords.latitude; //위도
    const lon = position.coords.longitude; //경도
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    //API 주소

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name; //도시 이름
            weather.innerText = `${data.weather[0].main}/${data.main.temp}℃`; //날씨 및 온도
        });
}
```
<br/>
HTML 구성

```html
<div id="weather">
    <span></span>
    <span></span>
</div>
```

## Fetch API
 : 자바스크립트에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있게 한다.

- fetch가 나오기 전에 AJAX라는 것이 있었다. 전체 페이지를 새로고침하지 않아도 페이지의 일부만을 위한 데이터를 로드할 수 있다.
- fetch는 promise 기반으로 구성되어 있어 더 간편하게 사용할 수 있다.
- 기본 구조

    ```js
    fetch(url)
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })
    ```
    매개변수로 요청을 보낼 url을 입력하고 응답을 받아서 다른 작업을 할 수 있다.
    then에서 응답객체 res를 받고 catch에서 에러 요청이 발생했을 때 error를 받는다.
- 본문에서

    ```js
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name; //도시 이름
            weather.innerText = `${data.weather[0].main}/${data.main.temp}℃`; //날씨 및 온도
        });
    ```
    - `fetch(url)`
        - _url_ 로 요청을 보내고 응답을 받는다.
    - `.then(response => response.json())`
        -  _url_ 에서 받아온 _response_ (응답) 객체로부터 JSON 포멧의 응답 전문을 자바스크립트의 object로 번환한다.
        - 위 코드에서의 [response](https://api.openweathermap.org/data/2.5/weather?lat=37.6569856&lon=126.8809728&appid=6cc0827653a5b58388a4d8881424738c&units=metric)
            - 보이는 것처럼 배열 모양의 문자열 (JSON 문자열) 이다.
    - `.then(data => { })`
        - JSON에서 변환한 object (_data_) 에서 필요한 정보를 가져와 사용한다.

