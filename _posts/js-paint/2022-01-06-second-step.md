---
layout: single
title:  "바닐라 JS로 그림판 만들기 - (2)"
folder: "vanilla-js-paint"

categories:
    - vanilla-js-paint
tags:
    - 인강 정리
    - 기본 개념
    - 자바스크립트 기본

author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

<style>
    .full-box {
        width: 30%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 20px
    }
    .full-box:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    .first-box{
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;
        border: 1px solid #000;
    }
    .second-box{
        width: 60%; height: 30%;
        position: absolute;
        top: 0; left: 0;
        border: 2px solid tomato;
    }
    .third-box{
        width: 30%; height: 30%;
        position: absolute;
        top: 0; left: 0;
        border: 2px dashed blue;
    }
</style>

## canvas events  

1. canvas의 실제 크기를 지정해준다.
    - `canvas.width`, `canvas.height`
2. canvas에서 마우스 움직임이 감지되면 마우스 포인터의 위치를 변수에 저장한다.
    - `offset` : 캔버스 내에서 마우스의 위치 좌표
    - `client` : 윈도우 전체에서 마우스의 위치 좌표
3. 마우스가 캔버스 안에서 움직이는 동안
    - painting이 false인 경우 (마우스를 움직이기만 하고 클릭하지 않을 때)
        - 새 선을 바로 그릴 수 있도록 준비를 한다.
        - 움직이는 동안 계속 선의 시작점을 갱신한다.
        - -> 움직이는 동안 클릭에 대비해 바로 선을 그릴 수 있도록 한다.
    - painting이 true인 경우 (마우스가 클릭 상태일 때)
        - 끝나는 점을 갱신한다.
        - 위 설정대로 나타난 시작점 - 끝나는점 사이의 선을 캔버스 위에 표시한다.
        - -> 마우스가 클릭되는 동안 위 과정이 계속 수행된다.

---

`context` : 요소 안에서 픽셀에 접근할 수 있는 방법.  

`ctx.beginPath()`  
- 캔버스 위에 무언가 그리기 전에 '시작'을 나타냄  

`ctx.moveTo(x, y)`  
- 시작점을 나타냄  
- 그리기 시작한다고 한 뒤에 선이 시작하는 위치 좌표를 지정  

`ctx.lineTo(x, y)`  
- 끝나는 점을 나타냄  
- 선이 끝나는 위치 좌표를 지정  

`ctx.stroke()`  
- 위에서 설정된 선을 표현하는 함수, 이 함수가 실행 되기 전까진 눈에 보이지 않는 상태  

---

캔버스의 실제 사이즈를 JS에서 설정해야하는 이유  

<div class="full-box">
    <div class="first-box"></div>
    <div class="second-box"></div>
    <div class="third-box"></div>
</div>

500 * 500 px 캔버스 사이즈를 설정하지 않을 경우, 스크립트 상에서 실제 캔버스 크기는 빨간색 처럼 300 * 150 px로 설정된다. 빨간색 안에서 마우스 움직임을 감지하는데, html에서 나타나는 캔버스 크기에 맞춰 파란색 점선 영역 안에서 움직이는 마우스의 획이 500 * 500 px 크기로 확대되어 표시된다.  

```js
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

//canvas 크기 지정 - 캔버스에 접근하여 길이 값을 가져온다.
const canvasWidth = document.getElementsByClassName("canvas")[0].offsetWidth;
const canvasHeight = document.getElementsByClassName("canvas")[0].offsetHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//기본 설정
ctx.strokeStyle = "#2c2c2c"; //브러쉬 색상
ctx.lineWidth = 2.5; //브러쉬 두께

let painting = false;

function stopPainting() { //클릭하지 않을 때
    painting = false;
}

function startPainting() { //클릭하고 있을 때
    painting = true;
}

function onMouseMove(e) { //마우스가 캔버스 안에서 움직일 때
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) { //마우스를 클릭하고 있지 않을 떄
        ctx.beginPath(); //새 선을 그린다고 선언 (바로 그릴 수 있게 대기중 / 움직이다가 클릭하면 끝)
        ctx.moveTo(x, y); //시작점 (클릭 직전까지 시작점을 저장하고 있음)
    } else { //마우스를 클릭할 때 (클릭한 상태로 마우스를 움직이는 내내 실행되고 있음)
        ctx.lineTo(x, y); //끝나는 점
        ctx.stroke(); //위 설정대로 선을 나타냄
    }
};

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); //마우스가 움직일 때
    canvas.addEventListener("mousedown", startPainting); //마우스가 클릭될 때
    canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 안할 때
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스를 벗어날 때
};
```

## changing color  

하단 색상을 클릭하면 해당 색상으로 브러쉬 색상을 변경한다.  

1. html 색상 요소를 배열로 만들고
    - `Array.from(colors)`
2. 만든 배열에 forEach를 통해 클릭 이벤트로 handleColorClick 함수를 수행하게 한다.
    - `Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));`
3. 클릭한 대상의 배경 색을 변수에 지정하고
    - `const color = e.target.style.backgroundColor`
4. 위에서 지정한 값을 획 색상에 할당한다.
    - `ctx.strokeStyle = color;`


```js
const colors = document.getElementsByClassName("jsColor");

function handleColorClick(e) {
    const color = e.target.style.backgroundColor; //해당 색상의 background-color 값을 반환한다.
    ctx.strokeStyle = color; 
};

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
```

## brush size  

1. range에 input 이벤트로 handelRangeChange 함수를 실행한다.
    - `range.addEventListener("input", handelRangeChange);`
2. range의 값을 변수에 지정한다.
    - `const size = e.target.value`
3. 위에서 지정한 값을 획 두께에 할당한다.
    - `ctx.lineWidth = size;`

```js
const range = document.getElementById("jsRange");

function handelRangeChange(e) {
    const size = e.target.value;
    ctx.lineWidth = size;
};

if(range) { //range변수가 정상적으로 지정되었는지 확인, 오류가 나지 않도록 해준다.
    range.addEventListener("input", handelRangeChange); //range 태그는 input 이벤트를 받는다.
};
```

## filling mode  

fill 버튼을 클릭하면 버튼의 "FILL" 텍스트가 "PAINT"로 바뀌고, fill 버튼이 활성화된 상태로 캔버스를 클릭하면 캔버스 전체가 해당 색상으로 채워진다.  
주의할 점은 다시 paint 버튼이 활성화된 후에 클릭하면 fill 함수가 아닌 paint 함수가 실행되어야 한다.  

1. 색상을 클릭할 때 수행되는 handleColorClick 함수에 fill 스타일을 지정하는 변수를 추가한다.
    - `ctx.fillStyle = color;`
2. 'fill'버튼에 클릭 이벤트로 handleModeClick 함수를 실행한다.
    - `mode.addEventListener("click", handleModeClick);`
3. 버튼을 클릭할 때 filling이 true일 경우 false로 바꾸고 버튼의 텍스트를 fill로 바꾸고
    - `if(filling ===  true) {filling = false; mode.innerText = "Fill";}`
4. 버튼을 클릭할 때 filling이 false일 경우 true 바꾸고 버튼의 텍스트를 paint로 바꾼다.
    - `else {filling = true; mode.innerText = "Paint";}`
5. 캔버스를 클릭할 때 filling이 true일 경우 (fill 버튼 활성화 상태) 색을 채운다.
    - `ctx.fillRect(0, 0, canvasWidth, canvasHeight);`

---

`ctx.fillStyle`  
- 생성될 사각형 (fill) 의 스타일을 지정한다.
- 스타일을 먼저 지정한 후에 `ctx.fillRect`가 작성되어야 한다.

`ctx.fillRect(x, y, width, height)`  
- 사각형 (fill) 을 생성한다.
- x, y : 사각형의 시작점을 지정한다, 좌측 상단 꼭짓점에 해당한다.
- width, height : 생성된 사각형의 크기를 지정한다.

```js
const mode = document.getElementById("jsMode");

//기본 설정
ctx.fillStyle = "#2c2c2c";

let filling = false;

function handleColorClick(e) { //이미 있던 함수에 추가한다.
    ctx.fillStyle = color;
};

function handleModeClick() { //버튼 innerText 및 filling 상태 지정
    if(filling ===  true) { //버튼이 클릭될 때 fill 버튼이 활성화 된 상태라면
        filling = false;
        mode.innerText = "Fill";
    } else { //버튼이 클릭될 때 fill 버튼이 활성화 되지 않은 상태라면
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) { //fill 버튼 활성화 시에만 클릭-fill이 수행됨, 안하면 paint 하려고 클릭해도 채워짐
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
}

if(canvas) {
    canvas.addEventListener("click", handleCanvasClick); //이미 있던 if문에 추가한다.
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
};
```

## saving image  

save 버튼을 클릭하면 캔버스에 그려진 그림을 이미지로 저장한다.  
`canvas.toDataURL()`로 얻은 데이터 주소를 download 속성을 가진 가상 링크`<a>`에 연결하고 링크를 클릭하는 동작까지 버튼 클릭 함수로 작성한다.  

1. 캔버스를 우클릭할 때 (contextmenu 이벤트) 기본 브라우저 동작을 막는다.
    - `e.preventDefault();`
    - 마우스 우클릭할 때 나타나는 메뉴를 비활성화 시킨다.
2. save 버튼을 클릭할 경우 handleSaveClick 함수를 실행한다.
3. 새 변수에 캔버스의 이미지 데이터 주소를 할당하고
    - `canvas.toDataURL()`
4. a태그 앨리먼트를 새 변수에 지정하고
    - `const link = document.createElement("a");`
5. a 태그의 href 속성과 download 속성을 지정하고
    - `link.href = image;`, `link.download = "Paint";`
6. a 태그에 클릭 함수를 추가한다.
    - `link.click();`
    - 가상의 a 링크를 클릭하는 동작을 수행한다.

---

`canvas.toDataURL()`  
- 캔버스의 데이터를 이미지로 얻는다.
- 지정된 포맷의 이미지 표현을 포함한 dataURL을 반환한다.
- 기본 포맷은 PNG

`a.download`  
- a 태그의 속성으로 브라우저에게 해당 링크로 이동하는 대신 URL을 다운로드 하라고 지시한다.
- 속성값은 문자열로, 다운로드시 파일명으로 지정된다.
- 다운로드할 URL은 href 속성의 속성값으로 지정한다.

```js
const saveBtn = document.getElementById("jsSave");

//저장할 때 캔버스의 기본 배경색이 지정되어 있지 않으면 배경색이 없이 저장됨. - 하얀색으로 지정한다.
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint";
    link.click();
}

if(canvas) { //이미 있던 if문에 추가한다.
    canvas.addEventListener("contextmenu", handleCM);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
```

[완성본 보기](/assets/html/project2.html)