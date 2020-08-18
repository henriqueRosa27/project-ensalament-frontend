/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import DataTable, { IDataTableColumn } from 'react-data-table-component';

interface DataTableComponent {
  title: string;
  columns: Array<IDataTableColumn>;
  data: Array<any>;
  actions?: ReactNode;
}

const customStyles = {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
  },
  pagination: {
    style: {
      border: 'none',
    },
  },
};

const teste = [
  {
    when: (row: any) => row.status,
    style: {
      color: '#202124',
      '&:hover': {
        backgroundColor: 'rgba(23,200,23,0.05)',
      },
    },
  },
  {
    when: (row: any) => !row.status,
    style: {
      color: '#202124',
      '&:hover': {
        backgroundColor: 'rgba(200,23,23,0.05)',
      },
    },
  },
];

const DataTableComponent: React.FC<DataTableComponent> = ({
  title,
  columns,
  data,
  actions,
}: DataTableComponent) => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <DataTable
        actions={actions}
        title={title}
        columns={columns}
        customStyles={customStyles}
        conditionalRowStyles={teste}
        data={data}
        defaultSortField="name"
        fixedHeaderScrollHeight="300px"
        highlightOnHover
      />
    </div>
  );
};

DataTableComponent.defaultProps = {
  actions: null,
};

export default DataTableComponent;
