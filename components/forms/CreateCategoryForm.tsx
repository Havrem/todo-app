import { IconKey, IconRegistry } from "@/constants/icons";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCreateCategory } from "@/hooks/useCategories";
import { CreateCategoryInput, createCategorySchema } from "@/schemas/category";
import { Entypo } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../basics/Button";

export function CreateCategoryForm() {
    const { mutate: createCategory } = useCreateCategory();
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCategoryInput>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: { name: '', icon: '' },
    })

    const onSubmit = (data : CreateCategoryInput) =>
        createCategory( data );

    return (
      <>
        <View style={styles.top}>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.input}>
                    <TextInput
                        placeholder="Name..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[styles.txt, { textAlign: 'left' }]}
                    />
                    {errors.name && <Entypo name="info-with-circle" size={20} color="red" />}
                </View>
                )}
                name="name"
            />
            {errors.name && <Text style={[styles.error, { textAlign: 'left'}]}>{errors.name.message}</Text>}

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <View style={styles.iconGrid}>
                        {(Object.keys(IconRegistry) as IconKey[]).map((key) => {
                            const Icon = IconRegistry[key];
                            const selected = value === key;
                            return (
                                <Pressable
                                    key={key}
                                    onPress={() => onChange(key)}
                                >
                                    <LinearGradient
                                        colors={theme.category.gradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={[styles.iconTile, selected && styles.iconTileSelected]}
                                    >
                                        <Icon size={28} color={theme.colors.accent} />
                                    </LinearGradient>
                                </Pressable>
                            );
                        })}
                    </View>
                )}
                name="icon"
            />
            {errors.icon && <Text style={[styles.error, { textAlign: 'left'}]}>{errors.icon.message}</Text>}
        </View>

        <View style={styles.bottom}>
          <Button text="Create" onPress={handleSubmit(onSubmit)}/>
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
            borderBottomWidth: 1
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
        iconGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            paddingVertical: 10,
            justifyContent: 'space-between',
            // borderColor: 'red',
            // borderWidth: 1
        },
        iconTile: {
            width: 64,
            height: 64,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'transparent',
        },
        iconTileSelected: {
            borderColor: t.colors.icon,
        },
    })
}
