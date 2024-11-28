import { auth } from '@/auth'
import React from 'react'

export default async function DashboardPage() {
  const session = await auth() //로그인한 상태의 정보만 가져오는 법
  console.log(session)

  if (!session) return <div>Not Authenticated..</div>
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard: {session.user?.name}</h1>
      <pre className="mt-4">{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
