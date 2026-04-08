import { useMutation } from '@tanstack/react-query';
import { registerUser } from "@/api/auth";
import Toast from 'react-native-toast-message';
import { useSession } from "@/contexts/SessionContext";

export function useRegister() {
    const { signIn } = useSession();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: async ({token}) => {
            await signIn(token);
        },
        onError: () => {
            Toast.show({
                type: 'error',
                text1: 'Registration failed',
                text2: 'That email may already be taken',
                position: 'bottom'
            })
        }
    })
}
