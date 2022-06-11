import Link from "next/link";

const Intro = () => {
  return (
    <section className="relative pt-12 md:pt-16 pb-16 md:pb-32 bg-gradient-to-r from-red-500 to-red-800 px-4">
      <div className="max-w-2xl mx-auto px-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight tracking-wide">
            <Link href="/">
              <a className="text-slate-200 hover:underline visited:text-slate-200">ikuma-t</a>
            </Link>
          </h1>
          <p className="text-xs md:text-sm mt-4 text-gray-300"><a href="https://twitter.com/ikumatdkr" className="underline">ikuma-t</a>の素振り場兼ブログです</p>
        </div>
        <div>
          <a href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fikuma-t.work%2Frss%2Ffeed.xml" target='blank'><img id='feedlyFollow' src='http://s3.feedly.com/img/follows/feedly-follow-logo-white_2x.png' alt='follow us in feedly' width='32' height='32' /></a>
        </div>
      </div>
      <svg className="absolute w-full h-16 md:h-full top-36 left-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0 32L24 37.3C48 43 96 53 144 74.7C192 96 240 128 288 122.7C336 117 384 75 432 80C480 85 528 139 576 133.3C624 128 672 64 720 53.3C768 43 816 85 864 90.7C912 96 960 64 1008 48C1056 32 1104 32 1152 58.7C1200 85 1248 139 1296 133.3C1344 128 1392 64 1416 32L1440 0V171H1416C1392 171 1344 171 1296 171C1248 171 1200 171 1152 171C1104 171 1056 171 1008 171C960 171 912 171 864 171C816 171 768 171 720 171C672 171 624 171 576 171C528 171 480 171 432 171C384 171 336 171 288 171C240 171 192 171 144 171C96 171 48 171 24 171H0V32Z" fill="white"/>
      </svg>
    </section>
  )
}

export default Intro
