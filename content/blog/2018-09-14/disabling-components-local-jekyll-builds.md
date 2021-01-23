---
title: Disabling Components on Local Jekyll Builds
description: Simple, yet powerful, technique to enable or disable specific website content on Jekyll-powered websites.
tags: ["Jekyll", "Blog"]
thumbnail: jekyll.png
date: 2018-09-14
redirect_from:
  - /blog/2018/09/14/disabling-adsense-analytics-and-disqus-on-local-jekyll-builds/
---

This post documents a simple, yet powerful, technique to enable or disable specific website content on Jekyll-powered websites. 

## Contents

```toc
```

## Introduction

The main reason I wanted to do enable/disable specific content on my Jekyll blog was to disable Google Adsense content when building and developing my Jekyll powered website. Google Analytics has an option to ignore user-specified IP addresses of development systems, but Google Adsense does not. Therefore, I wanted a simple and quick solution to remove the Google Adsense code from my local build while keeping the code when the website was deployed to GitHub pages. The solution: setting the Jekyll build environment and ignoring specific website content using conditional (if) statements.

According to the [Jekyll documentation on Environments](https://jekyllrb.com/docs/configuration/environments/), you can configure the arguments given to the `build` or `serve` commands to include the Jekyll environment. When you build or serve a Jekyll website, you can use conditional statements (`if` statements) to enable or disable specific code depending on the environment. Simply put, you can set the Jekyll _environment_ when building or serving Jekyll to include, or exclude different content in your website. For example, the Jekyll documentation uses the following example:

```liquid
{% if jekyll.environment == "production" %}
   {% include disqus.html %}
{% endif %}
```

This statement is quite straight-forward. The `jekyll.environment` variable is checked to see if it is equal to `production`... if it is, then the `disqus.html` HTML code is included the generated page. If the environment is not production, the `disqus.html` is simply not included. To put this example into a real-world context: you can enable Disqus comments to only be included on a Jekyll website when the environment is set to production.

This leaves a major question... _How can you set the Jekyll environment?_. There is a variable called `JEKYLL_ENV` that can be set in the build, or serve, command. For example, a common command to build a Jekyll website is:

```none
jekyll build
```

If you want to set the Jekyll build environment to production, you can include the `JEKYLL_ENV` variable with the build command, for example:

```none
JEKYLL_ENV=production jekyll build
```

There are two commonly used values for the `JEKYLL_ENV` variable, which are self-explanatory by the naming convention:

- `production`
- `development`

## Default Jekyll Environment Values

So far we have discussed how to set the Jekyll environment and some basic examples of how it can be used to enable or disable content in your Jekyll-powered website. However, a key consideration is to determine the default Jekyll environment value. 

The official Jekyll documentation states that **the default value for `JEKYLL_ENV` is development**. So, if you build, or serve, a Jekyll-powered website, the environment value will always be `development`. This means that you have to explicitly set the environment value to `production` if you want to build, or serve, the Jekyll website in production mode.

However, in some scenarios, you will not have full control over the Jekyll environment value. A great example is GitHub pages, where the default value for `JEKYLL_ENV` is `production`.

- **Lesson learned:** The default Jekyll environment is `development`

- **Lesson learned:** The default Jekyll environment on GitHub pages is `production`

I always like code snippets when reading about some sort of configuration or setting. So I have provided a collection of examples of how to use the Jekyll environment to enable or disable specific website content. I have included an example for Google Analytics, Google Adsense and Disqus Comments.

## Disabling Google Analytics in Local Jekyll Development

Although you can disable Google Analytics data collection from specific IP addresses, it still makes sense to disable the service on your development build. For example, you may have a dynamic IP address from your ISP, or you may develop your website from multiple locations and it can become cumbersome to add numerous IPs to the Analytics filter. The code below displays an example of how to enable Google Analytics only on the production environment.

```liquid
{% if jekyll.environment == "production" %}
<script type="text/javascript">
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-000000-1', 'auto');
  ga('send', 'pageview');
</script>
{% endif %}
```

In the above example, not how we place the entire Google Analytics script inside the Liquid `if` statement. This script will only be included when the environment is set to production.

## Disabling Google Adsense in Local Jekyll Development

Disabling Google Adsense is where setting the Jekyll environment really shines. There are no configuration options available in Adsense to turn off tracking/monitoring on local builds, or no option to disable specific IP addresses of development systems. The code snippet below illustrates pretty much the same solution as seen in the previous example used for disabling Google Analytics.

```liquid
{% if jekyll.environment == "production" %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-0000000000000000",
    enable_page_level_ads: true
  });
</script>
{% endif %}
```

## Disabling Disqus Comments in Local Jekyll Development

Again, we can see a very similar solution to disabling Disqus comments in a development build environment. However, I do not find this as useful, as there is no real negative effect to loading Disqus comments of a non-production environment. 

```liquid
{% if jekyll.environment == "production" %}
<script type="text/javascript">
  /* * * CONFIGURATION VARIABLES * * */
  var disqus_shortname = 'websiteshortname';
  var disqus_identifier = '{{ page.id }}';
  /* * * DON'T EDIT BELOW THIS LINE * * */
  (function() {
    {% if page.include_comments.embed or layout.include_comments.embed %}
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    {% endif %}
    {% if page.include_comments.count or layout.include_comments.count %}
      var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
      s.src = '//' + disqus_shortname + '.disqus.com/count.js';
      (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
    {% endif %}
  })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
{% endif %}
```

## Conclusion

I hope you found this post useful and informative. The main thing I learned during researching and implementing this solution was that the default Jekyll environment is development, and the default GitHub pages Jekyll environment is production. This makes it exceptionally easy to enable or disable specific website content. If you have any feedback, questions or clarifications, please leave a comment below. Thanks!
