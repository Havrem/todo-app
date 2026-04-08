import { useCategories } from "@/hooks/useCategories";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "../basics/Button";
import { Title } from "../basics/Title";
import { useTheme } from "@/contexts/ThemeContext";
import { useMemo } from "react";
import { Theme } from "@/constants/themes";
import { CategoryCard } from "../cards/CategoryCard";

export function Categories() {
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { data: categories } = useCategories();

  return (
    <View style={styles.container}>
      <Title text="Categories" icon={<MaterialCommunityIcons name="view-grid-plus" />} />
      <ScrollView contentContainerStyle={styles.list} horizontal showsHorizontalScrollIndicator={false}>
          {categories?.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
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
          marginBottom: 10
        },
        list: {
          gap: 10
        }
    })
}
