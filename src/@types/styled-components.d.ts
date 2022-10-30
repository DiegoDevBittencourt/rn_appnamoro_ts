
import { theme } from '@constants/StyledComponentsTheme';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface { };
}
