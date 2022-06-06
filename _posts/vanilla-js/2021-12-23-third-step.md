---
layout: single
title:  "바닐라 JS로 크롬 앱 만들기 - (4) 로그인"
folder: "vanilla-js"

categories:
    - vanilla-js
tags:
    - 인강 정리
    - 기본 개념
    - 자바스크립트
    
keywords:
    - Application_Login
    - .prevenDefault( )
    - local storage

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
    input {
        width: 20%;
        max-width: 50%;
        display: block;
    }
    input.inline {
        display: inline-block;
    }
</style>

첫인사와 로그인 화면 구현하기  

## input 태그  
사용자의 입력을 받을 수 있는 태그.  
[HTML 문서](/html/html-input-tag/)에 따로 정리함  

## .preventDefault( ) - 브라우저 기본 행동 막기  

사용자의 이름을 물어보고 그 이름을 기억해서 콘솔에 표시하기
- submit 버튼을 누르면 기본으로 브라우저가 새로고침이 된다.
- 새로고침이 되면서 값은 바로 사라지게 됨 -> 이것을 막기 위해서
- `event.preventDefault();`가 필요하다 -> 브라우저 기본 행동을 막는 함수

```html
<form id="login-form">
    <input 
    required 
    maxlength="15" 
    type="text" 
    placeholder="What is your name?" />

    <input type="submit" value="Log In" />
</form>

<script>
    const loginForm = document.querySelector("#login-form");
    const loginInput = document.querySelector("#login-form input");

    function onLoginsubmit(event) {
        event.preventDefault(); //브라우저의 기본 행동을 막아주는 함수 (ex) 새로고침)
        console.log(loginInput.value);
    };

    loginForm.addEventListener("submit", onLoginsubmit)
</script>
```

▾
<form id="login-form">
    <input
    class="inline"  
    required 
    maxlength="15" 
    type="text" 
    placeholder="What is your name?" />
    <input class="inline" type="submit" value="Log In" />
</form>

<script>
    const loginForm = document.querySelector("#login-form");
    const loginInput = document.querySelector("#login-form input");

    function onLoginsubmit(event) {
        event.preventDefault(); //브라우저의 기본 행동을 막아주는 함수 (ex) 새로고침)
        console.log(loginInput.value);
    };

    loginForm.addEventListener("submit", onLoginsubmit)
</script>

<br/>
`.addEventListener( )`는 어떠한 동작(event)을 할 때, 브라우저에서 자동으로 함수를 실행하도록 한다.  
이때, 이벤트에 대한 정보를 담고 있는 오브젝트를 만들 수 있다.  
함수를 생성할 때 인자 자리에 event (다른 이름이어도 됨) 라는 자리를 만들어두면 이벤트의 정보들을 담을 수 있다.  
<span style="color:#999">(*함수를 실행할 때 함수명( )에서 괄호는 함수를 바로 실핸한다는 뜻이다.)</span>  

```html
<a href="https://nomardcoders.co">Go to courses</a>

<script>
    const link = document.querySelector("a");

    function handleLinkClick(e) {
        e.preventDefault();
        console.dir(e); //event에 대한 정보를 object로 담아서 보여줌 (클릭시 포인터 위치 등)
    };

link.addEventListener("click", handleLinkClick);
</script>
```
▾ 콘솔창을 열고 링크를 누르면 이벤트에 대한 object가 보여진다  
<a id="test" href="https://nomardcoders.co">Go to courses</a>

<script>
    const link = document.querySelector("#test");

    function handleLinkClick(e) {
        e.preventDefault();
        console.dir(e); //event에 대한 정보를 object로 담아서 보여줌 (클릭시 포인터 위치 등)
    };

link.addEventListener("click", handleLinkClick);
</script>

## 입력된 값을 받아서 내보내기  
input 입력 필드에 이름을 적고 submit 버튼을 클릭하면  
form은 사라지고 "Hello, (유저네임)"이라는 텍스트를 보여준다.  

### HTML  
1. `<form>`안에 `<input>`태그로 입력창, 제출버튼을 생성한다.
2. 제출버튼 클릭 후 나타나는 텍스트를 위해 `<h1>`태그를 작성한다.
3. 처음에는 `<h1>`태그가 보이지 않아야 하므로 `.hidden` 클래스를 넣어준다.

### CSS  
1. `display: none;`을 가진 클래스를 만들어 요소를 숨길 때 이 클래스를 추가한다.

### JS  
1. html의 `<form>`, `<input>`, `<h1>` 그리고 "hidden"을 가진 변수를 생성한다.
2. 인자를 가진 함수를 생성한다. (버튼 클릭시 실행될 함수)
    - 브라우저의 기본 동작을 막는다.
    - 입력창의 값을 변수'userName'에 할당한다.
    - 폼 요소에 .hidden 클래스를 추가해 숨긴다.
    - h1 태그의 내용을 수정한다.
        - `"Hello, " + userName;`
        - ``Hello, ${userName}``
        - 두가지 방식 모두 똑같이 작동한다.
    - h1 태그에 있던 .hidden 클래스를 제거하여 화면에 나타나도록 한다.
3. 폼 요소를 submit할 때 위 함수가 실행되도록 `.addEventListener( )`를 작성한다.

```html
<form id="login-form">
    <input 
    required 
    maxlength="15" 
    type="text" 
    placeholder="What is your name?" />

    <input type="submit" value="Log In" />
</form>
<h1 id="greeting" class="hidden"></h1>

<style>
    .hidden {
        display: none;
    }
</style>

<script>
    const loginForm = document.querySelector("#login-form");
    const loginInput = document.querySelector("#login-form input");
    const greeting = document.querySelector("#greeting");

    const HIDDEN_CLASSANAME = "hidden"; //값이 스트링뿐인 변수이름은 대문자로만 작성하는 관습이 있다.

    function onLoginsubmit(event) {
        event.preventDefault(); //기본 동작 막기
        const userName = loginInput.value; //입력값을 userName에 저장하기
        loginForm.classList.add(HIDDEN_CLASSANAME); //폼 지우기
        console.log(userName);
        greeting.innerText = `Hello, ${userName}`; //"Hello, " + userName 이랑 같은 동작을 한다.
        greeting.classList.remove(HIDDEN_CLASSANAME);
    };

    loginForm.addEventListener("submit", onLoginsubmit);
</script>
```

▾  
<form id="login-form2">
    <input 
    required 
    maxlength="15" 
    type="text" 
    placeholder="What is your name?" />
    <input type="submit" value="Log In" />
</form>
<h1 id="greeting" class="hiddenH">해인</h1>

<style>
    .hiddenH {
        display: none;
    }
    h1#greeting {
        font-size: 20px;
    }
</style>

<script>
    const loginForm2 = document.querySelector("#login-form2");
    const loginInput2 = document.querySelector("#login-form2 input");
    const greeting = document.querySelector("#greeting");

    const HIDDEN_CLASSANAME = "hiddenH"; //값이 스트링뿐인 변수이름은 대문자로만 작성하는 관습이 있다.

    function onLoginsubmit(event) {
        event.preventDefault(); //기본 동작 막기
        const userName = loginInput2.value; //입력값을 userName에 저장하기
        loginForm2.classList.add(HIDDEN_CLASSANAME); //폼 지우기
        console.log(userName);
        greeting.innerText = `Hello, ${userName}`; //"Hello, " + userName 이랑 같은 동작을 한다.
        greeting.classList.remove(HIDDEN_CLASSANAME);
    };

    loginForm2.addEventListener("submit", onLoginsubmit);
</script>

## localStorage - 입력된 값을 브라우저에 저장하기  
**localStorage**  
- localStorage.setItem(_key_, _value_)
    - setItem은 스토리지에 값을 저장할 때 사용한다.
    - `localStorage.setItem("userNamer", "Haein");`
- localStorage.getItem(_key_)
    - getItem은 스토리지에 저장된 값을 가져올 때 사용한다.
    - `localStorage.getItem("userName");`
- localStorage.remoneItem(_key_)
    - removeItem은 스토리지에 저장된 값을 제거할 때 사용한다.
    - `localStorage.removeItem("userName");`
- <span class="highlight_gray">개발자 도구의 Application - Storage - Local Storage</span> 에서 스토리지 내용을 확인할 수 있다. 

## 새로고침 후에 표시될 내용  
form을 보여주고 이벤트를 실행하기 전에 storage를 확인하고 form을 보여줄지, greeting을 보여줄지 결정한다.  
- storage에 유저 정보가 없으면 - form을 보여줌
- storage에 유저 정보가 있으면 - greeting을 보여줌

### 1. local storage 정보 유무 확인하기  
`localStorage.getItem("username")`을 실행했을 때 값이 없다면 null을 반환한다는 점을 이용한다.  
`localStorage.getItem("username")`를 변수에 할당한다.

### 2. if문으로 유무에 따른 함수 실행하기  
storage에 유저 정보가 없다면 (null) form을 보여주고, 있다면 greeting을 보여준다.  
- 그러기 위해서 일단 form요소와 greeting요소에 모두 <span class="highlight_violet">.hidden 클래스</span>를 추가하여 숨기고 시작한다.
    - if문에서 .hidden 클래스를 지우면서 나타나게 함.

```js
const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
    //show the form
    loginForm.classList.remove(HIDDEN_CLASSANAME);
    loginForm.addEventListener("submit", onLoginsubmit);
} else {
    //show the greeting
    greeting.innerText = `Hello, ${savedUserName}`; //스토리지에 저장된 정보를 변수로 가져온다.
    greeting.classList.remove(HIDDEN_CLASSANAME); 
}
```

### 3. 코드 정리하기  
- 두번 이상 사용된 코드는 함수로 지정해주는 것이 편리하다.  

```js
function paintGreeting(username) { //두번 이상 쓰이는 식을 함수로 지정한다.
    greeting.innerText = `Hello, ${username}`;
    greeting.classList.remove(HIDDEN_CLASSANAME);
};
```

- 두번 이상 사용되는 string은 변수로 할당하는 것이 편리하다.
    - string에 오타가 나는 것은 콘솔창에서 경고해주지 않지만 변수에 오타가 나는 것은 경고를 해줌으로써 오탈자 찾기 및 수정이 더 수월하기 때문이다.
    - 값이 string뿐인 변수는 변수명을 대문자로만 작성하는 관습이 있다.

```js
const HIDDEN_CLASSANAME = "hidden";
const USERNAME_KEY = "username";
```

- 최종적으로 완성된 코드 :

```js
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSANAME = "hidden"; //값이 스트링뿐인 변수이름은 대문자로만 작성하는 관습이 있다.
const USERNAME_KEY = "username";

function onLoginsubmit(event) {
    event.preventDefault(); //기본 동작 막기
    const userName = loginInput.value; //입력값을 userName에 할당하기
    localStorage.setItem(USERNAME_KEY, userName); //storage에 유저 정보를 저장
    loginForm.classList.add(HIDDEN_CLASSANAME); //폼 지우기
    paintGreeting(userName); //입력된 값을 가져와 인자로 지정
};

function paintGreeting(username) { //두번 이상 쓰이는 식을 함수로 지정
    greeting.innerText = `Hello, ${username}`;
    greeting.classList.remove(HIDDEN_CLASSANAME);
};

const savedUserName = localStorage.getItem(USERNAME_KEY); //storage의 정보를 가져와 변수에 할당

if (savedUserName === null) {
    //show the form
    loginForm.classList.remove(HIDDEN_CLASSANAME);
    loginForm.addEventListener("submit", onLoginsubmit);
} else {
    //show the greeting
    paintGreeting(savedUserName); //스토리지의 값을 가져와 인자로 지정
}
```

▾ 새로고침을 해도 greeting이 유지된다. (개발자 도구에서 storage 세팅 가능)  
<form id="login-form3" class="hidden">
    <input   
    required 
    maxlength="15" 
    type="text" 
    placeholder="What is your name?" />
    <input type="submit" value="Log In" />
</form>
<h1 id="greeting2" class="hidden"></h1>

<script>
    const loginForm3 = document.querySelector("#login-form3");
    const loginInput3 = document.querySelector("#login-form3 input");
    const greeting2 = document.querySelector("#greeting2");

    const HIDDEN_CLASSANAME2 = "hidden"; //값이 스트링뿐인 변수이름은 대문자로만 작성하는 관습이 있다.
    const USERNAME_KEY = "username";

    function onLoginsubmit(event) {
        event.preventDefault(); //기본 동작 막기
        const userName = loginInput3.value; //입력값을 userName에 할당하기
        localStorage.setItem(USERNAME_KEY, userName); //storage에 유저 정보를 저장
        loginForm3.classList.add(HIDDEN_CLASSANAME2); //폼 지우기
        paintGreeting(userName); //입력된 값을 가져와 인자로 지정
    };

    function paintGreeting(username) { //두번 이상 쓰이는 식을 함수로 지정
        greeting2.innerText = `Hello, ${username}`;
        greeting2.classList.remove(HIDDEN_CLASSANAME2);
    };

    const savedUserName = localStorage.getItem(USERNAME_KEY); //storage의 정보를 가져와 변수에 할당

    if (savedUserName === null) {
        //show the form
        loginForm3.classList.remove(HIDDEN_CLASSANAME2);
        loginForm3.addEventListener("submit", onLoginsubmit);
    } else {
        //show the greeting
        paintGreeting(savedUserName); //스토리지의 값을 가져와 인자로 지정
    }
</script>