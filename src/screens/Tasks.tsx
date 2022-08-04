import React from "react"
import { View, Text, FlatList } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { atom, useAtom } from "jotai"
import Task from "../components/task/Task"
import TagPicker from "../components/tag-picker/TagPicker"

/*
Ok se the idea goes like this: 
1) User lands on page with a list of tasks for today - this is the Tasks screen
2) The second tab should be a "stash" screen where are the tasks without due date
3) Tasks that are overdue should be shown on today screen, but with a warning that they are overdue

*/

// HERE we should have @react-navigation/material-top-tabs

const TASKS = [
  {
    title: "This is a task",
    tags: ["today", "important"],
    completed: false,
  },
  {
    title: "Buy gel",
    tags: ["work", "stuff"],
    completed: true,
  },
  {
    title: "This is a task",
    tags: ["today", "important"],
    completed: false,
  },
  {
    title: "This is a task",
    tags: ["today", "important"],
    completed: false,
  },
  {
    title: "This is a task",
    tags: ["today", "important"],
    completed: false,
  },
  {
    title: "This is a task",
    tags: ["today", "important"],
    completed: false,
  },
  {
    title: "Buy gel",
    tags: ["work", "stuff"],
    completed: true,
  },
  {
    title: "This is a task",
    tags: ["today", "important"],
    completed: false,
  },
  {
    title: "This is a task",
    tags: ["today", "important"],
    completed: false,
  },
  {
    title: "This is a task",
    tags: ["today", "important"],
    completed: false,
  },
]

const Tasks: React.FC = () => {
  const tw = useTailwind()
  const textAtom = atom("Hello!")
  return (
    <View style={tw("bg-zinc-900 flex-1 justify-start items-stretch")}>
      <TagPicker />
      <FlatList
        data={TASKS}
        renderItem={({ item }) => {
          return (
            <Task
              title={item.title}
              tags={item.tags}
              completed={item.completed}
            />
          )
        }}
      />
    </View>
  )
}

export default Tasks
