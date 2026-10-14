import { forwardRef, useId, type CSSProperties, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import { Icon, type IconName } from '../Icon/Icon.js';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className' | 'style'> {
  /** Visible label, connected to the input with `<label for>`. Always required: never use the placeholder as a label. */
  label: ReactNode;
  /** Visually hides the label but keeps it announced (Figma `Show label` = false). Use only when context makes the purpose obvious, e.g. a search field. */
  hideLabel?: boolean;
  /** Helper text under the input (Figma `Helper`). Replaced by `error` or a `success` message when those are set. */
  helperText?: ReactNode;
  /**
   * Error message. When set, the field shows the Error state: red outline, `alert-circle` icon, `aria-invalid="true"`,
   * and this message replaces `helperText`. Say how to fix it: "Enter a valid email address", not "Invalid".
   */
  error?: ReactNode;
  /**
   * Success state: green outline and `check-circle` icon. Pass a string to also show a success message in place of
   * `helperText`. Ignored while `error` is set. Use it only when it helps (e.g. "Username available").
   */
  success?: boolean | string;
  /** Optional trailing icon inside the input (Figma `Show trailing icon` + `Trailing icon`), e.g. `search`. Decorative. */
  endIcon?: IconName;
  /**
   * Class for the root wrapper `<div class="ns-text-field">` (label + input box + message), merged with `cx()`.
   * Note: `ref` and every other native prop go to the `<input>`; only `className` and `style` go to the wrapper.
   */
  className?: string;
  /** Inline style for the root wrapper. */
  style?: CSSProperties;
}

/**
 * Labelled single-line text input with helper / validation message and optional trailing icon.
 *
 * - `ref` and all native input props (`value`, `defaultValue`, `onChange`, `onBlur`, `type`, `name`, `required`,
 *   `disabled`, `autoComplete`…) go to the `<input>`, so it works controlled or uncontrolled.
 * - `className` and `style` go to the root wrapper `<div class="ns-text-field">`.
 * - Hover, Focused and Filled come from CSS; Disabled from the native `disabled` attribute.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    label,
    hideLabel = false,
    helperText,
    error,
    success = false,
    endIcon,
    className,
    style,
    id,
    required,
    disabled,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? `${autoId}-input`;
  const messageId = `${autoId}-message`;

  const hasError = error != null && error !== false && error !== '';
  const isSuccess = !hasError && success !== false && success !== '';
  const message: ReactNode = hasError ? error : isSuccess && typeof success === 'string' ? success : helperText;
  const hasMessage = message != null && message !== false && message !== '';
  const statusIcon: IconName | undefined = hasError ? 'alert-circle' : isSuccess ? 'check-circle' : undefined;
  const describedBy = cx(hasMessage && messageId, ariaDescribedBy) || undefined;

  return (
    <div
      className={cx(
        'ns-text-field',
        hasError && 'ns-text-field--error',
        isSuccess && 'ns-text-field--success',
        disabled && 'ns-text-field--disabled',
        className,
      )}
      style={style}
    >
      <label htmlFor={inputId} className={cx('ns-text-field__label', hideLabel && 'ns-visually-hidden')}>
        {label}
        {required && <span className="ns-text-field__required"> (required)</span>}
      </label>
      <div className="ns-text-field__control">
        <input
          ref={ref}
          id={inputId}
          className="ns-text-field__input"
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {endIcon && <Icon name={endIcon} size="md" className="ns-text-field__icon" />}
        {statusIcon && <Icon name={statusIcon} size="md" className="ns-text-field__status-icon" />}
      </div>
      {hasMessage && (
        <p id={messageId} className="ns-text-field__message">
          {hasError && <span className="ns-visually-hidden">Error:</span>}
          {hasError && ' '}
          {message}
        </p>
      )}
    </div>
  );
});
