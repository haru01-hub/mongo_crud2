import connectMongoDB from '@/libs/mongodb'
import User from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json()
    //서버 측에서 입력의 유효성 검사
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and Email are required' },
        { status: 400 }
      )
    }
    //이메일 형식 검사
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    //이름과 이메일이 없다면 저장 안함.
    await connectMongoDB()
    const user = await User.create({ name, email })

    return NextResponse.json(
      {
        message: 'User registered',
        user,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json(
      { error: 'Failed to register user' },
      {
        status: 500,
      }
    )
  }
}
