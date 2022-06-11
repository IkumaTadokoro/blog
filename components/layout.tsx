import Footer from './footer'
import Meta from './meta'
import Intro from "./intro";

type Props = {
  children: React.ReactNode
  title?: string
  ogImagePath?: string
}

const Layout = ({ children, title, ogImagePath }: Props) => {
  return (
    <>
      <Meta ogTitle={title} ogImagePath={ogImagePath} />
      <div className="min-h-screen flex flex-col">
        <Intro />
        <main className="z-10 flex-1 py-8">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
