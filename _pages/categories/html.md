---
layout: archive
permalink: html
title: "HTML"

author_profile: true
sidebar:
    nav: "side"
---

{% assign posts = site.categories.jekyll %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}