import { useLists } from "@/hooks/useLists";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Button } from "../basics/Button";
import { Title } from "../basics/Title";
import { useTheme } from "@/contexts/ThemeContext";
import { useMemo } from "react";
import { Theme } from "@/constants/themes";

export function Categories() {
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { data: lists } = useLists();

  const bookmarked = lists?.filter((l) => l.bookmarked) ?? [];

  return (
    <View style={styles.container}>
      <Title text="Categories" icon={<MaterialCommunityIcons name="view-grid-plus" />} />
      {bookmarked.map((list) => (
        <Button
          key={list.id}
          text={list.title}
          icon={<Ionicons name="chevron-forward" />}
          onPress={() => {}}
        />
      ))}
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
    })
}