import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../types/post'
import generateRssFeed from "../lib/feed";

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  const morePosts = allPosts
  return (
    <>
      <Layout>
        <Head>
          <title>ikuma-t</title>
        </Head>
        <Container>
          {<MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  await generateRssFeed()

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
