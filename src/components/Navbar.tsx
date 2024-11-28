'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
//components 폴더에 쓰면 모든 페이지에 위의 바가 뜨게 만들 수 있음!
import Link from 'next/link'

export default function Navbar() {
  const { status, data: session } = useSession()
  console.log(session)

  return (
    //px는 x축으로 8만큼 패딩
    <nav
      className="flex justify-between items-center bg-pink-300 mx-auto px-20 py-6 
    "
    >
      <Link href="/" className="text-white text-xl font-semibold ">
        MongoDB CRUD
      </Link>
      <Link
        href="/addTopic"
        className="bg-yellow-100  text-lg font-bold px-5 py-4 rounded-lg"
      >
        Add Topic
      </Link>
      <div className="flex-gap-4">
        {status === 'authenticated' ? (
          <>
            <div className="flex gap-2 items-center">
              <Image
                className="rounded-full"
                src={session?.user?.image ?? '/default-avatar.png'}
                width={40}
                height={40}
                alt={session?.user?.name ?? 'user'}
              />
              <span className="text-white font-bold">
                {session?.user?.name}
              </span>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-lg font-bold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-lg font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
