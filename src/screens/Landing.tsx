import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { View, Text, Button } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { RootStackParamList } from "../../App"
import { useAtom } from "jotai"

type Props = NativeStackScreenProps<RootStackParamList, "Home">

//Here we could have "stats" from the whole app - the number of tasks, habits that are due today, time focused today etc

const Landing = ({ navigation }: Props) => {
  const tw = useTailwind()
  return (
    <View style={tw("bg-zinc-900 flex-1 justify-center items-center")}>
      <Text style={tw("text-slate-100")}>Landing</Text>
    </View>
  )
}

export default Landing
