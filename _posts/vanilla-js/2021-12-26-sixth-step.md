---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - (7) 투두리스트"
folder: "vanilla-js"

categories:
    - vanilla-js
tags:
    - 인강 정리
    - 기본 개념
    - 자바스크립트
keywords:
    - Application_To Do List
    - document.createElement( )
    - .appendChild( )
    - JSON
    - JSON.stringify( )
    - JSON.parse( )
    - .forEach( )
    - .filter( )

author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

입력창에서 받아들인 값을 submit 하면 리스트로 표시하고 스토리지에 저장해서 기억하고 삭제버튼 누르면 없어지는  
To-Do-List 만들기

## 1. 기본 세팅  
로그인 필드 만들어서 인삿말 표시하는 과정과 거의 비슷함.   

```html
<form id="todo-form">
    <input type="text" placeholder="Write a To Do and Press Enter" required />
</form>
<ul id="todo-list"></ul>
<!-- 리스트 태그(<li>)는 스크립트 통해서 추가 -->
```
<br/>

1. **입력된 값을 submit(엔터)하면**
    - `toDoForm.addEventListener("submit", handleToDoSubmit);`
2. **submit의 브라우저 기본 동작(새로고침)을 막고**
    - `e.preventDefault();`
3. **입력된 값을 새 변수에 할당하고**
    - `const newTodo = toDoInput.value;`
4. **입력창에 있던 텍스트는 지워준다**
    - `toDoInput.value = "";`
        - 위에서 변수에 값을 이미 할당했기 때문에 입력필드를 비운다고 해서 할당된 변수가 변하진 않는다.

```js
const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value; //여기서 새 변수에 값을 할당했으므로
    toDoInput.value = ""; //값을 비운다고 해서 이미 할당된 변수가 변하진 않음.
};

toDoForm.addEventListener("submit", handleToDoSubmit);
```

## 2. 입력된 값을 받아서 <li>로 추가  

자바스크립트를 통해 HTML에 요소 추가하기 (화면에 나타내기)  

1. **새 변수에 각각 li 요소와 span 요소를 생성해 할당하고**
    - `const li = document.createElement("li");`, `const span = document.createElement("span");`
        - `li = <li>`, `span = <span>`
        - 변수에 태그요소를 할당했을 뿐 실제로 HTMl에 추가되진 않음
2. **li의 자식요소로 span을 추가하고**
    - `li.appendChild(span);`
        - `<li><span></span></li>` 구조 만들기
        - appendChild를 통해 실제로 HTML에 추가됨.
3. **span의 내용에 입력된 값(변수 newTodo)을 할당하고**
    - `span.innerText = newTodo;`
        - `<li><span>(newTodo)</span></li>` 구조 만들기
4. **HTML에 미리 만들어둔 `<ul>`요소의 자식요소로 li 추가하고**
    - `toDoList.appendChild(li);`
        - `<ul><li><span>(newTodo)</span></li></ul>` 구조 만들기
5. **handleToDoSubmit에 함수 추가하기**
    - `paintToDo(newTodo)`
        - handleToDoSubmit에서 생성된 변수 newTodo(입력창에서 받아온 값)를 가져와 인자에 넣는다.


```js
const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

function paintToDo(newTodo) { //handleToDoSubmit에서 받아온 (텍스트 필드에 입력된)값 newTodo
    const li = document.createElement("li");
    const span = document.createElement("span");
    li.appendChild(span);
    span.innerText = newTodo;
    toDoList.appendChild(li);
}


function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value; //여기서 새 변수에 값을 할당했으므로
    toDoInput.value = ""; //값을 비운다고 해서 이미 할당된 변수가 변하진 않음.
    paintToDo(newTodo); //위에서 생성한 변수를 paintToDo 함수로 보내기
};

toDoForm.addEventListener("submit", handleToDoSubmit);
```

## 3. 삭제 버튼을 클릭하면 <li>요소 삭제  

delete 버튼을 만들고 버튼을 클릭했을 때 HTML에서 해당 리스트 요소 지우기  

1. **새 변수에 버튼 요소를 할당하고**
    - `const btn = document.createElement("button");`
        - `btn = <button>`
2. **버튼 요소의 내용에 x표시 추가하고**
    - `btn.innerText = "×";`
        - `<button>×</button>` 구조 만들기
3. **btn에 클릭 이벤트 추가하고**
    - `btn.addEventListener("click", deleteToDo);`
    - deleteToDo(e) 함수에서는 -> 새 변수에 클릭한 요소의 부모 요소를 할당하고
        - `const thisLi = e.target.parentElement;`
        - -> e (이벤트에 대한) .target (대상 표적의: button) .parentElement (부모요소: li )에 접근
    - 해당 요소를 삭제한다.
        - `thisLi.remove();`
4. **li의 자식요소로 btn 추가한다.**
    - `li.appendChild(btn);`
        - `<li><span>(newTodo)</span><button>×</button></li>`구조 만들기
        - span - button의 순서대로 추가하려면 함수도 순서대로 작성해야한다.

```js
function deleteToDo(e) {
    const thisLi = e.target.parentElement; //e.target : button / e.target.parentElement : li
    thisLi.remove();
};

function paintToDo(newTodo) { //handleToDoSubmit에서 받아온 (텍스트 필드에 입력된)값 newTodo
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = newTodo;
    const btn = document.createElement("button");
    btn.innerText = "×";
    btn.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(btn); //순서! span 다음으로 들어와야 함
    toDoList.appendChild(li); //전체적으로 append는 가장 마지막에 작성되어야 함
};
```

## 4. 리스트 내용을 local storage에 저장  
`JSON.stringify( )`
 : 자바스크립트의 값이나 객체를 JSON 문자열로 변환한다.

- JSON
    - 속성-값 쌍 또는 "키-값" 쌍으로 이루어진 데이터 오브젝트를 전달하기 위해 사람이 읽을 수 있는 텍스트 기반이 사용된 데이터 교환 형식이다.
    - 자바스크립트에서 객체를 만들 때 사용하는 표현식이다.
    - 문법이 아닌 단순히 데이터를 표시하는 표현 방법일 뿐이다.  

---

1. **빈 배열을 생성하고**
    - `const toDos = [];`
2. **handleToDoSubmit 함수에 입력받은 값을 배열에 추가하는 식을 작성하고**
    - `toDos.push(newTodo);`
        - 배열 toDos에 newToDo (입력받은 값) 추가하기
3. **배열 내용을 스토리지에 저장하는 saveToDos 함수를 추가한다.**
    - `localStorage.setItem("toDos", JSON.stringify(toDos));`

---

- local storage는 자바스크립트의 객체 및 배열을 저장하지 못한다.
    - 배열 그대로 저장하려고 하면 string형태로 저장됨.
        - `'a, b, c'`로 저장됨.
        - 배열의 형태를 유지하지 못하고 배열 속 내용만 그대로 문자열이 됨.
    - `JSON.stringify()`는 배열을 JSON 문자열 형태로 변환시켜준다.
        - `'["a", "b", "c"]'`로 저장됨. (내용이 ["a", "b", "c"]인 string)
        - 배열의 형태를 유지하는 문자열이 됨.
        - 나중에 그대로 꺼내면 자바스크립트에서 배열로 인식할 수 있다.

```js
let toDos = []; //const 아니고 let으로 변수 지정하기!

function saveToDos() {
    localStorage.setItem("toDos", JSON.stringify(toDos)); //스토리지에 저장
}

function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    toDos.push(newTodo); //입력받은 값을 배열(toDos)에 넣기
    paintToDo(newTodo);
    saveToDos(); //엔터키를 눌렀을 때 - 스토리지에 저장하는 함수 실행
};

```

## 5. 스토리지에 저장된 배열 불러오기  

local storage에 저장된 string을 object로 불러와 새로고침을 해도 페이지에 나타나야한다.  

1. **새 변수에 스토리지의 "toDos" 값을 할당하고**
    - `const savedToDos = localStorage.getItem("toDos");`
2. **"toDos" 값이 존재한다면 ('null'이 아니라면) 실행하는 함수를 작성한다.**
    1. "toDos"의 값을 array로 변환하여 새 변수에 할당하고
        - `const parsedToDos = JSON.parse(savedToDos);`
            - 변환하지 않으면 배열 모양의 문자열 그대로 반환됨. (배열의 기능을 실행하지 못함)
    2. 배열 toDos에 변환한 배열 (스토리지에 있던 배열값) 을 할당하고
        - `toDos = parsedToDos;`
            - toDos 배열이 항상 빈 배열로 시작하는 것을 막기 위함 (예전 복사본 유지하기)
    3. 불러온 배열 속 값에 각각 paintToDo 함수 (배열 내용 리스트에 추가하기) 를 실행시킨다.
        - `parsedToDos.forEach(paintToDo);`

---

- `JSON.parse( )`
    - JSON 형식의 문자열 (사람이 이해할 수 있는 텍스트) 을 자바스크립트가 이해할 수 있는 값으로 변환한다.
    - `JSON.stringify( )`로 인해 문자열로 변환되었던 배열을 object 형태로 변환한다.
- `.forEach( )`
    - array의 각 item에 대해 하나의 function을 실행
- arrow function
    - 함수를 생성하는 다른 방법
    - (_매개변수_) => {_함수내용_}
    - ex) `parsedToDos.forEach((item) => {console.log("hello", (item))});`에서 `(item) => {console.log("hello", (item))}`이 부분이 `(item)`을 인자로 하고 `console.log("Hello", (item))`을 실행시키는 함수.

```js
const savedToDos = localStorage.getItem("toDos");

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
```

## 6. 스토리지 및 배열에서 해당 아이템 지우기  

삭제 버튼을 누르면 배열 및 스토리지에 저장된 데이터 중 이벤트 실행된 버튼에 해당하는 아이템을 지울 수 있다.  

1. **함수 handleToDoSubmit에 값과 함께 id를 포함하는 오브젝트를 생성하고**
    - `const newToDoObj = {text: newTodo, id: Date.now(),}`
        - text에 입력받은 값이, id에 현재 날짜 및 시간을 나타내는 밀리초 단위의 숫자를 지정한다.
        - id는 랜덤하고 겹치지 않는 아무 숫자로 지정해야하기 때문에 Date.now()가 적당
2. **그 오브젝트를 newTodo를 대신해 인자로 내보내고**
    - `toDos.push(newToDoObj);`, `paintToDo(newToDoObj);`
3. **함수 paintToDo에서 li요소의 id를 오브젝트의 id와 동일하게 지정하고**
    - `li.id = newTodo.id;`
        - 아이템에 해당하는 li요소에 같은 id를 줘야 어떤 li를 지워야 하는지 알 수 있다.
4. **span요소의 innerText는 nexTodo.text로 지정하고**
    - `span.innerText = newTodo.text;`
        - 더이상 단순한 배열이 아닌 두가지 이상의 의미를 포함한 오브젝트를 받아오기 때문에 오브젝트의 text 프로퍼티를 할당해주어야 한다.
5. **함수 deleteToDo에서 조건에 맞는 새로운 배열을 기존 배열에 할당하고**
    - `toDos = toDos.filter((todo) => todo.id !== parseInt(thisLi.id));`
        - `thisLi.id`는 string이고 `todo.id`는 number이다. 자료형이 같아야 함수가 예상대로 작동할 것이다.     
6. **바뀐 배열을 스토리지에 업데이트해준다.**
    - `saveToDos();`

---

- `.filter()`
    - _array_.filter(_function_)은 array의 요소에서 함수가 true를 반환하는 요소만 포함하는 새로운 배열을 반환한다. ( 함수에서 false를 반환하는 요소는 제외됨 )
    - ex) `[1, 2, 3, 4, 5]`인 배열 arr가 있을 때, `arr.filter((num) => num < 4)`
        - '4보다 작다'에 true를 반환하는 `[1, 2, 3]`을 가진 새 배열이 반환된다.
- `parseInt( )`
    - 문자열을 숫자로 변환한다.

```js
function deleteToDo(e) {
    const thisLi = e.target.parentElement;
    thisLi.remove();
    toDos = toDos.filter((todo) => todo.id !== parseInt(thisLi.id)); //자료형 문자형에서 숫자형으로 바꿔줘야함
    saveToDos(); //새로 바뀐 배열을 다시 스토리지에 업데이트
};

function paintToDo(newTodo) { //이 함수가 받는 것은 더이상 string이 아니고 object임
    const li = document.createElement("li");
    li.id = newTodo.id; //li의 id를 오브젝트의 아이디로 지정
    const span = document.createElement("span");
    span.innerText = newTodo.text; //object의 text와 id 중 text 부분을 가져옴
    const btn = document.createElement("button");
    btn.innerText = "×";
    btn.addEventListener("click", deleteToDo);
    li.appendChild(span);   
    li.appendChild(btn);
    toDoList.appendChild(li);
};

function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = { //입력된 값과 고유 아이디를 포함하는 오브젝트
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newToDoObj); //위에서 생성한 오브젝트를 기존 배열에 추가하기
    paintToDo(newToDoObj); //위에서 생성한 오브젝트를 paintToDo 함수로 보내기
    saveToDos();
};
```

## 중요 포인트 정리  
1. `document.createElement("tag-name")`는 자바스크립트에서 HTML 태그 요소에 접근할 수 있도록 태그 네임을 지정한다.  
[2. 입력된 값을 받아서 li로 추가 ⇀](#2-입력된-값을-받아서-li로-추가)
2. `element.appendChild(other)`은 실제로 HTML에 element의 자식요소로 other을 추가한다.  
[2. 입력된 값을 받아서 li로 추가 ⇀](#2-입력된-값을-받아서-li로-추가)
3. `JSON.stringify( )`은 오브젝트나 배열 등의 자바스크립트 값을 문자열 형태로 변환한다.  
[4. 리스트 내용을 local storage에 저장 ⇀](#4-리스트-내용을-local-storage에-저장)
4. `JSON.parse( )`는 3번과는 반대로 문자열을 자바스크립트가 이해할 수 있는 형태로 변환한다.  
[5. 스토리지에 저장된 배열 불러오기 ⇀](#5-스토리지에-저장된-배열-불러오기)
5. `array.forEach(function)`는 array의 각 item에 대해 하나의 function을 실행한다.  
[5. 스토리지에 저장된 배열 불러오기 ⇀](#5-스토리지에-저장된-배열-불러오기)
6. `array.filter(function)`는 array의 각 item에 대해 하나의 function을 실행하고 true를 반환하는 item만 포함하는 새로운 array를 반환한다.  
[6. 스토리지 및 배열에서 해당 아이템 지우기 ⇀](#6-스토리지-및-배열에서-해당-아이템-지우기)
