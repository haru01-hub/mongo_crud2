import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { newTitle: title, newDescription: description } =
      await request.json()
    if (!title || !description) {
      return NextResponse.json(
        //백엔드에서의 에러 체크(반드시 넣어줘야 함.)
        {
          message: 'Title and description are required',
        },
        { status: 400 }
      )
    }
    await connectMongoDB()
    const updateTopic = await Topic.findByIdAndUpdate(id, {
      title, //이 id는 클라이언트로 받아온 아이디, 그리고 이거 불러올 때 위에 메시지 창으로 설명이 뜨는데 그걸로 문법 형식 알 수 있음
      description,
    })
    if (!updateTopic) {
      return NextResponse.json(
        {
          message: 'Topic not found',
        },
        { status: 404 }
      )
    }
    return NextResponse.json(
      {
        message: 'Topic updated',
        topic: updateTopic,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/topics/[id]')
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await connectMongoDB()
    const topic = await Topic.findOne({ _id: id }) //id맞는 걸 하나를 찾아 뭐 한다.
    if (!topic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }
    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/topics/[id]', error)
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
