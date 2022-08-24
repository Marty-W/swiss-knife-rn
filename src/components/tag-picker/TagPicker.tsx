import React, { useState } from "react"
import { FlatList, View, Text, Pressable } from "react-native"
import { useTailwind } from "tailwind-rn"
import randomColor from "randomcolor"
import Tag from "./Tag"

let TAGS = [
  "work",
  "stuff",
  "today",
  "important",
  "other",
  "job",
  "school",
  "home",
  "family",
  "Karolinecka",
]

const getRandomBrightTailwindColor = () => {
  const COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "lime",
    "emerald",
    "teal",
    "cyan",
    "pink",
  ]
  const TINTS = ["500", "600", "700", "800", "900"]

  return `${COLORS[Math.floor(Math.random() * COLORS.length)]}-${
    TINTS[Math.floor(Math.random() * TINTS.length)]
  }`
}

const TagPicker: React.FC = () => {
  const [tags, setTags] = useState(TAGS)
  const [isEditMode, setIsEditMode] = useState(false)
  const tw = useTailwind()

  const handleLongPress = () => {
    setIsEditMode(true)
  }

  const deleteTag = (item: string) => {
    setTags((prev) => prev.filter((tag) => tag !== item))
  }

  const handleQuitEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false)
    }
  }

  return (
    <Pressable onPress={handleQuitEditMode} hitSlop={30}>
      <View>
        <FlatList
          data={tags}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={(TAGS.length - 1) / 2}
          contentContainerStyle={tw(
            "justify-center flex-row items-center mt-4 pb-4"
          )}
          renderItem={({ item, index }) => {
            const color = randomColor({ luminosity: "light" })
            return (
              <Tag
                color={color}
                item={item}
                isEditMode={isEditMode}
                onLongPress={handleLongPress}
                onTagDelete={deleteTag}
              />
            )
          }}
        />
      </View>
    </Pressable>
  )
}

export default TagPicker
