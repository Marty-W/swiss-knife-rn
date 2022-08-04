import React from "react"
import { View, Text } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const Habits: React.FC = () => {
  const tw = useTailwind()
  return (
    <View style={tw("bg-red-500 flex-1 justify-center items-center")}>
      <Text>Habits</Text>
    </View>
  )
}

export default Habits
