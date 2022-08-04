import React from "react"
import { FlatList, View, Text } from "react-native"
import { useTailwind } from "tailwind-rn"
import randomColor from "randomcolor"

const TAGS = [
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
  const tw = useTailwind()

  return (
    <View>
      <FlatList
        data={TAGS}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={(TAGS.length - 1) / 2}
        contentContainerStyle={tw(
          "justify-center flex-row items-center mt-4 pb-4"
        )}
        renderItem={({ item, index }) => {
          const color = randomColor({ luminosity: "light" })
          return (
            <View
              style={[
                tw(`mx-3 py-1 px-4  rounded-lg border-2 }`),
                {
                  borderColor: color,
                },
              ]}
            >
              <Text
                style={{
                  color: color,
                }}
              >
                {item}
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}

export default TagPicker
