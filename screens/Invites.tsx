import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useAcceptInvite, useDeclineInvite, useInvites } from "@/hooks/useInvites";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Invites() {
    const { t } = useTranslation(['invites', 'common']);
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const { data: invites } = useInvites();
    const { mutate: accept } = useAcceptInvite();
    const { mutate: decline } = useDeclineInvite();

    return (
        <View style={styles.container}>
            <Header
                text={t('invites:title')}
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
            />
            <View style={styles.content}>
                {(!invites || invites.length === 0) && (
                    <Text style={styles.empty}>{t('invites:empty')}</Text>
                )}
                {invites?.map((invite) => (
                    <View key={invite.id} style={styles.row}>
                        <View style={styles.info}>
                            <Text style={styles.title}>{invite.listTitle}</Text>
                            <Text style={styles.subtitle}>
                                {t('invites:invitedBy', { email: invite.inviterEmail })}
                            </Text>
                        </View>
                        <View style={styles.actions}>
                            <Pressable style={styles.respondBtn} onPress={() => accept(invite.id)}>
                                <Text>{t('invites:accept')}</Text>
                            </Pressable>
                            <Pressable style={styles.respondBtn} onPress={() => decline(invite.id)}>
                                <Text>{t('invites:decline')}</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const makeStyles = (t: Theme) => StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: t.colors.background,
        flex: 1,
    },
    content: {
        backgroundColor: t.colors.content,
        padding: 10,
        flex: 1,
        gap: 10,
    },
    row: {
        backgroundColor: t.colors.accent,
        borderRadius: 5,
        padding: 15,
        gap: 10,
    },
    info: {
        gap: 4,
        alignItems: 'center'
    },
    title: {
        fontFamily: t.font.family.button,
        fontSize: t.font.size.medium,
        color: t.colors.text,
    },
    subtitle: {
        fontFamily: t.font.family.body,
        fontSize: t.font.size.small,
        color: t.colors.subtle,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    empty: {
        fontFamily: t.font.family.body,
        fontSize: t.font.size.medium,
        color: t.colors.subtle,
        textAlign: 'center',
        marginTop: 30,
    },
    respondBtn: {
        backgroundColor: t.colors.accentMedium,
        padding: 12,
        alignItems: 'center',
        flex: 1
    },
});
