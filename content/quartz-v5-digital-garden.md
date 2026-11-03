---
title: "Quartz v5 and Obsidian: Building a Digital Garden from Markdown Notes"
date: 2026-09-23
description: "Thoughts on Quartz v5, how it pairs with Obsidian, why it's worth using and what I learned building kb-template-quartz to spin up note sites fast."
tags:
  - Quartz
  - Obsidian
  - Digital Garden
lang: en
publish: true
---

I take notes in Markdown with **Obsidian**, and I have always wanted to put some of them on the web without moving to another platform. **Quartz v5** solves exactly that problem. After using it for a while, I packaged my setup into my own template called `kb-template-quartz`. This post covers Quartz, how it relates to Obsidian, why I picked v5 and what I learned along the way.

---

## What are Quartz and Obsidian?

- **Obsidian** is a note-taking app built on plain Markdown files that live on your machine. Its strengths are Wikilinks (`[[Note Name]]`), backlinks and a graph view that turn your notes into a connected web of knowledge.
- **Quartz** is an open-source Static Site Generator (SSG) that turns a folder of Markdown into a website. It understands Obsidian syntax out of the box, so you rarely need to edit notes before publishing.
- **Digital Garden** is the term for a site where notes are grown over time and cross-linked, instead of blog posts that are published once and left alone.

The two tools complement each other: **Obsidian for writing, Quartz for publishing**.

**Where Quartz comes from:**

- Original repo: [github.com/jackyzha0/quartz](https://github.com/jackyzha0/quartz)
- Official site and docs: [quartz.jzhao.xyz](https://quartz.jzhao.xyz)

---

## What stands out in Quartz v5?

Version 5 was re-architected around three ideas:

1. **A plugin ecosystem:** the core is lighter and features are split into independent plugins, added with `npx quartz plugin add`.
2. **YAML configuration:** basic settings such as theme, fonts and the plugin list live in `quartz.config.yaml`, so you no longer have to edit TypeScript for everyday changes.
3. **Strong Obsidian compatibility:** Wikilinks, Callouts, Highlights (`==text==`), Comments (`%%comment%%`), Block references (`^block-id`), Mermaid, Canvas and tags all work.

---

## Why use Quartz v5?

### Pros

- **Fast and light:** the output is static HTML with minimal JS, so page transitions feel like a SPA.
- **No lock-in:** your content is plain Markdown, which means full **Data Ownership**.
- **Solid knowledge-base features:** full-text search, Graph View, Popover Preview, Backlinks and LaTeX.
- **Free:** you can host it on GitHub Pages, Cloudflare, Netlify or Vercel at no cost.
- **Responsive:** Dark/Light mode is built in and it works well on mobile.

### Cons to consider

- **Git and CLI basics required:** you need Node.js (v22+) and a few commands such as `git clone` and `npx quartz build`.
- **Deep customization still needs code:** a fully custom look or your own plugins call for HTML/CSS/TypeScript.
- **No CMS:** there is no `/admin` page, so you write in Obsidian or VS Code and push to Git.

---

## From vanilla Quartz to `kb-template-quartz`

After setting up Quartz v5 a few times, I noticed I was repeating the same steps for every new notes site: clone, edit `quartz.config.yaml`, set up deployment and decide on a folder convention. So I turned it into a **template repo**, `kb-template-quartz`, where a new site is one "Use this template" click away.

**Decisions I locked into the template:**

- **Configuration in one place (`quartz.config.yaml`):** site name, theme and plugins can change without touching code.
- **Explicit publish:** only notes with `publish: true` in their frontmatter show up on the site. This prevents accidentally publishing drafts or private notes. I learned this the hard way when I forgot the line and a post never appeared, which is exactly why the convention is written down.
- **Repo naming convention:** `web-<name>` for sites and `kb-<name>` for knowledge bases. The Cloudflare Worker name stays shorter (for example `notes`).
- **Topic-based folders:** for example lifestyle and study, with finance planned next, so the structure grows without reshuffling.
- **Separated roles between sites:** technical content lives in Posts on my profile site while the notes site focuses on lifestyle and study. Some overlap is fine.

From this template I created `kb-my-notes`, my notes site running on Cloudflare Workers.

**My template repo:** [github.com/thaonbt/kb-template-quartz](https://github.com/thaonbt/kb-template-quartz)

---

## Lessons learned

- **Write first and polish later:** let Obsidian handle writing and linking while Quartz is just the publishing step. Don't tweak the look too early.
- **Check frontmatter first when a post is missing:** with explicit publish, a missing `publish: true` is the most common cause.
- **Use just enough plugins:** every plugin is something to maintain, so enable only what you need.
- **Test locally before deploying:** run `npx quartz build` to catch problems early, especially after changing config or updating plugins.
- **Keep the template separate from content:** a template without personal notes gives every new site a clean start.

---

## Who is Quartz v5 for?

- **Obsidian users** who want to share a Digital Garden without paying for Obsidian Publish.
- **Developers, students and researchers** who need a home for cheat-sheets, study notes and formulas.
- **Minimalist writers** who want to focus on Markdown without running a database or server.

---

## Quick start

1. To learn plain Quartz, read the docs at [quartz.jzhao.xyz](https://quartz.jzhao.xyz) and clone the original repo with `git clone https://github.com/jackyzha0/quartz.git` (Node.js v22+ required).
2. To take the shortcut I use, start from `kb-template-quartz` and adjust `quartz.config.yaml` to your needs.
3. Add `publish: true` to the frontmatter of any note you want live, then push to Git to deploy.

---

## Final thoughts

Quartz v5 gives me a short path from an Obsidian vault to a public website at almost no cost and with full control over my data. `kb-template-quartz` is how I turned what I learned into a repeatable workflow. If you are thinking about putting your notes on the web, give Quartz an afternoon. The result might surprise you.
