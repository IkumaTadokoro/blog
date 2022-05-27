import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="px-24 py-6 flex flex-col lg:flex-row w-full">
            <a
              href={`/`}
              className="mx-3 text-sm hover:underline flex-1 text-center"
            >
              About（工事中）
            </a>
            <a
              href={`https://twitter.com/ikumatdkr`}
              className="mx-3 text-sm hover:underline flex-1 text-center"
            >
              Twitter
            </a>
            <a
              href={`https://github.com/IkumaTadokoro`}
              className="mx-3 text-sm hover:underline flex-1 text-center"
            >
              GitHub
            </a>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
