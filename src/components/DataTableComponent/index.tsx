/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import DataTable, { IDataTableColumn } from 'react-data-table-component';
import CircularProgress from '@material-ui/core/CircularProgress';

interface DataTableComponent {
  title: string;
  columns: Array<IDataTableColumn>;
  data: Array<any>;
  actions?: ReactNode;
  isLoading: boolean;
}

const customStyles = {
  headRow: {
    style: {},
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

const customStylesRows = [
  {
    when: (row: any) => row.active,
    style: {
      color: '#202124',
      '&:hover': {
        backgroundColor: 'rgba(23,200,23,0.05)',
      },
    },
  },
  {
    when: (row: any) => !row.active,
    style: {
      color: '#202124',
      '&:hover': {
        backgroundColor: 'rgba(200,23,23,0.05)',
      },
    },
  },
];

const Circular = () => (
  <div style={{ padding: '24px' }}>
    <CircularProgress size={75} />
  </div>
);

const DataTableComponent: React.FC<DataTableComponent> = ({
  title,
  columns,
  data,
  actions,
  isLoading,
}: DataTableComponent) => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <DataTable
        actions={actions}
        title={title}
        columns={columns}
        customStyles={customStyles}
        conditionalRowStyles={customStylesRows}
        data={data}
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        progressPending={isLoading}
        progressComponent={<Circular />}
        persistTableHead
        noDataComponent="Sem Registros"
      />
    </div>
  );
};

DataTableComponent.defaultProps = {
  actions: null,
};

export default DataTableComponent;
