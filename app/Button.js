'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
const Button = () => {

  const router = useRouter()

  const handleClick = () => {
    router.refresh()
    router.push(`/?newsButton=${true}`);
  }

  return (
    <button onClick={handleClick} className='bg-blue-500 text-white py-3 px-5 rounded-lg'>Button News</button>
  )
}

export default Button