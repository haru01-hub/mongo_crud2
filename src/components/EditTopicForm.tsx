'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface EditTopicFormProps {
  id: string
  title: string
  description: string
}
export default function EditTopicForm({
  id,
  title,
  description,
}: EditTopicFormProps) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setDescription] = useState(description)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })
      if (!res.ok) {
        throw new Error('Faild to update topic')
      }
      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="item-center px-10">
      {/* 세로 정렬은 flex-col gap은 한 글자씩 띄우겠다*/}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border border-slate-300 p-4"
          type="text"
          placeholder="Topic Tittle"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTitle(e.target.value)
          }
          value={newTitle}
        />
        <textarea
          className="border boreder-slate-300 p-4 h-32"
          placeholder="Topic description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          value={description}
        />
        <button
          className="bg-emerald-300 text-white font-bold px-6 py-3 w-fit rounded-md"
          type="submit"
        >
          Edit Topic
        </button>
      </form>
    </div>
  )
}
