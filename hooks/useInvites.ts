import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { acceptInvite, declineInvite, getInvites, inviteToList } from '@/api/invite';
import { InviteEmailInput } from '@/schemas/invite';
import { useApiErrorToast } from '@/hooks/useApiErrorToast';

export function useInvites() {
    return useQuery({
        queryKey: ['invites'],
        queryFn: getInvites,
    });
}

export function useInviteToList(listId: number) {
    const { t } = useTranslation('share');
    const showError = useApiErrorToast();

    return useMutation({
        mutationFn: (input: InviteEmailInput) => inviteToList(listId, input),
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: t('inviteSent.title'),
                position: 'bottom',
            });
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) return;
            showError(error, {
                byStatus: {
                    409: 'share:errors.alreadyMember',
                },
            });
        },
    });
}

export function useAcceptInvite() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: acceptInvite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invites'] });
            queryClient.invalidateQueries({ queryKey: ['lists'] });
        },
    });
}

export function useDeclineInvite() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: declineInvite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invites'] });
        },
    });
}
