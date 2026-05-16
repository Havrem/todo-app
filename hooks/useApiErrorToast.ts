import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

type ContextOverrides = {
    byStatus?: Record<number, string>;
    fallback?: string;
};

export function useApiErrorToast() {
    const { t } = useTranslation();

    return (error: unknown, context?: ContextOverrides) => {
        const key = pickKey(error, context);
        Toast.show({
            type: 'error',
            text1: t(`${key}.title` as never),
            text2: t(`${key}.body` as never),
            position: 'bottom',
        });
    };
}

function pickKey(error: unknown, context?: ContextOverrides): string {
    if (!axios.isAxiosError(error) || !error.response) return 'errors:network';
    return context?.byStatus?.[error.response.status]
        ?? context?.fallback
        ?? 'errors:generic';
}
