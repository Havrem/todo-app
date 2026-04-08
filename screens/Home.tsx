import { Header } from "@/components/basics/Header";
import { Bookmarked } from "@/components/home/Bookmarked";
import { Categories } from "@/components/home/Categories";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from 'react-native-worklets';

export function Home() {
    const { t } = useTranslation('home');
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme])
    const [editMode, setEditMode] = useState(false);

    const exitTap = Gesture.Tap().onEnd(() => {
        scheduleOnRN(setEditMode, false);
    })

    return (
        <GestureDetector gesture={exitTap}>
            <ScrollView style={styles.container}>
                <Header text={t('title')} />
                <Bookmarked />
                <Categories editMode={editMode} setEditMode={setEditMode}/>
            </ScrollView>
        </GestureDetector>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: t.colors.background,
            flex: 1,
        },
    })
}