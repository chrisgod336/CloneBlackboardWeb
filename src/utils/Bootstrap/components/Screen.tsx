import { ReactNode } from 'react';

type ScreenProps = {
  children: ReactNode;
  title?: string;
};

export const Screen: React.FC<ScreenProps> = ({ children, title }) => {
  return (
    <div className="container mt-4">
      <div className="align-items-center justify-content-between mb-4">
        <h2 className="mb-0">{title}</h2><br/>
        {children}
      </div>
    </div>
  );
};
