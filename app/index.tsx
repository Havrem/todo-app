import Start from "@/screens/Start";
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Glory-Bold': require('../assets/fonts/Glory-Bold.ttf'),
    'Glory-Medium': require('../assets/fonts/Glory-Medium.ttf'),
    'Glory-Light': require('../assets/fonts/Glory-Light.ttf'),
  });

  if (!fontsLoaded) return null;

  return <Start/>;
}
