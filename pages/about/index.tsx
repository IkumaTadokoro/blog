import Container from '../../components/container'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import Head from 'next/head'

const Index = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>ikuma-t</title>
        </Head>
        <Container>
          <section>
            <h2 className="text-2xl mb-4 font-bold">作者について</h2>
            <p className="mb-4">ikuma-tという名前で活動しています。本当はtはつけたくなかったんですけど、取れなかったのでこうなっています。なので、サービスによってまれに「ikuma」である場合があります。読み方は「いくま」でも「いくまてぃー」でもどちらでも大丈夫です。</p>
            <p className="mb-4">SIerでコンサルとして働いたのちに、<a href="https://bootcamp.fjord.jp/">FJORD BOOT CAMP</a>で学習し、エンジニアになりかけです。</p>
          </section>
        </Container>
      </Layout>
    </>
  )
}

export default Index
