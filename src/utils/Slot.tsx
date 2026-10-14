import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { composeRefs } from './refs.js';
import { cx } from './cx.js';

type AnyProps = Record<string, unknown>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...slotProps, ...childProps };
  // A disabled slot (aria-disabled) must stop the child's own handlers: an <a> or a router Link has no
  // native `disabled`, so the slot's handler is the only gate between a click and a navigation.
  const slotDisabled = slotProps['aria-disabled'] === true || slotProps['aria-disabled'] === 'true';
  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (slotDisabled && /^on[A-Z]/.test(key) && typeof slotValue === 'function') {
      merged[key] = slotValue;
    } else if (/^on[A-Z]/.test(key) && typeof slotValue === 'function' && typeof childValue === 'function') {
      merged[key] = (...args: unknown[]) => {
        (childValue as (...a: unknown[]) => void)(...args);
        (slotValue as (...a: unknown[]) => void)(...args);
      };
    } else if (key === 'style') {
      merged[key] = { ...(slotValue as CSSProperties), ...(childValue as CSSProperties) };
    } else if (key === 'className') {
      merged[key] = cx(slotValue as string, childValue as string);
    }
  }
  return merged;
}

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/**
 * Renders its single child element with the Slot's props, className, style and ref merged onto it.
 * Powers `asChild`: `<Button asChild><a href="/contact">Contact</a></Button>` renders one styled `<a>`.
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(function Slot({ children, ...slotProps }, forwardedRef) {
  const child = Children.only(children);
  if (!isValidElement(child)) return null;
  const element = child as ReactElement<AnyProps> & { ref?: Ref<HTMLElement> };
  // React 18 keeps the ref on the element, React 19 on props.
  const childRef = (element.props.ref as Ref<HTMLElement> | undefined) ?? element.ref;
  return cloneElement(element, {
    ...mergeProps(slotProps as AnyProps, element.props),
    ref: composeRefs(forwardedRef, childRef),
  } as AnyProps);
});
