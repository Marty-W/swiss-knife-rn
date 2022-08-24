import React, { useState } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { atom, useAtom } from "jotai"
import Task from "components/task/Task"
import TagPicker from "components/tag-picker/TagPicker"
import NewTask from "components/task/NewTask"
import { useMutation, useQuery } from "urql"
import { ITask } from "src/types"

/*
Ok se the idea goes like this: 
1) User lands on page with a list of tasks for today - this is the Tasks screen
2) The second tab should be a "stash" screen where are the tasks without due date
3) Tasks that are overdue should be shown on today screen, but with a warning that they are overdue


*/

// HERE we should have @react-navigation/material-top-tabs
//

const TaskQuery = `
  query {
    allTasks {
      id
      title
      completed
      tags
      dueOn
    }
  }
`

const Tasks: React.FC = () => {
  const tw = useTailwind()
  const [newTaskActive, setNewTaskActive] = useState(false)
  const [result, reexecuteQuery] = useQuery({ query: TaskQuery })
  const [createTodoResult, createTodo] = useMutation(TaskQuery)
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)

  const { data, fetching, error } = result

  const filteredTasks = data?.allTasks
    .filter((task: ITask) => {
      if (!showCompletedTasks) {
        return !task.completed
      }

      return true
    })
    .sort((a, b) => {
      return a.completed - b.completed
    })

  const handleHideNewTask = () => {
    if (newTaskActive) {
      setNewTaskActive(false)
    }
  }

  return (
    <View style={tw("bg-zinc-900 flex-1 justify-start items-stretch")}>
      <TagPicker />
      <View style={tw("px-6")}>
        <Pressable onPress={handleHideNewTask}>
          {newTaskActive && <NewTask hideNewTaskInput={handleHideNewTask} />}
          {fetching || error ? (
            <Text style={tw("text-slate-100 self-center my-auto")}>
              Loading...
            </Text>
          ) : (
            <FlatList
              data={filteredTasks}
              renderItem={({ item }) => {
                return (
                  <Task
                    title={item.title}
                    tags={item.tags}
                    completed={item.completed}
                    id={item.id}
                  />
                )
              }}
            />
          )}
        </Pressable>
        <Pressable onPress={() => setShowCompletedTasks((prev) => !prev)}>
          <Text style={tw("ml-auto mt-3 text-red-500")}>
            {showCompletedTasks ? "Hide" : "Show"} completed tasks
          </Text>
        </Pressable>
      </View>
      <TouchableOpacity
        onPress={() => setNewTaskActive(true)}
        style={[
          {
            backgroundColor: "#ef4444",
            position: "absolute",
            bottom: 20,
            right: 20,
            height: 60,
            width: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={[{ fontSize: 35 }, tw("text-slate-200")]}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Tasks
