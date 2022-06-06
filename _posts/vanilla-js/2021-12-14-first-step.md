---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - (1), (2)"
folder: "vanilla-js"

categories:
    - vanilla-js
tags:
    - 인강 정리
    - 기본 개념
    - 자바스크립트
keywords:
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
    a.button1 {
        padding: 10px 20px;
        background: #000;
        color: #fff;
        border-radius: 16px;
        font-size: 14px;
    }
</style>


## 배울 내용은  
모멘트라는 크롬앱을 따라 만들 예정  
1. 사용자가 지정한 이름 기억하기
2. 시계 표시하기
3. To Do 리스트
4. 사용자 위치와 날씨 가져와서 보여주기 (Geolocation 좌표)
5. 매번 변하는 배경 사진과 명언 글귀

## 자바스크립트  
1. three.js  
    : 자바스크립트로 3D를 구현하게 해주는 라이브러리
2. React Native
    : 자바스트립트만으로 안드로이드, ios 앱을 만들 수 있게 해주는 프레임워크
3. Electron
    : 자바스크립트, html, css로 데스트탑 앱을 만들 수 있게 해줌

## 기본 1 - const, let, var  
- const
    - 값이 고정된 상수. (변수 x)
    - `const a = 0`
- let
    - 값이 변할 수 있는 변수.
    - 처음에 새 변수를 지정할 때만 사용.
    - `let a = 0`
    - `a = 1` : 후에 a라는 변수를 변경할 수 있다.
- var
    - const, let이 생기기 이전에 사용했음.
    - 옛날 웹사이트에선 많이 볼 수 있지만 let을 우선으로 사용하는걸 권장함.
    - `var a = 0`

## 기본 2 - Number(숫자열), String(문자열)  
- 숫자는 기본 작성, 문자열은 쌍따옴표를 사이에 두고 작성한다.  
`let a = 0321;` : 숫자열 변수 지정  
`let b = "btob";` : 문자열 변수 지정
- 문자열에서 더하기`+` 부호는 두가지 이상의 문자를 연결한다.  

```js
let a = 1;
let b = 2;

console.log(a + b); //3 출력

let a = "btob";

console.log(a + " melody"); //btob melody 출력
```

---

- 예를 들어 `console.log()`에 'typeof'를 추가하면 어떤 타입인지 확인할 수 있다.  

```js
const age = prompt("How old are you?");
//prompt 창을 열어 사용자가 값을 입력할 수 있게 함.
//여기서 입력된 값의 타입은 string임.

console.log(typeof age);
//string 출력
```

- String -> Number 변환하는 함수
    - `parseInt()`
    - 여기서 변환하려는 string이 숫자가 아닐 경우 NaN 출력.



## 기본 3 - Booleans 불린  
- true와 false
    - true와 false는 값이다.  

    ```js
    let a = true;
    let b = false;

    console.log(a); //true 출력
    console.log(b); //false 출력
    ```

- null과 undefined
    - null은 '비어 있음'이 지정됨을 나타내는 값
    - undefined는 '값이 지정되지 않음'을 나타내는 표시  
    `let a = null;` : 변수 a의 값은 일단 비워두기로 했어  
    `let b;` : 변수 b의 값은 아직 지정하지 않았어  

    ```js
    let a = null;
    let b;

    console.log(a); //null 출력
    console.log(b); //undefined 출력
    ```


## 기본 4 - Arrays 배열  
- 배열 생성
    - 변수 생성에서 값에 대괄호`[]`만 묶어주면 됨.
    - n번쨰 변수를 불러올 때 순서는 0부터 셈.
        - 2번째 값 불러오기 : `[1]`
- 변수에 값 추가
    - `배열명.push(추가할 값)`

```js
const daysOfWeek = ["월", "화", "수", "목", "금", "토"];
//월, 화, 수, 목, 금, 토의 배열인 daysOfWeek 생성


console.log(daysOfWeek);
//▸(6) ['월', '화', '수', '목', '금', '토'] 출력

console.log(dayOdWeek[2]);
//'수' 출력


daysOfWeek.push("일"); //'일' 추가

console.log(daysOfWeek);
//▸(7) ['월', '화', '수', '목', '금', '토', '일'] 출력

```

## 기본 5 - Object 객체  
- 배열과의 차이점은
    - 대괄호가 아닌 중괄호`{}`를 씀.
    - property가 존재함.
- 프로퍼티 변경
    - `오브젝트 이름.프로퍼티 이름 = 변경할 값`의 형태로 작성
- 프로퍼티 추가
    - `오브젝트 이름.추가할 프로퍼티 이름 = 추가할 값`의 형태로 작성

```js
const player = {
    name: "Haepppy",
    age: 25,
    adress: "korea",
    iPhone: true,
};

console.log(player.name);
//'Haepppy' 출력

player.age = 26;
//나이값을 26으로 변경

player.birth = 0821;
//생일값을 추가
```

## 기본 6 - Function 함수  
- 함수 생성

```js
//첫번째 방법
function sayHello(name) {
    console.log("Hello, my name is " + name);
};

//두번째 방법
let sayHello = function(name) {
    console.log("Hello, my name is " + name);
}

//사용예시
sayHello("Haein"); //'Hello, my name is Haein' 출력
```

- 응용 - 더하기 함수 만들기

```js
function plus(a, b) {
    console.log(a + b);
}

plus(2, 3); //5 출력
```

- 응용 - Object와 Function

```js
const player = {
    name: "Haepppy",
    age: 25,
    adress: "korea",
    iPhone: true,
    sayHello: function(otherName) {
        console.log("hello " + otherName + " nice to meet you!");
    },
};

player.sayHello("changsub");
//hello changsub nice to meet you! 출력
```

- 응용 - 계산기 함수 만들기

```js
const calculator = {
    add: function(a, b) {
        console.log(a + b);
    },
    minus: function(a, b) {
        console.log(a - b);
    },
    divide: function(a, b) {
        console.log(a / b);
    },
    times: function(a, b) {
        console.log(a * b);
    },
    power: function(a, b) {
        console.log(a ** b);
    },
};
```

- 로컬 변수와 글로벌 변수
    - **로컬 변수 (지역 변수)** : 함수 내에서 지정된 변수로, 함수 코드`{}` 내에서만 사용 가능함.
    - **글로벌 변수 (전역 변수)** : 함수 밖에서 지정된 변수로, 함수 내외에서 모두 사용 가능함.


## 기본 7 - Returns  
- return 없는 함수는 함수를 진행해서 도출된 결과를 돌려주지 않는다.

```js
//만나이 계산기
const age = 25;

function ageCalc (ageKr) {
    ageKr - 2;
};

const agrFore = ageCalc(age);

console.log(agrFore); //undefined 출력
```

- return은 도출된 결과를 함수 밖으로 돌려준다(반환).

```js
//만나이 계산기
const age = 25;

function ageCalc (ageKr) {
    return ageKr - 2;
};

const agrFore = ageCalc(age);

console.log(agrFore); //23 출력
```

- return문이 쓰인 값이 함수의 결과로 반환된다.

```js
//만나이 계산기
const age = 25;

function ageCalc (ageKr) {
    ageKr - 2;
    return "hello" //return한 값이 함수 자리에 반환됨.
};

const agrFore = ageCalc(age);

console.log(agrFore); //hello 출력
```

- 응용 - 계산기 함수 수정하기

```js
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    minus: function(a, b) {
        return a - b;
    },
    divide: function(a, b) {
        return a / b;
    },
    times: function(a, b) {
        return a * b;
    },
    power: function(a, b) {
        return a ** b;
    },
};
```


## 기본 8 - Conditionals 조건문 (if)  
- if(_condition_)
    - 괄호 안에 조건을 넣어 조건이 true일 경우 함수 진행
- else
    - 위 괄호 안에 조건이 false일 경우 진행할 함수 작성
- else if (_condition_)
    - 조건을 추기할 때 사용

```js
let age = parseInt( prompt("How old are you?") );

ageCalc = function() {
    if (isNaN(age)) { //괄호 안의 값이 true일 경우
        alert("Please check your age");
        age = parseInt (prompt("How old are you?") );
        ageCalc();
    } else { //false일 경우
        if (age > 19) {
            alert("You can drink!");
        } else if (age < 20) {
            alert("You can't drink!");
        };
    }; 
};

ageCalc();
```

- 괄호 안에 두가지 이상의 조건을 동시에 작성할 경우
    - `&&`: 'and'의 의미를 지님.
    - 두 조건 사이에 추가하며 두 조건이 모두 true여야 함.
        - true `&&` true = true;
        - true `&&` false = false;
        - false `&&` true = false;
        - false `&&` flase = false;
    - `||`: 'or'의 의미를 지님.
    - 두 조건 사이에 추가하며 두 조건 중 하나만 true여도 됨.
        - true `||` true = true;
        - true `||` false = true;
        - false `||` true = true;
        - false `||` flase = false;
- 등호 연산자
    - `=` : 값을 선언할 때 사용
    - `==` : 값이 같음
    - `===` : 값과 자료형이 모두 같음 (엄격)
    - `!==` : 값이 같지 않음

```js
let age = parseInt( prompt("How old are you?") );

ageCalc = function() {
    if (isNaN(age) || age < 0) { //age 값이 NaN이거나 음수일 경우
        alert("Please check your age");
        age = parseInt (prompt("How old are you?") );
        ageCalc();
    } else if (age < 19) { //age 값이 19 미만일 경우
        alert("You are too young!");
    } else if (age >= 20 && age <= 50) { //age 값이 20 이상이면서 50 이하일 경우
        alert("You can drink!");
    } else if (age > 50 && age <= 80) { //age 값이 50 미만이면서 80 이상일 경우
        alert("You should exercise!")
    } else if(age === 100) { //age 값이 100일 경우 / 스크립트가 읽히는 순서가 있으니까 위치 중요
        alert("WOW, You are wise!")
    } else if (gae > 80) { //age 값이 80 초과인 경우
        alert("You can do whatever you want!")
    }
}; 

ageCalc();
```









<br/>
<a class="button1" href="https://nomadcoders.co/javascript-for-beginners/lobby" style="float: right; margin-right: 20px" target="_blank">강의 바로가기</a>
<br/>