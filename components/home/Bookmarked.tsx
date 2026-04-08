import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useLists } from "@/hooks/useLists";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "../basics/ActiveTitle";
import { Button } from "../basics/Button";
import { router } from "expo-router";

export function Bookmarked() {
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { data: lists } = useLists();

  const bookmarked = lists?.filter((l) => l.bookmarked) ?? [];

  return (
    <View style={styles.container}>
      <Title text="Bookmarked" icon={<Ionicons name="bookmarks" />} onPress={() => console.log('Pressed bookmarked')}/>
      {bookmarked.map((list) => (
        <Button
          key={list.id}
          text={list.title}
          icon={<Ionicons name="chevron-forward" />}
          onPress={() => router.push(`/list/${list.id}`)}
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
      marginBottom: 10,
    },
  });
};
