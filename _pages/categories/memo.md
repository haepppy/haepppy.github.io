---
layout: archive
permalink: categories/memo
title: "MEMO"

author_profile: true
sidebar_main: true
sidebar:
    nav: "side"
---

{% assign posts = site.categories.memo %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}