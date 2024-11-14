import TopicList from '@/components/TopicList'

export default function Home() {
  return (
    <div className="between-justify item-center px-20">
      <h1 className="text-3xl font-bold">WebDev Topics</h1>
      <p className="mb-4">MongoDB CRUD Example</p>
      {/* 이렇게 불러올 수 있음! TopicList.tsx를 */}
      <TopicList />
    </div>
  )
}
