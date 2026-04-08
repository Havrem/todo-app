import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { Theme, ThemeName, themes } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

export function SwitchTheme() {
    const { t } = useTranslation(['switchTheme', 'common']);
    const { theme, themeName, setTheme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const [selected, setSelected] = useState<ThemeName>(themeName);

    const handleUpdate = async () => {
        await setTheme(selected);
        router.back();
    };

    return (
        <View style={styles.container}>
            <Header
                text={t('title')}
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
            />
            <View style={styles.top }>
                <View style={styles.swatchRow}>
                    {(Object.entries(themes) as [ThemeName, Theme][]).map(([name, t]) => (
                        <View key={name} style={[selected === name && styles.swatchSelected]}>
                            <Pressable
                                onPress={() => setSelected(name)}
                                style={[
                                    styles.swatch,
                                    { backgroundColor: t.colors.background }
                                ]}
                            />
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.bottom}>
                <Button text={t('common:update')} onPress={handleUpdate}/>
            </View>
        </View>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: t.colors.background,
            flex: 1,
        },
        top: {
            padding: 10,
            backgroundColor: t.colors.content,
            flex: 1,
            marginBottom: 10
        },
        bottom: {
            padding: 10,
            backgroundColor: t.colors.content,
            gap: 10
        },
        swatchRow: {
            flexDirection: 'row',
            gap: 15,
            padding: 10,
        },
        swatch: {
            width: 60,
            height: 60,
            borderRadius: 8,
            margin: 5
        },
        swatchSelected: {
            borderBottomWidth: 3,
            borderColor: 'white'
        }
    })
}
