// @nicasource/ds — public API. Import everything from the package root:
//   import { Button, ThemeProvider, tokens } from '@nicasource/ds';
// The lead maintains this file; component agents never edit it.

export * from './tokens/index.js';
export * from './theme/index.js';
export { cx, Slot, type SlotProps } from './utils/index.js';
export { iconNames, iconCategories } from './icons/generated.js';

export { Icon, type IconProps, type IconSize, type IconColor, type IconName } from './components/Icon/index.js';
export { Logo, type LogoProps, type LogoVariant } from './components/Logo/index.js';
export { NSMark, type NSMarkProps, type NSMarkColor } from './components/NSMark/index.js';
export { TextField, type TextFieldProps } from './components/TextField/index.js';
export { Tag, type TagProps, type TagVariant, type TagColor, type TagSize } from './components/Tag/index.js';
export {
  StepNumber,
  type StepNumberProps,
  type StepNumberSize,
  type StepNumberTone,
} from './components/StepNumber/index.js';
export {
  PortfolioCard,
  type PortfolioCardProps,
  type PortfolioCardImage,
  type PortfolioCardTag,
} from './components/PortfolioCard/index.js';
export { Stepper, type StepperProps, type StepperStep, type StepperStepState } from './components/Stepper/index.js';
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button/index.js';
export {
  IconButton,
  type IconButtonProps,
  type IconButtonBaseProps,
  type IconButtonLabelProps,
  type IconButtonVariant,
  type IconButtonSize,
} from './components/IconButton/index.js';
export { NavLink, type NavLinkProps } from './components/NavLink/index.js';
export {
  SiteHeader,
  type SiteHeaderProps,
  type SiteHeaderLogoVariant,
  type SiteLink,
  type SiteLinkRenderProps,
  type RenderSiteLink,
} from './components/SiteHeader/index.js';
export {
  SiteFooter,
  type SiteFooterProps,
  type SiteFooterSocial,
  type SiteFooterLogoVariant,
  type SiteFooterSurface,
} from './components/SiteFooter/index.js';
