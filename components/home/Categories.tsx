import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategories } from "@/hooks/useCategories";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Title } from "../basics/ActiveTitle";
import { CategoryCard } from "../cards/CategoryCard";
import { router } from "expo-router";

export function Categories({ editMode, setEditMode }: {editMode: boolean, setEditMode: (v: boolean) => void}) {
  const { t } = useTranslation('home');
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { data: categories } = useCategories();

  return (
    <View style={styles.container}>
      <Title
        text={t('categories')}
        icon={<MaterialCommunityIcons name="view-grid-plus" />}
        onPress={() => router.push('/create-category')}
      />
      <ScrollView
        contentContainerStyle={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} editMode={editMode} onLongPress={() => setEditMode(true)}/>
        ))}
      </ScrollView>
    </View>
  );
}

const makeStyles = (t: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: t.colors.content,
      paddingVertical: 20,
      paddingHorizontal: 15,
      gap: 10,
      marginBottom: 10,
    },
    list: {
      gap: 10,
    },
  });
};
