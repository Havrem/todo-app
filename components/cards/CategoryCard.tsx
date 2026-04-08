import { IconKey, IconRegistry } from "@/constants/icons";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { Category } from "@/schemas/category";
import { useEffect, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { useDeleteCategory } from "@/hooks/useCategories";
import { Ionicons } from "@expo/vector-icons";

export function CategoryCard({ category, editMode, onLongPress }: { category: Category, editMode: boolean, onLongPress: () => void }) {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    const Icon = IconRegistry[category.icon as IconKey];

    const { mutate: deleteCategory } = useDeleteCategory();
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (editMode) {
            rotation.value = withRepeat(
                withSequence(
                    withTiming(-2, { duration: 60 }),
                    withTiming(2, {duration: 120}),
                    withTiming(0, {duration: 60})
                ),
                -1,
                true
            );
        } else {
            rotation.value = withTiming(0);
        }
    }, [editMode]);

    const wiggleStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg`}]
    }));

   return (
        <Animated.View style={wiggleStyle} shouldRasterizeIOS renderToHardwareTextureAndroid >
            <Pressable
                onLongPress={onLongPress}
                delayLongPress={400}
                style={styles.wrapper}
            >
                <LinearGradient
                    colors={theme.category.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.container}
                >
                    {Icon && <Icon size={32} color={theme.category.nameColor} />}
                    <Text style={styles.txt}>{category.name}</Text>
                </LinearGradient>

                {editMode && (
                    <Pressable
                        onPress={() => deleteCategory(category.id)}
                        hitSlop={10}
                        style={styles.deleteX}
                    >
                        <Ionicons name="close-circle" size={22} color="white" />
                    </Pressable>
                )}
            </Pressable>
        </Animated.View>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        wrapper: {
            width: 130,
            borderRadius: 10,
            marginVertical: 5,

            // shadowColor: '#00000020',
            // shadowOffset: { width: 3, height: 5 },
            // shadowOpacity: 1,
            // shadowRadius: 3,

            // borderWidth: 0.5,
            // borderColor: 'rgba(255, 255, 255, 0.52)',
        },
        container: {
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        txt: {
            fontFamily: t.font.family.button,
            fontSize: t.font.size.medium,
            color: t.category.nameColor
        },
        deleteX: {
            position: 'absolute',
            top: -6,
            right: -6,
        },
    })
}
