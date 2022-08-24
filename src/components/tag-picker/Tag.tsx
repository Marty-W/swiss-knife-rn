import React, { useState, useRef, useEffect } from "react"
import { Text, Pressable, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import Ionicons from "@expo/vector-icons/Ionicons"
import { MotiView } from "moti"

interface Props {
  color: string
  item: string
  isEditMode: boolean
  onLongPress: () => void
  onTagDelete: (item: string) => void
}

const Tag: React.FC<Props> = ({
  color,
  item,
  isEditMode,
  onLongPress,
  onTagDelete,
}) => {
  const [isSelected, setIsSelected] = useState(false)
  const tw = useTailwind()

  const handleShortPress = () => {
    if (!isEditMode) {
      setIsSelected((prev) => !prev)
    }
  }

  return (
    <Pressable onPress={handleShortPress} onLongPress={onLongPress}>
      <MotiView
        animate={{ scale: isEditMode ? 1.1 : 1 }}
        style={[
          tw(`mx-3 py-1 px-4  rounded-lg border-2`),
          {
            borderColor: isSelected ? "none" : color,
            backgroundColor: isSelected ? color : "#18181B",
          },
        ]}
      >
        {isEditMode && (
          <Pressable
            onPress={() => onTagDelete(item)}
            style={tw("z-10 absolute right-0 top-0")}
          >
            <Ionicons name="close-circle-sharp" color="#fff" size={15} />
          </Pressable>
        )}
        <Text
          style={{
            color: isSelected ? "#18181B" : color,
          }}
        >
          {item}
        </Text>
      </MotiView>
    </Pressable>
  )
}

export default Tag
