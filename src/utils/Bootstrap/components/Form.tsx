import React from 'react';
import { Form as BootstrapForm, Row, Col } from 'react-bootstrap';
import { Input, BootstrapInputProps } from './Input';

type ButtonPosition = 'top' | 'bottom';
type ButtonAlign = 'left' | 'center' | 'right';

type RadioGroup = {
  groupLabel: string;
  inputs: BootstrapInputProps[];
};

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

  const groupRadioInputs = (inputs: Array<any>): (BootstrapInputProps | RadioGroup)[] => {
    const result: (BootstrapInputProps | RadioGroup)[] = [];
    let currentGroup: RadioGroup | null = null;

    inputs.forEach(input => {
      if (input.type === 'radio') {
        if (!currentGroup || currentGroup.groupLabel !== input.label) {
          if (currentGroup) result.push(currentGroup);
          currentGroup = {
            groupLabel: input.label || '',
            inputs: [{ ...input, label: undefined }]
          };
        } else {
          currentGroup.inputs.push({ ...input, label: undefined });
        }
      } else {
        if (currentGroup) {
          result.push(currentGroup);
          currentGroup = null;
        }
        result.push(input);
      }
    });

    if (currentGroup) result.push(currentGroup);
    return result;
  };

  const groupedInputs = groupRadioInputs(inputs);

  return (
    <BootstrapForm onSubmit={onSubmit}>
      {renderButtonGroup('top')}

      {groupedInputs.map((item, index) => {
        if ('groupLabel' in item) {
          return (
            <div key={`radio-group-${index}`} className="mb-3">
              <BootstrapForm.Label className="d-block mb-2 fw-bold">
                {item.groupLabel}
              </BootstrapForm.Label>
              <Row className="g-3">
                {item.inputs.map((input, idx) => (
                  <Col key={`radio-${index}-${idx}`} xs="auto">
                    <Input {...input} />
                  </Col>
                ))}
              </Row>
            </div>
          );
        } else {
          return <Input key={`input-${index}`} {...item} />;
        }
      })}

      {renderButtonGroup('bottom')}
    </BootstrapForm>
  );
};
