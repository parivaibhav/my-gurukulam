import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/DashboardScreen";
import StudentDetails from "./screens/StudentDetailsScreen";
import Assignments from "./screens/AssignmentsScreen";
import Fees from "./screens/FeesScreen";
import Attendance from "./screens/AttendanceScreen";
import OtpScreen from "./screens/OtpScreen";
import BlogScreen from "./screens/BlogScreen";
import CircularScreen from "./screens/CircularScreen";
import ResultScreen from "./screens/ResultScreen";
import ExamScreen from "./screens/ExamScreen";
import TimeTableScreen from "./screens/TimeTableScreen";
import BlogDetailScreen from "./screens/BlogDetailsScreen";
import GalleryScreen from "./screens/GalleryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen name="Assignments" component={Assignments} />
        <Stack.Screen name="Fees" component={Fees} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Blog" component={BlogScreen} />
        <Stack.Screen name="Circular" component={CircularScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Exam" component={ExamScreen} />
        <Stack.Screen name="TimeTable" component={TimeTableScreen} />
        <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
