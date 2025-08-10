import React from 'react'
import Layout from '@/components/layouts/Layout'
import MovieCard from '@/components/commons/MovieCard'

export default function HomePage() {
  return (
    <Layout>
      <h1 className="mb-6 text-2xl font-bold">Welcome to MovieApp</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <MovieCard title="Inception" year={2010} />
        <MovieCard title="Interstellar" year={2014} />
      </div>
    </Layout>
  )
}