---
layout: archive
permalink: categories/study
title: "잊지 말아야 할 기록"

author_profile: true
sidebar:
    nav: "side"
---

{% assign posts = site.categories.study %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}