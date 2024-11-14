//ts는 타입스크립트를 쓴다는 의미 tsx와 다름

import mongoose from 'mongoose'

export default async function connectMongoDB() {
  //error가 날 것을 대비해 try catch를 사용한다.
  try {
    //MONGODB_URI는 env.에서 맨 앞에 문자랑 똑같이!!
    //그 안에 들어가는 형이 string인지이다.
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to MongDB') //mongodb에 연결하고 모델을 만들고 하는 것
  } catch (error) {
    //어떤 에러를 .??뭐였지 성공못하면 에러코드 나옴! 연결되면 위 Connected to MongoDB라는 문장이 나옴.
    console.error(error)
  }
}
