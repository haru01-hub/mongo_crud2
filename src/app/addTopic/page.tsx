'use client' //브라우저가 실제 랜더링 및 사용한다는 뜻으로 useState사용시 씀

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddTopicPage() {
  const { data: session } = useSession()
  if (!session) {
    redirect('/login') //주소를 보내줌! 로그인 안 되어있으면
  }
  const [title, setTitle] = useState('') //이건 사용자 입력을 받고 직접 저장되도록 하는 것
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) {
      alert('Title and description are required')
    }
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })
      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        throw new Error('Faild to create a topic')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="item-center px-10">
      {/* 세로 정렬은 flex-col gap은 한 글자씩 띄우겠다*/}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border border-slate-700 p-4"
          type="text"
          placeholder="Topic Tittle"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <textarea
          className="border boreder-slate-500 p-4 h-32"
          placeholder="Topic description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
        <button className="bg-emerald-300 text-white font-bold px-6 py-3 w-fit rounded-md">
          Add Topic
        </button>
      </form>
    </div>
  )
}
