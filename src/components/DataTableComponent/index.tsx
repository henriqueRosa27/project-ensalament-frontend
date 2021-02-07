/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import DataTable, { IDataTableColumn } from 'react-data-table-component';
import { CircularProgress, Avatar, Typography } from '@material-ui/core';
import EmptyStateImage from '../../assets/images/EmptyState.png';

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
  <div style={{ marginTop: 40, marginBottom: 40, padding: '24px' }}>
    <CircularProgress size={75} />
  </div>
);

const EmptyState = () => {
  return (
    <div
      style={{
        marginTop: 40,
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
      }}>
      <Avatar
        alt="Remy Sharp"
        src={EmptyStateImage}
        style={{ height: 300, width: 300 }}
      />
      <Typography variant="h3" gutterBottom>
        Sem registros!
      </Typography>
      <Typography variant="h5" gutterBottom align="center">
        Para inserir um registro clique no botão &quot;Adicionar&quot;, no canto
        superior direto.
      </Typography>
    </div>
  );
};

const DataTableComponent: React.FC<DataTableComponent> = ({
  title,
  columns,
  data,
  actions,
  isLoading,
}: DataTableComponent) => {
  return (
    <div
      style={{
        maxWidth: '100%',
        borderRadius: 20,
        border: 'solid rgba(63, 81, 181, 0.4 )',
      }}>
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
        noDataComponent={<EmptyState />}
      />
    </div>
  );
};

DataTableComponent.defaultProps = {
  actions: null,
};

export default DataTableComponent;
