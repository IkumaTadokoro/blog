import fs from 'fs'
import { Feed } from 'feed'
import { getAllPosts } from './api'
import markdownToHtml from './markdownToHtml'

export default async function generateRssFeed() {
  const baseUrl = 'https://ikuma-t.work'
  const date = new Date()
  const author = {
    name: 'ikuma-t',
    email: 'tadokorodev@gmail.com',
    link: 'https://ikuma-t.work'
  }

  const feed = new Feed({
    title: 'ikuma-t',
    description: 'ikuma-tのプログラミングや生活に関する記録',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: `${baseUrl}/assets/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: author,
  })

  const posts = getAllPosts([
    'slug',
    'title',
    'date',
  ])

  for (const post of posts) {
    const url = `${baseUrl}/posts/${post.slug}`
    const content = await markdownToHtml(post.content || '')

    feed.addItem({
      title: post.title,
      date: new Date(post.date),
      id: url,
      link: url,
      content: content,
    })
  }

  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}
