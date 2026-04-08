import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { changePassword, deleteAccount, getUser } from '@/api/user';
import { useSession } from '@/contexts/SessionContext';

export function useUser() {
    const { token } = useSession();

    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: !!token,
    });
}

export function useChangePassword() {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            router.back();
            Toast.show({
                type: 'success',
                text1: 'Password changed',
                position: 'bottom',
            });
        },
        onError: () => {
            Toast.show({
                type: 'error',
                text1: 'Could not change password',
                text2: 'Check your current password',
                position: 'bottom',
            });
        },
    });
}

export function useDeleteAccount() {
    const queryClient = useQueryClient();
    const { signOut } = useSession();

    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: async () => {
            queryClient.clear();
            await signOut();
            Toast.show({
                type: 'success',
                text1: 'Account deleted.',
                position: 'bottom',
            });
        },
        onError: () => {
            Toast.show({
                type: 'error',
                text1: 'Could not delete account',
                position: 'bottom',
            });
        },
    });
}
