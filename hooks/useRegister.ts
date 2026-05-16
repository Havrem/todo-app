import { useMutation } from '@tanstack/react-query';
import { registerUser } from "@/api/auth";
import { useSession } from "@/contexts/SessionContext";
import { useApiErrorToast } from "@/hooks/useApiErrorToast";

export function useRegister() {
    const { signIn } = useSession();
    const showError = useApiErrorToast();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: async ({accessToken}) => {
            await signIn(accessToken);
        },
        onError: (error) => showError(error, {
            byStatus: { 409: 'start:errors.emailTaken' },
        }),
    })
}
