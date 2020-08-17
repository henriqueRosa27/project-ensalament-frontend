/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DataTable, { IDataTableColumn } from 'react-data-table-component';

interface DataTableComponent {
  title: string;
  columns: Array<IDataTableColumn>;
  data: Array<any>;
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
        backgroundColor: 'rgba(23,200,23,0.50)',
      },
    },
  },
  {
    when: (row: any) => !row.status,
    style: {
      color: '#202124',
      '&:hover': {
        backgroundColor: 'rgba(200,23,23,0.5)',
      },
    },
  },
];

const DataTableComponent: React.FC<DataTableComponent> = ({
  title,
  columns,
  data,
}: DataTableComponent) => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <DataTable
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
export default DataTableComponent;
