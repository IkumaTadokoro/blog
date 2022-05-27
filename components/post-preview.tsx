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

const PostPreview = ({
  title,
  date,
  slug,
}: Props) => {
  return (
    <div className="mb-8">
      <div className="text-xs text-neutral-400 mb-2">
        <DateFormatter dateString={date} />
      </div>
      <h3 className="text-md leading-snug font-bold">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
    </div>
  )
}

export default PostPreview
