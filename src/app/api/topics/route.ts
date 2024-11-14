//백엔드를 만들 때에는 route.ts라고 파일명을 지정해준다.
//이러한 웹 사이트 테스트 = 확장 프로그램 Thunder client설치로 할 수 있다.
//http://localhost:3000/api/topics주소는 이 서버 주소

// //json누르고 {
//   "title":"HTML",
//   "description":"마크업 언어"
// } 처럼 json 형태로 쓰고 send
import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { request } from 'http'
import { NextRequest, NextResponse } from 'next/server'
// 같은 파일 안에 POST와 GET 기능 모두 구현해놓음
export async function POST(request: NextRequest) {
  try {
    //이걸 써야 에러 없는 웹을 만들 수 있다.
    const { title, description } = await request.json()
    if (!title || !description) {
      return NextResponse.json(
        {
          message: 'Both title and description are required',
        },
        { status: 400 }
      )
    }
    await connectMongoDB()
    await Topic.create({ title, description })
    return NextResponse.json({ message: 'Topic created' }, { status: 201 }) //200대는 문제 없음 400대는 문제 있음(status)
  } catch (error) {
    console.error('Error in POST /api/topics', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
// GET도 Thunder clinet 에서 GET으로 두고 test
export async function GET() {
  try {
    await connectMongoDB()
    //Topic에 있는 find라는 함수는 데이터를 읽어오는 기능 제공(혹은 데이터 찾아서 지워라라는 것도 가능)
    const topics = await Topic.find()
    return NextResponse.json({ topics })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'Internal server',
      },
      { status: 500 }
    )
  }
}
//test -> http://localhost:3000/api/topics?id=67233c12e2bcc1abff28f6e0
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }
    await connectMongoDB()
    const deleteTopic = await Topic.findByIdAndDelete(id)
    if (!deleteTopic) {
      return NextResponse.json({ message: 'Topic not found' })
    }
    return NextResponse.json({ message: 'Topic deleted' })
  } catch (error) {
    console.error('Error in DELETE /api/topics', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
