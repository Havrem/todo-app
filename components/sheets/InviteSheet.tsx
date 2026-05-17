import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useInviteToList } from "@/hooks/useInvites";
import { inviteEmailSchema, InviteEmailInput } from "@/schemas/invite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { forwardRef, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    listId: number;
};

export const InviteSheet = forwardRef<BottomSheetModal, Props>(({ listId }, ref) => {
    const { t } = useTranslation(['share', 'common']);
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const { mutate: invite, isPending } = useInviteToList(listId);

    const { control, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm<InviteEmailInput>({
        resolver: zodResolver(inviteEmailSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = (data: InviteEmailInput) => {
        invite(data, {
            onSuccess: () => {
                reset();
                if (ref && 'current' in ref) ref.current?.dismiss();
            },
            onError: (e) => {
                if (axios.isAxiosError(e) && e.response?.status === 404) {
                    setError('email', { message: t('share:errors.userNotFound.title') });
                }
            },
        });
    };

    return (
        <BottomSheetModal
            ref={ref}
            enableDynamicSizing
            keyboardBehavior="interactive"
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
            )}
        >
            <BottomSheetView style={styles.content}>
                <View style={styles.row}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder={t('share:emailPlaceholder')}
                                placeholderTextColor={theme.colors.subtle}
                                value={value}
                                onChangeText={(text) => {
                                    if (errors.email) clearErrors('email');
                                    onChange(text);
                                }}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoCorrect={false}
                            />
                        )}
                    />
                    <Pressable
                        style={[styles.submitBtn, isPending && { opacity: 0.5 }]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={isPending}
                    >
                        <MaterialCommunityIcons name="share" size={24} color={theme.colors.icon}/>
                    </Pressable>
                </View>
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </BottomSheetView>
        </BottomSheetModal>
    );
});

InviteSheet.displayName = 'InviteSheet';

const makeStyles = (t: Theme) => StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingBottom: 30,
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    input: {
        backgroundColor: t.colors.accent,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 5,
        fontFamily: t.font.family.body,
        fontSize: t.font.size.medium,
        color: t.colors.text,
        textAlign: 'center',
        flex: 1,
    },
    error: {
        fontFamily: t.font.family.body,
        fontSize: 13,
        color: '#c0392b',
        textAlign: 'center',
    },
    submitBtn: {
        backgroundColor: t.colors.accent,
        padding: 12,
        alignItems: 'center',
    },
});
