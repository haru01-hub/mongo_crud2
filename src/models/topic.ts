//javascript(typescript)로 만들겠다
//모델이름은 대문자 Topic이다. 이러한 스케마를 Topic이라는 모델이라고 부르고? 만들고 밖으로 내보내겠다
import mongoose, { Schema } from 'mongoose'

const topicSchema = new Schema(
  {
    //form입력 데이터가 db로 넘어갈 때 description과 뭐 그런게 string형으로 넘어가겠다라는 의미이다.
    title: String,
    description: String,
  },
  {
    timestamps: true, //true는 시간을 저장한다는 의미
  }
)
//mongoose가 기존에 만들어진 Topic(얘는 여러 개일 필요 없음)이라는 모델스를 이용하겠다라는 의미

//collection을 만드는 거?? 서버가 아닌 여기서 직접 컬렉션 만듬!
const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema)
export default Topic
