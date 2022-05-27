import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="max-w-2xl mx-auto text-3xl font-bold tracking-tighter leading-tight  mb-12 text-center md:text-left">
      {children}
    </h1>
  )
}

export default PostTitle
