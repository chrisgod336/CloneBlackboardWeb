import React, { ReactNode } from 'react';
import { Accordion as BootstrapAccordion } from 'react-bootstrap';

type AccordionProps = {
  title: string;
  children: ReactNode;
  isOpen?: boolean; 
};

export const Accordion: React.FC<AccordionProps> = ({ 
  title, 
  children,
  isOpen = false
}) => {
  return (
    <BootstrapAccordion defaultActiveKey={isOpen ? "0" : undefined}>
      <BootstrapAccordion.Item eventKey="0">
        <BootstrapAccordion.Header>{title}</BootstrapAccordion.Header>
        <BootstrapAccordion.Body>{children}</BootstrapAccordion.Body>
      </BootstrapAccordion.Item>
    </BootstrapAccordion>
  );
};