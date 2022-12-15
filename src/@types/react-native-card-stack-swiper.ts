
import CardStack from 'react-native-card-stack-swiper';

type ThemeInterface = typeof CardStack;

declare module 'react-native-card-stack-swiper' {
  interface DefaultTheme extends ThemeInterface { };
}
