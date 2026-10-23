<p align="center">
  <a href="https://mahtabnihar.com">
    <img alt="Live site" src="https://img.shields.io/badge/Live_site-mahtabnihar.com-111111?style=for-the-badge&logo=safari&logoColor=white">
  </a>
  <a href="https://github.com/mahtabnihar/portfolio">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-mahtabnihar%2Fportfolio-18181b?style=for-the-badge&logo=github&logoColor=white">
  </a>
  <a href="https://sweez.xyz">
    <img alt="Sweez" src="https://img.shields.io/badge/Sweez-sweez.xyz-3B82F6?style=for-the-badge">
  </a>
  <a href="./LICENSE">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT-3f3f46?style=for-the-badge">
  </a>
</p>

<h1 align="center">Mahtab Nihar</h1>

<p align="center">
  Founder of <a href="https://sweez.xyz">Sweez</a>. I build software and the company around it.<br>
  This repository is the source of my personal site: home, notes, projects, and a booking page.
</p>

<p align="center">
  <a href="https://mahtabnihar.com"><strong>Open the live website</strong></a>
  &nbsp;·&nbsp;
  <a href="https://mahtabnihar.com/#book">Book a call</a>
  &nbsp;·&nbsp;
  <a href="mailto:hi@mahtabnihar.com">hi@mahtabnihar.com</a>
</p>

<p align="center">
  <a href="https://github.com/mahtabnihar">GitHub</a>
  &nbsp;·&nbsp;
  <a href="https://www.linkedin.com/in/mahtabnihar">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="https://x.com/MahtabNihar">X</a>
  &nbsp;·&nbsp;
  <a href="https://www.instagram.com/mahtabnihar">Instagram</a>
  &nbsp;·&nbsp;
  <a href="https://www.youtube.com/@mahtabnihar">YouTube</a>
</p>

---

## The site

[mahtabnihar.com](https://mahtabnihar.com) is a Next.js portfolio. Fork it if you want the same structure for your own name, writing, and work.

| Page     | Address                                       | What it is                                                       |
| -------- | --------------------------------------------- | ---------------------------------------------------------------- |
| Home     | [/](https://mahtabnihar.com/)                 | Introduction, companies, selected projects, and a 15-minute call |
| Notes    | [/blog](https://mahtabnihar.com/blog)         | Writing, newest first, with tags and search                      |
| Projects | [/projects](https://mahtabnihar.com/projects) | Case studies linked from the homepage                            |
| Tags     | [/tags](https://mahtabnihar.com/tags)         | Every topic used in the notes                                    |

The interface follows the system theme, with a glass navigation bar, a soft animated background, and headings that settle into place as you move down the page.

## Stack

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-12-000000?style=flat-square&logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-17-149ECA?style=flat-square&logo=react&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="MDX" src="https://img.shields.io/badge/MDX-notes-F9AC00?style=flat-square&logo=mdx&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white">
</p>

Notes are MDX files. Project cards are one JavaScript list. Both are read when the site builds, so a new file is on the site after the dev server refreshes or you deploy.

## Use this repository

You need [Node.js 18](https://nodejs.org/) or newer, and npm.

```bash
git clone https://github.com/mahtabnihar/portfolio.git
cd portfolio
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

| Command         | What it does                                |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start the local site                        |
| `npm run build` | Build the static site and write the sitemap |
| `npm run serve` | Serve the production build                  |
| `npm run lint`  | Check the JavaScript                        |

To publish your own copy, change the identity first, then deploy the build to Vercel or any host that runs Next.js. The live site for this repository is [mahtabnihar.com](https://mahtabnihar.com).

## Make it yours

Almost every public detail lives in [`data/siteMetadata.js`](data/siteMetadata.js): name, description, site URL, email, social profiles, and the Cal.com link used by the booking section.

Navigation labels are in [`data/headerNavLinks.js`](data/headerNavLinks.js). The homepage introduction is in [`pages/index.js`](pages/index.js). Replace the portrait at `public/static/images/myphoto.png` and the mark at `public/static/images/logo.png`.

Copy [`.env.example`](.env.example) to `.env.local` only if you turn on comments or a newsletter. The site runs without those keys.

## Write a note

A note is a Markdown file under `data/blog/`. The Notes page lists every file that is not a draft, newest date first.

The address follows the file path:

- `data/blog/sweez-launch.mdx` becomes `/blog/sweez-launch`
- `data/blog/projects/sweez.mdx` becomes `/blog/projects/sweez`

Start the file with this header, then write the note underneath:

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
```

Set `draft: true` while the piece is still private. Drafts stay off the Notes list and out of the tag pages.

Put images in `public/static/images/` and refer to them as `/static/images/...`.

## Add a project

A project card is an entry in [`data/projectsData.js`](data/projectsData.js). The homepage and the Projects page both render that list.

```js
{
  title: 'Sweez',
  description: 'Software, SaaS, and automation for growing businesses.',
  imgSrc: '/static/images/projects/sweez.png',
  href: '/blog/projects/sweez',
}
```

The card is the preview. The long write-up is a note, and `href` points at that note. A project with no write-up yet can use `href: ''`, and the card will not link anywhere.

## A database later

The pages already load their content in one place: notes from the files in `data/blog/`, project cards from `data/projectsData.js`. A database can replace those two reads and return the same fields.

- A note needs `title`, `date`, `summary`, `tags`, and the body.
- A project card needs `title`, `description`, `imgSrc`, and `href`.

The pages would not need a new layout. Until a database exists, adding a file is the way to publish.

## License

This project is [MIT](LICENSE) licensed. It started from [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) by [Timothy Lin](https://github.com/timlrx), and the layout, motion, and content have been rebuilt for this site.

<p align="center">
  <a href="https://mahtabnihar.com"><strong>mahtabnihar.com</strong></a>
</p>
