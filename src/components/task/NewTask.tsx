import React, { useState } from "react"
import {
  View,
  TextInput,
  Pressable,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  GestureResponderEvent,
} from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Entypo } from "@expo/vector-icons"
import { useMutation } from "urql"

const TaskMutation = `
  mutation($title: String!) {
    createTask(title: $title) {
      id
    }
  }
`

interface Props {
  hideNewTaskInput: () => void
}

const NewTask: React.FC<Props> = ({ hideNewTaskInput }) => {
  const tw = useTailwind()
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTagActive, setNewTagActive] = useState(false)
  const [createTaskResult, createTask] = useMutation(TaskMutation)

  // title.replace(/(?<=#).*?(?=( |$))/g, (hashtag) => {
  // do something with hashtag, e.g. "fenty"
  //   setTags([...tags, hashtag])
  // })

  //   const handleDetectNewTag = (
  //     e: NativeSyntheticEvent<TextInputKeyPressEventData>
  //   ) => {
  //     if (e.nativeEvent.key === "#") {
  //       // start listening for text and end it when threre is a space
  //       setNewTagActive(true)
  //     }

  //     if (e.nativeEvent.key === " ") {
  //       setNewTagActive(false)
  //     }
  //   }
  //

  const handleAddTask = () => {
    if (title) {
      const variables = { title }
      createTask(variables)
        .then((res) => console.log(res))
        .then(() => hideNewTaskInput())
    }
  }

  return (
    <View
      style={tw(
        "bg-zinc-600 mb-5 p-8 rounded-lg flex flex-row justify-between"
      )}
    >
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={tw("text-slate-100")}
        autoFocus
        autoCorrect={false}
        returnKeyType="go"
        onSubmitEditing={handleAddTask}
        multiline
      />
      <Pressable onPress={handleAddTask}>
        <Entypo name="arrow-with-circle-right" size={32} color="#fff" />
      </Pressable>
    </View>
  )
}

export default NewTask
