import Footer from './footer'
import Meta from './meta'

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
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
