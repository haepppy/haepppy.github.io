---
layout: archive
permalink: study
title: "잊지 말아야 할 기록"

author_profile: true
sidebar:
    nav: "side"
---

{% assign posts = site.categories.jekyll %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}