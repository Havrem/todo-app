if (__DEV__) {
  require('./mocks/native').server.listen({
    onUnhandledRequest: 'warn',
  });
}

import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from '@/contexts/SessionContext';
import RouteLayout from '../components/RouteLayout';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/contexts/ThemeContext';

const queryClient = new QueryClient();

// This file structures the app layout
export default function Root() {
  const [fontsLoaded] = useFonts({
    'Glory-Bold': require('../assets/fonts/Glory-Bold.ttf'),
    'Glory-Medium': require('../assets/fonts/Glory-Medium.ttf'),
    'Glory-Light': require('../assets/fonts/Glory-Light.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <SessionProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex:1, backgroundColor: "rgb(255, 255, 255)",}}>
                <RouteLayout/>
                <Toast />
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
