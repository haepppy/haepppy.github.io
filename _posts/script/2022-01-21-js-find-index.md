---
layout: single
title:  "findIndex(), 객체 배열에서 원하는 값 찾기"
folder: "script"

categories:
    - script
tags:
    - 인강 정리
    - 기본 개념
    - Application_Weather

author_profile: true
sidebar:
  nav: "side"
related: false

toc: true
toc_label: "목록"
toc_icon: "star"
toc_sticky: true
---

## .findIndex( )  
배열에서 주어진 <u>함수</u>를 만족하는 <u>첫번째 인덱스</u>를 찾아 반환한다.

## 의도  
새로고침을 하거나 창을 닫았다가 다시 열어도 체크된 체크박스는 유지될 수 있도록 투두리스트의 체크박스 체크 여부를 스토리지의 toDos 배열 속 각 리스트를 의미하는 객체에 저장해야했다.  
1. 스토리지에 저장되는 배열 속 객체의 프로퍼티는  
    {text: 리스트 내용  
    id: 해당 li 태그의 아이디와 동일한 id  
    checkedId: 해당 체크박스의 아이디와 동일한 id  
    checked: 체크박스의 체크 여부}  
2. 객체의 프로퍼티 중 checkedId 값을 비교하고 해당 객체의 다른 프로퍼티의 접근해야한다.  

## 결과  

- `let index = toDos.findIndex(i => i.checkedId === thisCheckedId);`
    - 찾고자 하는 객체 인덱스 찾기
- `let obj = toDos[index];`
    - 배열에서 인덱스에 해당하는 객체를 변수에 지정하기
- checked의 값을 원하는 대로 변경하고 다시 로컬 스토리지에 저장하기

```js
function checkedI(e) {
    let thisCheckedId = parseInt(e.target.id);
    let index = toDos.findIndex(i => i.checkedId === thisCheckedId);
    let obj = toDos[index];
    const trueValue = true;
    const falseValue = false;
    if (obj.checked) {
        obj.checked = falseValue
    } else {
        obj.checked = trueValue;
    }
    saveToDos();
};
```