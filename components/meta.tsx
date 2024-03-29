import Head from 'next/head'
import {HOME_OG_IMAGE_URL, HOME_OG_TITLE} from "../lib/constants";

type Meta = {
    ogTitle?: string,
    ogImagePath?: string
}

const Meta = ({ ogTitle, ogImagePath }: Meta) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`ikuma-tのプログラミングや日々の生活に関する記録です`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle ? ogTitle : HOME_OG_TITLE } />
      <meta property="og:image" content={ogImagePath ? ogImagePath : HOME_OG_IMAGE_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ikumatdkr" />
    </Head>
  )
}

export default Meta
