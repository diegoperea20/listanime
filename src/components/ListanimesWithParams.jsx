'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import Listanimes from '@/components/Listanimes'

function ListanimesWithParams() {
  const searchParams = useSearchParams()
  return <Listanimes searchParams={searchParams} />
}

export default ListanimesWithParams