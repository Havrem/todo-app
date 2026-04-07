import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Title } from "../basics/Title";

export function Categories() {
  return (
    <View style={styles.container}>
      <Title
        text="Categories"
        icon={<MaterialCommunityIcons name="view-grid-plus" />}
      />
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
