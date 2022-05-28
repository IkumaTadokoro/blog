import { AppProps } from 'next/app'
import 'prismjs/themes/prism-tomorrow.css'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
