import { useMutation } from '@tanstack/react-query';
import { loginUser, mockLoginUser } from "@/api/auth";
import Toast from 'react-native-toast-message';
import { useSession } from "@/contexts/SessionContext";

export const useLogin = () => {
    const { signIn } = useSession();

    return useMutation({
        mutationFn: mockLoginUser,
        onSuccess: async () => {
            await signIn('mock-token');
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