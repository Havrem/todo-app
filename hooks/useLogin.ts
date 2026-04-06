import { useRouter } from "expo-router";
import { useMutation } from '@tanstack/react-query';
import { loginUser, mockLoginUser } from "@/api/auth";
import Toast from 'react-native-toast-message';

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: mockLoginUser,
        onSuccess: () => {
            router.push('/(tabs)/home')
        },
        onError: () => {
            Toast.show({
                type: 'error',
                text1: 'Invalid credentials',
                text2: 'Please try again',
                position: 'bottom'
            })
        }
    })
}