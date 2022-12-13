
import { theme } from '@constants/styledComponentsTheme';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface { };
}
