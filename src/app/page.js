import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const ListanimesWithParams = dynamic(() => import('@/components/ListanimesWithParams'), {
  ssr: false,
})

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListanimesWithParams />
    </Suspense>
  )
}