import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { changePassword, deleteAccount, getUser } from '@/api/user';
import { useSession } from '@/contexts/SessionContext';
import { useApiErrorToast } from '@/hooks/useApiErrorToast';

export function useUser() {
    const { token } = useSession();

    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: !!token,
    });
}

export function useChangePassword() {
    const { t } = useTranslation('changePassword');
    const showError = useApiErrorToast();

    return useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            router.back();
            Toast.show({
                type: 'success',
                text1: t('success.title'),
                position: 'bottom',
            });
        },
        onError: (error) => showError(error, {
            byStatus: { 400: 'changePassword:errors.wrongCurrentPassword' },
        }),
    });
}

export function useDeleteAccount() {
    const queryClient = useQueryClient();
    const { signOut } = useSession();
    const { t } = useTranslation('deleteAccount');
    const showError = useApiErrorToast();

    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: async () => {
            queryClient.clear();
            await signOut();
            Toast.show({
                type: 'success',
                text1: t('success.title'),
                position: 'bottom',
            });
        },
        onError: (error) => showError(error, {
            fallback: 'deleteAccount:errors.generic',
        }),
    });
}
