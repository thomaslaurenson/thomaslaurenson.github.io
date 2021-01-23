---
title: Building a Jekyll-powered blog for GitHub pages
description: Some lessons learned and a discussion of using Jekyll to build a blog, and hosting it on GitHub pages.
tags: ["Blog", "Jekyll", "Tutorial"]
thumbnail: jekyll.png
date: 2018-06-30
redirect_from:
  - blog/2018/06/30/building-a-new-Jekyll-powered-blog-for-GitHub-pages/
---

## Contents

```toc
```

## Introduction

Throughout my life, I have started and half-accomplished making a blog on various occasions. I dabbled with WordPress... I didn't like it. I tried Blogger... again, I couldn't really get into it. I built my own static website with a blog and the maintenance was horrific! I guess that should have come as no surprise. There just didn't seem to be a platform that I could really sink my teeth into. This changed when I discovered [Jekyll](https://jekyllrb.com/).  

The Jekyll platform really made sense to me. It was also fun to tinker with! But the best thing was writing in Markdown, a technology that was first [release in 2004](https://daringfireball.net/projects/markdown/), and something I only discovered in 2016-ish. It seemed to take all the hassle out of writing HTML. And it suddenly seemed to be everywhere. I was writing Markdown in GitHub repository README.md files and constantly using it on Slack to format messages for the sanity of everyone. It was so simple and easy, with great formatting to boot. I took the plunge and developed a simple personal website using the Jekyll framework and GitHub pages as a host. It was supposed to be simple, and it was. I selected a default theme, [Midnight](https://github.com/pages-themes/midnight), and performed some basic customization.

I ran with this for a while, but it was time to change. I mean, it is not exactly a piece of art and greatly lacked functionality. The most important thing, it had no blog. I recently had some free time during the semester break and decided to update my online presence. My primary goals where:

- A simple, elegant and sleek personal website
- The website should have a blog
- The blog should support comments
- The blog must be simple to deploy new content

## Choosing a Framework

The title of this blog is a giveaway. I ended up selecting Jekyll and hosting on GitHub pages. However, this solution was not selected without due consideration. I dabbled with [Hugo](https://gohugo.io/) when building the [Internet of Things Dunedin](https://bit-project-sites.pages.op-bit.nz/iot/) project website, and quite enjoyed it. However, I wanted to host the website on GitHub. [Hugo can be hosted on GitHub](https://gohugo.io/hosting-and-deployment/hosting-on-github/), but it doesn't automatically build and deploy the _site_. This was the primary reason for finally selecting Jekyll.

Although I have decent web development skills (when really required), I didn't want to build the site from the ground up. I mean why should I re-invent the wheel when it has been done countless times. 

I somehow stumbled on a simple website and blog combo that I liked, designed by [Yevgeniy Brikman](https://www.ybrikman.com/) authored in Jekyll specifically for GitHub. The style was simple and elegant. Perfect! After a quick investigation, Yevgeniy's [web site code](https://github.com/brikis98/yevgeniy-brikman-homepage) is open source, licensed under a BSD License. 

## Building Jekyll Websites Locally

Building a Jekyll-powered website is relatively simple. It is so simple, that you do not have to build locally, and can push code to a GitHub repository (configured with GitHub pages) and the website will build itself. However, there can be bugs in the build process which can be hard to troubleshoot. From my experience, it is much simpler to build the website locally and faster to troubleshoot and add new content.

- **Lesson learned:** Build Jekyll websites locally!

Although I primarily use Linux, I do have Microsoft Windows 10 installed for gaming and Office. I initially attempted to build my Jekyll website on Windows using Git-SCM and Ruby. This did not go well! I struggled with a variety of dependency issues and gem version issues, primarily with the `nokogiri` gem. After struggling for a while, I switched to my home Ubuntu Linux server to set up a Jekyll build environment and experienced no issues. 

- **Lesson learned:** Build Jekyll websites on Linux!

The setup process to build Jekyll websites on Linux is quite simple. The [full instructions are provided by Jekyll](https://jekyllrb.com/docs/installation/) for Linux, Windows and OS X. Firstly, Ruby development version is required as well as the build essential package (which contains C/C++ compilers and tools). [Bundler](https://bundler.io/) is also required, which provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed.

The steps and required commands are outlined below:

- Install some dependencies:
    - `sudo apt install ruby ruby-dev build-essential`
- Install the bundle tool:
    - `gem install jekyll bundler`
- Run the bundle tool:
    - `bundle install`
- Build the website and serve it locally:
    - `bundle exec jekyll serve`

You should see output similar to that displayed below:

```
Configuration file: /home/thomasl/thomaslaurenson.github.io/_config.yml
Configuration file: /home/thomasl/thomaslaurenson.github.io/_config.yml
            Source: /home/thomasl/thomaslaurenson.github.io
       Destination: /home/thomasl/thomaslaurenson.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 1.199 seconds.
 Auto-regeneration: enabled for '/home/thomasl/thomaslaurenson.github.io'
Configuration file: /home/thomasl/thomaslaurenson.github.io/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

Now the site will be built and available on port 4000 on the localhost. Basically, you can open a web browser and view the website using the following address: `http://127.0.0.1:4000/`.  Furthermore, the built site will be in the `_site` directory. You can browse this directory and see the *compiled* website consisting of HTML files that have been converted from Markdown.

Some other useful build and serve commands are:

- Build the website and serve it on the local network:
    - `bundle exec jekyll serve --host 192.168.1.5`
    - The IP address in the above example is the system where the Jekyll page is being built. In my case, it was my Ubuntu Linux server.
- Only build changes made since the last build:
    - `bundle exec jekyll serve --incremental`

This was only a quick summary of the new personal website/blog that I have set up, not a full tutorial on setting up and deploying a Jekyll-powered website. There are many resources already available for this. I feel the takeaway of this post is to see the power of Jekyll for building static websites and blogs easily, not to build locally on Windows and to build, test and develop locally!
