import EditTopicForm from '@/components/EditTopicForm'
const apiUrl = process.env.API_URL

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch topic')
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
//local3000뒤에 /editTopic/~~라고 쓰면 들어가짐 ~~는 아직 지정을 안했고 [id]에 데이터베이스로부터 저장해줄 예정
export default async function EditTopic({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { topic } = await getTopicById(id)
  const { title, description } = topic
  return <EditTopicForm id={id} title={title} description={description} />
}
