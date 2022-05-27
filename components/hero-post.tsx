import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  date: string
  slug: string
}

const HeroPost = ({
  title,
  date,
  slug,
}: Props) => {
  return (
    <section>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-8">
        <div>
          <h3 className="mb-4 text-xl font-bold leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-sm text-neutral-400">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
