import React from "react"
import { View, Text, Button } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { RootStackParamList } from "../../App"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

type Props = NativeStackScreenProps<RootStackParamList, "Timer">

const Timer = ({ navigation }: Props) => {
  const tw = useTailwind()
  return (
    <View style={tw("bg-red-500 flex-1 justify-center items-center")}>
      {/* You can also go back programmatically */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {/* Or you can go to the first screen in the stack */}
      <Button
        title="go to the beginning"
        onPress={() => navigation.popToTop()}
      />
      <Text>Timer</Text>
    </View>
  )
}

export default Timer
