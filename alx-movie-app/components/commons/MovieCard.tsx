import React from 'react'
import Image from 'next/image'

export type MovieCardProps = {
  id?: string
  title: string
  year?: number
  posterUrl?: string
  onClick?: () => void
}

const MovieCard: React.FC<MovieCardProps> = ({ title, year, posterUrl, onClick }) => {
  return (
    <article onClick={onClick} className="group cursor-pointer rounded-2xl border p-3 shadow-sm hover:shadow-md">
      <div className="relative mb-3 aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-100">
        {posterUrl ? (
          <Image src={posterUrl} alt={`${title} poster`} fill sizes="(max-width:768px) 50vw, 200px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <h3 className="text-base font-semibold leading-tight line-clamp-2">{title}</h3>
      {year ? <p className="text-sm text-gray-500">{year}</p> : null}
    </article>
  )
}

export default MovieCard