'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

export default function RemoveBtn({ id }: { id: string }) {
  const router = useRouter()
  async function removeTopic() {
    const confirmed = confirm(`Are you sure to delete the topic of ${id}?`)
    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.refresh()
      }
    }
  }
  return (
    <button className="text-red-400" onClick={removeTopic}>
      <HiOutlineTrash size={24} />
      {/*이런식으로 아이콘 불러오기 가능! 위의 import도 react icons웹 사이트에서 사용가능한 icons을 볼 수 있음! 코드도 다 나와있음!*/}
    </button>
  )
}
