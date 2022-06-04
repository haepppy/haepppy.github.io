---
layout: archive
permalink: categories/design/
title: "DESIGN"

author_profile: true
sidebar_main: true
sidebar:
    nav: "side"
---

{% assign posts = site.categories.design %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
