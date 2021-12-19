---
layout: single
permalink: /about/
title: "About Me"

author_profile: true
sidebar:
    nav: "side"
---

{% assign posts = site.categories.about %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}