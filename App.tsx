import { NavigationContainer } from "@react-navigation/native"
import { TailwindProvider, useTailwind } from "tailwind-rn"
import { Habits, Landing, Tasks, Timer } from "./src/screens"
import utilities from "./tailwind.json"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { createClient, Provider } from "urql"
import { getToken } from "./src/utils"

const client = createClient({
  url: "http://localhost:4000",
  fetchOptions: () => {
    const token = getToken()

    return {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  },
})

const Tab = createBottomTabNavigator()

export type RootStackParamList = {
  Home: undefined
  Tasks: undefined
  Habits: undefined
  Timer: undefined
}

//TODO set up theme that utilizes tailwind.json
//TODO setup data prefetching and splash screen

const App: React.FC = () => {
  const tw = useTailwind()
  return (
    <Provider value={client}>
      <TailwindProvider utilities={utilities}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size, focused }) => {
                let iconName

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline"
                } else if (route.name === "Timer") {
                  iconName = focused ? "timer" : "timer-outline"
                } else if (route.name === "Tasks") {
                  iconName = focused
                    ? "checkmark-done-circle"
                    : "checkmark-done-circle-outline"
                } else if (route.name === "Habits") {
                  iconName = focused ? "repeat" : "repeat-outline"
                }

                return (
                  <Ionicons
                    name={iconName as keyof typeof Ionicons.glyphMap}
                    size={size}
                    color={color}
                  />
                )
              },
              tabBarStyle: {
                backgroundColor: "#18181B",
              },
              tabBarActiveTintColor: "#F1F5F9",
              tabBarShowLabel: false,
              headerStyle: {
                backgroundColor: "#18181B",
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                color: "#F1F5F9",
              },
            })}
          >
            <Tab.Screen name="Home" component={Landing} />
            <Tab.Screen name="Timer" component={Timer} />
            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="Habits" component={Habits} />
          </Tab.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  )
}

export default App
