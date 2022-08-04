import react from "react"
import { View, Text } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Ionicons } from "@expo/vector-icons"

interface Props {
  title: string
  tags: string[]
  completed: boolean
}

const Task: React.FC<Props> = ({ title, tags, completed }) => {
  const tw = useTailwind()

  return (
    <View style={tw("bg-zinc-700 m-4 p-6 rounded-lg flex-row items-center")}>
      <View style={tw("bg-zinc-800 rounded-full p-1")}>
        <Ionicons name="checkmark" size={25} color="#F1F5F9" />
      </View>
      <Text style={tw("text-slate-200 ml-4")}>{title}</Text>
      <View style={tw("ml-auto items-center")}>
        <Text style={tw("text-red-600")}>15D</Text>
      </View>
    </View>
  )
}

export default Task
