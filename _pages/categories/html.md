---
layout: archive
permalink: categories/html
title: "HTML"

author_profile: true
sidebar_main: true
sidebar:
    nav: "side"
---

{% assign posts = site.categories.html %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
