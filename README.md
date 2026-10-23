# How to write projects and notes

Projects and notes are files in the repo. The site reads them when it builds, so a new file shows up after the dev server refreshes or you deploy.

## Notes

A note is a Markdown file under `data/blog/`. The Notes page (`/blog`) lists every file there that is not a draft, newest date first.

The address is the file path:

- `data/blog/sweez-launch.mdx` becomes `/blog/sweez-launch`
- `data/blog/projects/sweez.mdx` becomes `/blog/projects/sweez`

Start the file with this header, then write normal Markdown underneath:

```md
---
title: Why I started Sweez
date: '2026-10-23'
tags: ['Sweez', 'Product']
draft: false
summary: 'One sentence that shows up on the Notes list.'
images: ['/static/images/projects/sweez.png']
---

The first paragraph is the note.

## A section

**Bold**, lists, and links work.
```

Set `draft: true` while you are still writing. Drafts stay off the Notes list.

Put images in `public/static/images/` and refer to them as `/static/images/...`.

## Projects

A project card is an entry in `data/projectsData.js`. That file is what the homepage and the Projects page render. Each card needs a title, a short description, an image, and a link:

```js
{
  title: 'Sweez',
  description: 'Software, SaaS, and automation for growing businesses.',
  imgSrc: '/static/images/projects/sweez.png',
  href: '/blog/projects/sweez',
}
```

The card is the preview. The long write-up is a note, and `href` points at that note. A project with no write-up yet can use `href: ''` and the card will not link anywhere.

## A database later

The pages already load their content in one place: notes from the files in `data/blog/`, project cards from `data/projectsData.js`. A database can replace those two reads and return the same fields.

- A note needs `title`, `date`, `summary`, `tags`, and the body.
- A project card needs `title`, `description`, `imgSrc`, and `href`.

The pages would not need a new layout. Until a database exists, adding a file is the way to publish.
