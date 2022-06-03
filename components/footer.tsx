import Container from './container'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="px-24 py-6 flex flex-row w-full">
          <Link href={`/about`}>
            <a className="mx-3 text-sm hover:underline flex-1 text-center">About</a>
          </Link>
          <Link href={`https://ikumatadokoro.github.io/diary`} className="mx-3 text-sm hover:underline flex-1 text-center">
            <a className="mx-3 text-sm hover:underline flex-1 text-center">Diary</a>
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
