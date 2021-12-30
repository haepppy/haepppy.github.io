---
layout: single
title:  "input 태그의 중요한 속성과 속성값"
folder: "html"

categories:
    - html
tags:
    - input 태그
    - input 속성

author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

## input 태그  
사용자의 입력을 받을 수 있다.  

### 속성 및 속성값  
- type (필수)
    - 요소의 형태를 지정한다.
- autofocus
    - 커서를 기본으로 활성화한다.
    <input type="text" autofocus />
- placeholder
    - 텍스트필드에 기본으로 적혀있는 안내글. 커서를 두면 사라진다.
    <input type="text" placeholder="placeholder입니다" />
- readonly
    - 필드를 읽을 수만 있게 잠궈둔다.
    <input type="text" readonly="readonly" />
- required
    - 사용자가 필수로 입력해야 하는 항목을 표시한다.
    <input type="text" required />
- maxlength
    - 입력 가능한 최대 글자수를 지정한다.
    <input type="text" placeholder="최대 5글자까지 입력 가능합니다." maxlength="5" />
- minlength
    - 입력 가능한 최소 글자수를 지정한다.
    <input type="text" placeholder="최소 5글자부터 입력 가능합니다." minlength="5" />
- value
    - 실제로 적혀있는 값이다.
    <input type="text" value="value" />

### type 속성값  
- text
    - 텍스트를 입력받을 수 있는 필드를 생성한다.
    <input type="text" />
- button
    - 클릭할 수 있는 버튼을 생성한다.
    <input type="button" value="확인" />
- password
    - 가려진 문자를 입력할 수 있는 필드를 생성한다.
    <input type="password" />
- radio
    - 라디오 버튼을 생성한다.
    - name 속성으로 같은 이름을 지정하면 한 묶음이 되어 1개만 선택될 수 있게 한다.  
    <input class="inline" type="radio" name="rd" />1 <input class="inline" type="radio" name="rd" />2
- checkbox
    - 체크박스를 생성한다.
    - checked 속성으로 기본으로 체크되어 있는 박스를 생성할 수 있다.  
    <input class="inline" type="checkbox" /> <input class="inline" type="checkbox" /> <input class="inline" type="checkbox" checked />
- submit
    - 전송, 제출, 저장의 용도로 쓰이는 버튼을 생성한다.
    - `<form>`태그 안에서만 쓸 수 있다.
    <form>
        <input type="submit" />
    </form>
- reset
    - 초기화 버튼을 생성한다.
    - `<form>`태그 안에서만 쓸 수 있다.
    <form>
        <input type="reset" />
    </form>
- search
    - 내용을 한번에 지우는 버튼을 포함한 검색창을 생성한다.
    <input type="search" />
- file
    - 파일을 불러올 수 있는 버튼을 생성한다.
    <input type="file" />
- range
    - 범위를 지정할 수 있는 막대를 생성한다.
    <input type="range" />
- textarea (태그 `<textarea>`)
    - 여러줄을 입력받을 수 있는 필드를 생성한다.
    - cols(가로), rows(세로) 속성을 함께 입력해야 한다.
    <textarea cols="10" rows="5"></textarea>

  [더 많은 속성 보기](https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input)  
  <br/>