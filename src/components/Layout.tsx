import React from "react"
import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const Layout: React.FC = ({ children }) => {
  const tw = useTailwind()
  return (
    <View style={tw("flex-1 bg-zinc-900")}>
      <View style={tw("flex-1")}>{children}</View>
    </View>
  )
}

export default Layout
