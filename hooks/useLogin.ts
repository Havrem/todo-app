import { useMutation } from '@tanstack/react-query';
import { loginUser } from "@/api/auth";
import Toast from 'react-native-toast-message';
import { useSession } from "@/contexts/SessionContext";

export function useLogin() {
    const { signIn } = useSession();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: async ({token}) => {
            await signIn(token);
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