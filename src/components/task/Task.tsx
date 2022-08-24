import react from "react"
import { View, Text, Pressable } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Ionicons } from "@expo/vector-icons"
import { useMutation } from "urql"
import { MotiPressable } from "moti/interactions"

interface Props {
  title: string
  tags: string[]
  completed: boolean
  id: string
}

const MarkTaskDoneMutation = `
  mutation($taskId: String!) {
    markTaskDone(taskId: $taskId) {
      id
    }
  }
`

const Task: React.FC<Props> = ({ title, tags, completed, id }) => {
  const tw = useTailwind()
  const [markTaskDoneResult, markTaskDone] = useMutation(MarkTaskDoneMutation)

  const handleCompleteTask = () => {
    const variables = { taskId: id }
    markTaskDone(variables).then((res) => console.log(res))
  }

  return (
    <View
      style={tw(
        `bg-zinc-700 p-6  mb-5 rounded-lg flex-row items-center ${
          completed ? "opacity-30" : ""
        }`
      )}
    >
      {!completed && (
        <View style={tw("bg-zinc-800 rounded-full p-1")}>
          <Pressable onPress={handleCompleteTask}>
            <Ionicons name="checkmark" size={25} color="#F1F5F9" />
          </Pressable>
        </View>
      )}
      <Text style={tw("text-slate-200 ml-4")}>{title}</Text>
      <View style={tw("ml-auto items-center")}></View>
    </View>
  )
}

export default Task
