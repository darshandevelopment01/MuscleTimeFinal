import MaterialIcons from "@expo/vector-icons/MaterialIcons";

/**
 * Add your SF Symbols → Material Icons mappings here
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}) {
  return (
    <MaterialIcons
      name={MAPPING[name]}
      size={size}
      color={color}
      style={style}
    />
  );
}