import Link from "next/link";

const Intro = () => {
  return (
    <section className="mt-16 mb-16 md:mb-12">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/">
          <a className="hover:underline visited:text-gray-900">ikuma-t</a>
        </Link>
      </h1>
      <p className="text-sm mt-8 text-gray-700">このウェブサイトでは、<a href="https://twitter.com/ikumatdkr" className="underline">ikuma-t</a>のプログラミングや生活に関する記録を共有しています</p>
    </section>
  )
}

export default Intro
