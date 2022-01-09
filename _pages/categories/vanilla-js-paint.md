---
layout: archive
permalink: categories/vanilla-js-paint/
title: "Vanilla JS로 그림판 만들기"

author_profile: true
sidebar_main: true
sidebar:
    nav: "side"
---
<style>
    .archive {
        position: relative;
    }
    .linkBtn {
        position: absolute;
        top: 0; right: 200px;
    }
    .linkBtn a {
        display: block;
        font-size: 14px;
        padding: 0 15px;
        background: #ddd;
        color: #333;
        box-sizing: border-box;
    }
    .linkBtn a:hover {
        background: #bbb;
    }
    @media screen and (max-width: 1023px) {
        .linkBtn {
            right: 0px;
        }
    }
</style>

<div class="linkBtn">
    <a href="https://nomadcoders.co/javascript-for-beginners-2/lobby">강의 바로가기</a>
</div>

{% assign posts = site.categories.vanilla-js-paint %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}