---
layout: post
title:  "Assignment 1 questions"
comments: true
date:   2016-11-14 18:00

categories: jekyll update
---

<h3>What do you think of pre-compiling your CSS?</h3>

Pre-compiling CSS is really an extraordinary tool, that should be used by everyone, in my opinion.
It makes the styling so much easier to understand and maintain. And the best of all, you do not have to repeat yourself all the time.
It gives it much more elegance to the code, and you do not need to maintain an unlimited rows on code, but instead it is much easier.
For example, regular CSS would require you to make separate pixels for a border, and lets say you want to re-use this exact same border for another image, or maybe text?
Well, with CSS you need to copy paste the code over and over, and then if you realize that the border should've been blue instead of white.. have fun changing 100 rows of code.
With pre-compiled CSS you make variables, for example "border-color", and if you add that to 100, or 1000 different objects, you only have to change the 1 variable to change all colors.

<h3>What do you think of static site generators?</h3>

SSGs are good if you're making a site that isn't too complex, but rather a site that you want to present something shorter.
Example, if I have developed an application, and I want it to have a simple but elegant layout, I would use a SSG.
It is simple to input loads of content into it, without adding to much coding work once you're set up.
The site looks very professional and advanced when it remains the same across the different pages.

<h3>What is robots.txt and how have you configure it for your site?</h3>

Robots.txt is a file that robots refer to when they want to know which areas of your site they are allowed to access.
Let us say you have a page for introducing yourself, and you do not want the page to come up when people google your name, you can disallow robots from reading that area of your page.

I configured my robots.txt so that robots are only allowed to access my index page and not the blog posts, or about etc.

<h3>What is humans.txt and how have you configure it for your site?</h3>

Humans.txt is a document containing information about the developers of site, to acknowledge them and give them public recognition.
I wrote my name and email address in mine.

<h3>How did you implements comments to blog posts?</h3>

I used disqus, mainly because it was the recommended one, but also after some research, it had the greatest ratings out of all commenting-tools.
I basically followed the guide on disqus.com on how to add comments and set it up properly!

<h3>What is Open Graph and how do you make use of it?</h3>

It is meta-tags that make it so you can properly share your page onto other pages, giving it a good description, image etc.
E.g on facebook, if I share it, instead of it just being a link, there will be a title, a small description and an image.
I added the name of the page, a small description and a funny image, just as a test.

This is how mine will present itself:
<img src="http://i.imgur.com/rbzODJK.png?1">



{% if page.comments %}
<div id="disqus_thread"></div>
<script>

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
/*
var disqus_config = function () {
this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = DAVID;
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = '//dl222is.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
{% endif %}

