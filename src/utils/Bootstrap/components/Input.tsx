import React from 'react';
import { Form } from 'react-bootstrap';

type InputType =
  | 'text' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio'
  | 'number' 
  | 'password' 
  | 'email' 
  | 'date';

type Option = { 
    label: string; 
    value: string | number 
};

export type BootstrapInputProps = {
  type: InputType;
  label?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<any>) => void;
  name: string;
  id?: string;
  placeholder?: string;
  options?: Option[];
  checked?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
};

export const Input: React.FC<BootstrapInputProps> = ({
  type, 
  label, 
  value, 
  onChange, 
  name, 
  id,
  placeholder, 
  options = [], 
  checked, 
  multiple,
  disabled, 
  readOnly, 
  className
}) => {
  const inputId = id || name;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return <Form.Control as="textarea" {...baseProps} />;
      case 'select':
        return (
          <Form.Select {...baseProps} multiple={multiple}>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </Form.Select>
        );
      case 'checkbox':
      case 'radio':
        return options.length > 0
          ? options.map((opt, i) => (
              <Form.Check
                key={i}
                type={type}
                id={`${inputId}-${i}`}
                name={name}
                label={opt.label}
                value={opt.value}
                checked={
                  Array.isArray(value) ? value.includes(opt.value) : value === opt.value
                }
                onChange={onChange}
                disabled={disabled}
              />
            ))
          : (
              <Form.Check
                type={type}
                id={inputId}
                name={name}
                label={label}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
              />
            );
      default:
        return <Form.Control type={type} {...baseProps} />;
    }
  };

  const baseProps = {
    id: inputId,
    name,
    value,
    onChange,
    placeholder,
    disabled,
    readOnly,
    className,
  };

  return (
    <div className="mb-3">
      {label && type !== 'checkbox' && type !== 'radio' && <Form.Label><b>{label}</b></Form.Label>}
      {renderInput()}
    </div>
  );
};
