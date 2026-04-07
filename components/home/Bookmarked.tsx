import { List } from "@/schemas/list";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Title } from "../basics/Title";

export function Bookmarked() {
// export function Bookmarked({ lists }: { lists: List }) {
  return (
    <View style={styles.container}>
      <Title text="Bookmarked" icon={<Ionicons name="bookmarks" />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDE6DC",
    padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  h1: {
    fontFamily: "Glory-Bold",
    color: "rgba(0, 0, 0, 0.59)",
    fontSize: 16,
  },
});
