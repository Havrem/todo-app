import { useChangePassword } from "@/hooks/useUser";
import { UpdatePassword, updatePasswordSchema } from "@/schemas/auth";
import { Entypo } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../basics/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useMemo } from "react";
import { Theme } from "@/constants/themes";
import { useTranslation } from "react-i18next";

export function UpdatePasswordForm() {
    const { t } = useTranslation('common');
    const { mutate: changePassword } = useChangePassword();
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdatePassword>({
        resolver: zodResolver(updatePasswordSchema)
    })

    const onSubmit = ({ currentPassword, newPassword }: UpdatePassword) =>
        changePassword({ currentPassword, newPassword });

    return (
      <>
        <View style={styles.top}>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.input}>
                    <TextInput
                        placeholder="Current password..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password"
                        value={value}
                        style={[styles.txt, { textAlign: 'left' }]}
                    />
                    {errors.currentPassword && <Entypo name="info-with-circle" size={20} color="red" />}
                </View>
                )}
                name="currentPassword"
            />
            {errors.currentPassword && <Text style={[styles.error, { textAlign: 'left'}]}>{errors.currentPassword.message}</Text>}

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                        <TextInput
                            placeholder="New password..."
                            onBlur={onBlur}
                            onChangeText={onChange}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="password-new"
                            value={value}
                            style={[styles.txt, { textAlign: 'left' }]}
                        />
                        {errors.newPassword && <Entypo name="info-with-circle" size={20} color="red" />}
                    </View>
                )}
                name="newPassword"
            />
            {errors.newPassword && <Text style={[styles.error, { textAlign: 'left'}]}>{errors.newPassword.message}</Text>}

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Confirm new password..."
                            onBlur={onBlur}
                            onChangeText={onChange}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="password-new"
                            value={value}
                            style={[styles.txt, { textAlign: 'left' }]}
                        />
                        {errors.confirmPassword && <Entypo name="info-with-circle" size={20} color="red" />}
                    </View>
                )}
                name="confirmPassword"
            />
            {errors.confirmPassword && <Text style={[styles.error, { textAlign: 'left'}]}>{errors.confirmPassword.message}</Text>}
        </View>

        <View style={styles.bottom}>
          <Button text={t('update')} onPress={handleSubmit(onSubmit)}/>
        </View>
      </>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        top: {
            padding: 10,
            backgroundColor: t.colors.content,
            flex: 1,
            gap: 10,
            marginBottom: 10
        },
        bottom: {
            padding: 10,
            backgroundColor: t.colors.content,
            marginTop: 'auto'
        },
        input: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            marginHorizontal: 5,
            gap: 10,
            borderColor: 'black',
            borderBottomWidth: 1,
            // backgroundColor: t.colors.accentSubtle
        },
        txt: {
            fontFamily: t.font.family.body,
            fontSize: t.font.size.small,
            color: t.colors.subtle,
            flex: 1
        },
        error: {
            color: 'red',
            paddingHorizontal: 5,
            fontSize: 12,
            textAlign: 'left'
        },
    })
}