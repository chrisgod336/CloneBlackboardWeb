import React from 'react';
import { Form as BootstapForm } from 'react-bootstrap';
import { Input, BootstrapInputProps } from './Input';

type ButtonPosition = 'top' | 'bottom';
type ButtonAlign = 'left' | 'center' | 'right';

type BootstrapFormProps = {
  inputs: BootstrapInputProps[];
  buttons?: {
    position: ButtonPosition;
    align?: ButtonAlign;
    elements: React.ReactNode[];
  }[];
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form: React.FC<BootstrapFormProps> = ({ inputs, buttons = [], onSubmit }) => {
  const getButtons = (position: ButtonPosition) =>
    buttons.filter(b => b.position === position);

  const renderButtonGroup = (position: ButtonPosition) => {
    const groups = getButtons(position);

    return groups.map((group, index) => {
      let justifyClass = 'justify-content-end';
      if (group.align === 'left') justifyClass = 'justify-content-start';
      else if (group.align === 'center') justifyClass = 'justify-content-center';

      return (
        <div className={`d-flex ${justifyClass} gap-2 mb-3`} key={`${position}-${index}`}>
          {group.elements}
        </div>
      );
    });
  };

  return (
    <BootstapForm onSubmit={onSubmit}>
      {renderButtonGroup('top')}

      {inputs.map((input, idx) => (
        <Input key={idx} {...input} />
      ))}

      {renderButtonGroup('bottom')}
    </BootstapForm>
  );
};
