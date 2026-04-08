import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

type IconProps = { size: number; color: string };
type IconRenderer = (props: IconProps) => React.JSX.Element;

export const IconRegistry = {
    general: (p: IconProps) => <MaterialIcons name="folder" {...p} />,
    tasks: (p: IconProps) => <MaterialCommunityIcons name="format-list-checks" {...p} />,
    food: (p: IconProps) => <MaterialCommunityIcons name="noodles" {...p} />,
    shopping: (p: IconProps) => <Ionicons name="bag" {...p} />,
    travel: (p: IconProps) => <MaterialCommunityIcons name="airplane" {...p} />,
    gifts: (p: IconProps) => <MaterialCommunityIcons name="gift" {...p} />,
    fitness: (p: IconProps) => <MaterialCommunityIcons name="dumbbell" {...p} />,
    collections: (p: IconProps) => <MaterialIcons name="collections" {...p} />,
} satisfies Record<string, IconRenderer>;

export type IconKey = keyof typeof IconRegistry;
