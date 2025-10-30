import { useTheme } from '../context/ThemeContext';

export function useThemeColor(
{ props, colorName }: { props: { light?: string; dark?: string; }; colorName: keyof typeof useTheme; }().colors
) ;{
  const theme = useTheme();
  const colorFromProps = theme.isDark ? props.dark : props.light;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme.colors[colorName];
  }
}