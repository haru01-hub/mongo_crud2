'use client'
import React, { useEffect, useState } from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'

//page에서 불러올 수 있음!

interface Topic {
  _id: string
  title: string
  description: string
  createdAt: string
  updateAt: string
}
export default function TopicList() {
  const [topics, setTopics] = useState<Topic[]>([]) //[변수명, 함수명]=useState
  const [loading, setloading] = useState(true)
  const [error, setError] = useState<string | null>(null) //에러메시지의 초기값=null

  useEffect(() => {
    //callback 함수? 언제 실행할 지를 배열로 선언가능
    async function fetchTopics() {
      try {
        const res = await fetch('/api/topics')
        if (!res.ok) {
          throw new Error('Faild to fetch topics')
        }
        const data = await res.json()
        setTopics(data.topics)
      } catch (error) {
        console.error('Error loading topics', error)
        setError('Faild to load topics')
      } finally {
        setloading(false)
      }
    }
    fetchTopics()
  }, [])

  if (loading) return <p> Loading topics...</p>
  if (error) return <p>Error: {error}</p>
  if (topics.length === 0) return <p>No topic found</p>

  return (
    <div>
      {topics.map((topic: Topic) => (
        <div
          key={topic._id}
          className="p-4 border border-slate-300 my-3 flex justify-between items-start gap-5"
        >
          <div>
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            <div>{topic.description}</div>
            <div className="flex-gap-4">
              <p>Created: {topic.createdAt}</p>
              <p>Updated: {topic.updateAt}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
            {/* <ImAirplane size={24} />이렇게 아이콘을 쓸 수 있다. */}
          </div>
        </div>
      ))}
    </div>
  )
}
