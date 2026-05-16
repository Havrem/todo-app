import { useMutation } from '@tanstack/react-query';
import { loginUser } from "@/api/auth";
import { useSession } from "@/contexts/SessionContext";
import { useApiErrorToast } from "@/hooks/useApiErrorToast";

export function useLogin() {
    const { signIn } = useSession();
    const showError = useApiErrorToast();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: async ({accessToken}) => {
            await signIn(accessToken);
        },
        onError: (error) => showError(error, {
            byStatus: { 401: 'start:errors.invalidCredentials' },
        }),
    })
}
