import React, { ReactNode, useState } from 'react';
import { Nav, Tab, Row, Col, Card } from 'react-bootstrap';

type TabItem = {
  key: string;
  icon: ReactNode;
  label: string;
  content: ReactNode;
};

type VerticalTabsProps = {
  tabs: TabItem[];
  defaultActiveKey?: string;
};

export const TabbedPages: React.FC<VerticalTabsProps> = ({ tabs, defaultActiveKey }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0]?.key);

  return (
    <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k || '')}>
      <Row>
        <Col sm={3} className="border-end min-vh-100 bg-light">
          <Nav variant="pills" className="flex-column text-center py-4 gap-3">
            {tabs.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key} className="d-flex flex-column align-items-center tab-btn">
                  <div>{tab.icon}</div>
                  <small className="mt-1">{tab.label}</small>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        <Col sm={9} className="p-4">
          <Tab.Content>
            {tabs.map((tab) => (
              <Tab.Pane eventKey={tab.key} key={tab.key}>
                <Card className="shadow-sm">
                  <Card.Body>{tab.content}</Card.Body>
                </Card>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};
