import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight my-12">
        <Link href="/">
          <a className="hover:underline">ikuma-t</a>
        </Link>
      </h2>
      <a href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fikuma-t.work%2Frss%2Ffeed.xml" target='blank'><img id='feedlyFollow' src='http://s3.feedly.com/img/follows/feedly-follow-logo-black_2x.png' alt='follow us in feedly' width='28' height='28' /></a>
    </div>
  )
}

export default Header
