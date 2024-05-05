'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
const Button = () => {

  const router = useRouter()

  /**
   * Handles the click event and refreshes the router and navigates to a new page.
   *
   * @return {void} This function does not return anything.
   */
  const handleClick = () => {
    router.refresh()
    router.push(`/?newsButton=${true}`);
  }

  return (
    <button onClick={handleClick} className='bg-blue-500 text-white py-3 px-5 rounded-lg'>Button News</button>
  )
}

export default Button