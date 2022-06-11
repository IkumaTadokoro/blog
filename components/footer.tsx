import Container from './container'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="font-bold bg-stone-800 text-white">
      <Container>
        <div className="px-24 py-12 flex flex-row w-full">
          <Link href={`/about`}>
            <a className="mx-3 text-sm hover:underline flex-1 text-center">About</a>
          </Link>
          <Link href={`https://ikumatadokoro.github.io/diary`} className="mx-3 text-sm hover:underline flex-1 text-center">
            <a className="mx-3 text-sm hover:underline flex-1 text-center">LogBook</a>
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
