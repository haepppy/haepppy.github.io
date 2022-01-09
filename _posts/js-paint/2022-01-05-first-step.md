---
layout: single
title:  "바닐라 JS로 그림판 만들기 - (1)"
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

## 배울 내용  
1. `<canvas>`태그
2. canvas의 context
3. 마우스 포인터를 따라 그려지는 그림
4. 브러쉬의 색상과 두께 설정
5. fill 버튼으로 캔버스 색 채우기
6. save 버튼으로 이미지 저장하기

## 기본 set-up  

```html
<canvas id="jsCanvas" class="canvas"></canvas>
    <div class="controls">
        <div class="controls_range">
            <input type="range"
            id="jsRange"
            min="0.1"
            max="5"
            value="2.5"
            step="0.1">
        </div>
        <div class="controls_btns">
            <button id="jsMode">Fill</button>
            <button id="jsSave">Save</button>
        </div>
        <div class="controls_colors" id="jsColors">
            <div class="controls_color jsColor" style="background-color: #2c2c2c;"></div>
            <div class="controls_color jsColor" style="background-color: white;"></div>
            <div class="controls_color jsColor" style="background-color: #ff3b30;"></div>
            <div class="controls_color jsColor" style="background-color: #ff9500;"></div>
            <div class="controls_color jsColor" style="background-color: #ffcc00;"></div>
            <div class="controls_color jsColor" style="background-color: #4cd963;"></div>
            <div class="controls_color jsColor" style="background-color: #5ac8fa;"></div>
            <div class="controls_color jsColor" style="background-color: #0579ff;"></div>
            <div class="controls_color jsColor" style="background-color: #5856d6;"></div>
        </div>
    </div>
```

```css
@import "reset.css";
/* https://meyerweb.com/eric/tools/css/reset/ */

body {
    background-color: #f6f9fc;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
}

.canvas {
    width: 500px; height: 500px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.controls {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.controls .controls_btns {
    margin-bottom: 30px;
}

.controls_btns button {
    all: unset;
    cursor: pointer;
    background-color: #fff;
    padding: 5px 0px;
    width: 80px;
    text-align: center;
    border-radius: 5px;
    border: 2px solid rgba(0,0,0,0.2);
    color: rgba(0,0,0,0.7);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    text-transform: uppercase;
    font-weight: 800;
    font-size: 12px;
}

.controls_btns button:active {
    transform: scale(0.98);
}

.controls .controls_colors {
    display: flex;
}

.controls_colors .controls_color {
    width: 50px; height: 50px;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.controls .controls_range {
    margin-bottom: 30px;
}
```

- https://meyerweb.com/eric/tools/css/reset/ 의 내용을 복사해 가져온 css 파일을 import한다.

