---
layout: archive
permalink: categories/diary/
title: "잊고 싶지 않은 기록"

author_profile: true
sidebar_main: true
sidebar:
    nav: "side"
---

{% assign posts = site.categories.diary %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
