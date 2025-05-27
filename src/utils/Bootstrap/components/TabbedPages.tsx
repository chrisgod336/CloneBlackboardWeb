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
    <div className="d-flex flex-column" style={{ height: '100vh', overflow: 'hidden' }}>
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k || '')}>
        <Row className="g-0 flex-grow-1" style={{ overflow: 'hidden', margin: 0 }}>
          <Col sm={3} className="border-end bg-light" style={{ 
            height: '100vh',
            position: 'sticky',
            top: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Nav variant="pills" className="flex-column text-center py-4" style={{ gap: '1.5rem' }}>
              {tabs.map((tab) => (
                <Nav.Item key={tab.key}>
                  <Nav.Link 
                    eventKey={tab.key} 
                    className="d-flex flex-column align-items-center tab-btn py-3"
                  >
                    <div className="mb-2">{tab.icon}</div>
                    {tab.key === activeKey ? (
                      <b>{tab.label}</b>
                    ) : (
                      <small>{tab.label}</small>
                    )}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          <Col sm={9} style={{ 
            padding: '1rem',
            height: '100vh',
            overflowY: 'auto'
          }}>
            <Tab.Content>
              {tabs.map((tab) => (
                <Tab.Pane eventKey={tab.key} key={tab.key}>
                  <Card className="shadow-sm">
                    <Card.Body style={{ padding: '1.5rem' }}>
                      {tab.content}
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};