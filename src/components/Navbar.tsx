//components 폴더에 쓰면 모든 페이지에 위의 바가 뜨게 만들 수 있음!
import Link from 'next/link'

export default function Navbar() {
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
        APP Topic
      </Link>
    </nav>
  )
}
