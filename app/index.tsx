import Start from "@/screens/Start";
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Glory-Bold': require('../assets/fonts/Glory-Bold.ttf'),
    'Glory-Medium': require('../assets/fonts/Glory-Medium.ttf'),
    'Glory-Light': require('../assets/fonts/Glory-Light.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Start />
        <Toast />
      </QueryClientProvider>
    </>
  );
}
