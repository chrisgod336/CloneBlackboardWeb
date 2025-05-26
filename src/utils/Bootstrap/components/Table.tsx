import React from 'react';
import { Table as BootstrapTable, Alert } from 'react-bootstrap';

type Column<T> = {
  label: string;
  field: keyof T;
  render?: (value: any, row: T, index: number) => React.ReactNode;
};

type ButtonPosition = 'top' | 'bottom';
type ButtonAlign = 'start' | 'center' | 'end';

type TableButton = {
  position: ButtonPosition;
  align: ButtonAlign;
  buttons: React.ReactNode[];
};

type DynamicTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  responsive?: boolean;
  size?: 'sm' | 'lg';
  tableButtons?: TableButton[];
  emptyMessage?: string | React.ReactNode; 
};

export function Table<T extends Record<string, any>>({
  data,
  columns,
  striped = true,
  bordered = true,
  hover = true,
  responsive = true,
  size = 'sm',
  tableButtons = [],
  emptyMessage = "Nenhum registro encontrado", 
}: DynamicTableProps<T>) {
  const getButtons = (position: ButtonPosition, align: ButtonAlign) =>
    tableButtons
      .filter(b => b.position === position && b.align === align)
      .flatMap(b => b.buttons);

  const renderButtonRow = (position: ButtonPosition) => (
    <div className="d-flex justify-content-between gap-2 mb-3 mt-3">
      {(['start', 'center', 'end'] as ButtonAlign[]).map((align, idx) => (
        <div key={idx} className={`d-flex gap-2 justify-content-${align} w-100`}>
          {getButtons(position, align)}
        </div>
      ))}
    </div>
  );

  const renderEmptyMessage = () => (
    <div className="text-center py-5">
      <Alert variant="info" className="d-inline-flex align-items-center">
        <i className="bi bi-info-circle-fill me-2"></i>
        {emptyMessage}
      </Alert>
    </div>
  );

  const renderTable = () => (
    <BootstrapTable striped={striped} bordered={bordered} hover={hover} size={size}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.render
                  ? col.render(row[col.field], row, rowIndex)
                  : row[col.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  );

  const tableContent = data.length > 0 ? renderTable() : renderEmptyMessage();

  const table = (
    <>
      {renderButtonRow('top')}
      {tableContent}
      {renderButtonRow('bottom')}
    </>
  );

  return responsive ? <div className="table-responsive">{table}</div> : table;
}