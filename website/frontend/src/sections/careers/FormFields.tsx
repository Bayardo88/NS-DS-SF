import { useId, useState, type ChangeEvent, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes, type InputHTMLAttributes } from 'react';
import { Icon } from '@nicasource/ds';
import './FormFields.css';

/*
 * Local form controls the DS doesn't have yet (Select, TextArea, FileField — DS request to file).
 * They mirror the DS TextField: same label, box, hover/focus/error states and message, built from
 * semantic tokens only.
 */

interface FieldShellProps {
  id: string;
  label: ReactNode;
  required?: boolean;
  error?: string;
  helperText?: ReactNode;
  className?: string;
  children: ReactNode;
}

function messageId(id: string) {
  return `${id}-message`;
}

function FieldShell({ id, label, required, error, helperText, className, children }: FieldShellProps) {
  const message = error || helperText;
  return (
    <div className={`job-field ${error ? 'job-field--error' : ''} ${className ?? ''}`}>
      <label htmlFor={id} className="job-field__label">
        {label}
        {required && <span className="job-field__required"> (required)</span>}
      </label>
      {children}
      {message && (
        <p id={messageId(id)} className="job-field__message">
          {error && <span className="visually-hidden">Error: </span>}
          {message}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, helperText?: ReactNode) {
  return error || helperText ? messageId(id) : undefined;
}

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: ReactNode;
  options: string[];
  placeholder?: string;
  error?: string;
  helperText?: ReactNode;
  className?: string;
}

export function SelectField({ label, options, placeholder = 'Select…', error, helperText, className, id, required, ...rest }: SelectFieldProps) {
  const autoId = useId();
  const fieldId = id ?? `${autoId}-select`;
  return (
    <FieldShell id={fieldId} label={label} required={required} error={error} helperText={helperText} className={className}>
      <div className="job-field__control">
        <select
          id={fieldId}
          className="job-field__input job-field__select"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, error, helperText)}
          defaultValue=""
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size="md" className="job-field__icon" />
        {error && <Icon name="alert-circle" size="md" className="job-field__status-icon" />}
      </div>
    </FieldShell>
  );
}

export interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: ReactNode;
  error?: string;
  helperText?: ReactNode;
  className?: string;
  /** Rendered inside the box, bottom-right (the submit button in the Contact Module). */
  action?: ReactNode;
}

export function TextAreaField({ label, error, helperText, className, action, id, required, ...rest }: TextAreaFieldProps) {
  const autoId = useId();
  const fieldId = id ?? `${autoId}-textarea`;
  return (
    <FieldShell id={fieldId} label={label} required={required} error={error} helperText={helperText} className={className}>
      <div className="job-field__control job-field__control--multiline">
        <textarea
          id={fieldId}
          className="job-field__input job-field__textarea"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, error, helperText)}
          {...rest}
        />
        {action && <div className="job-field__action">{action}</div>}
      </div>
    </FieldShell>
  );
}

export interface FileFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  label: ReactNode;
  placeholder?: string;
  error?: string;
  helperText?: ReactNode;
  className?: string;
}

export function FileField({ label, placeholder = 'Choose a file', error, helperText, className, id, required, onChange, ...rest }: FileFieldProps) {
  const autoId = useId();
  const fieldId = id ?? `${autoId}-file`;
  const [fileName, setFileName] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFileName(event.target.files?.[0]?.name ?? '');
    onChange?.(event);
  }

  return (
    <FieldShell id={fieldId} label={label} required={required} error={error} helperText={helperText} className={className}>
      <div className="job-field__control job-field__control--file">
        <span className={`job-field__file-name ${fileName ? 'job-field__file-name--filled' : ''}`} aria-hidden="true">
          {fileName || placeholder}
        </span>
        <input
          id={fieldId}
          type="file"
          className="job-field__file-input"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, error, helperText)}
          onChange={handleChange}
          {...rest}
        />
        <Icon name="upload" size="md" className="job-field__icon" />
        {error && <Icon name="alert-circle" size="md" className="job-field__status-icon" />}
      </div>
    </FieldShell>
  );
}
