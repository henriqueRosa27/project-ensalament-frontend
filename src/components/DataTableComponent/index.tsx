/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';
import MaterialTable, { MTableToolbar } from 'material-table';

import { Button } from '@material-ui/core';
import DataTableModel from '../../Models/DataTable';

interface DataTableComponent {
  title: string;
  columns: Array<DataTableModel>;
  data: Array<any>;
  onEdit: (data: any) => void;
}

const DataTableComponent: React.FC<DataTableComponent> = ({
  title,
  columns,
  data,
  onEdit,
}: DataTableComponent) => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
          search: false,
        }}
        icons={{
          Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
          Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
          Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
          Delete: forwardRef((props, ref) => (
            <DeleteOutline {...props} ref={ref} />
          )),
          DetailPanel: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
          )),
          Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
          Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
          Filter: forwardRef((props, ref) => (
            <FilterList {...props} ref={ref} />
          )),
          FirstPage: forwardRef((props, ref) => (
            <FirstPage {...props} ref={ref} />
          )),
          LastPage: forwardRef((props, ref) => (
            <LastPage {...props} ref={ref} />
          )),
          NextPage: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
          )),
          PreviousPage: forwardRef((props, ref) => (
            <ChevronLeft {...props} ref={ref} />
          )),
          ResetSearch: forwardRef((props, ref) => (
            <Clear {...props} ref={ref} />
          )),
          Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
          SortArrow: forwardRef((props, ref) => (
            <ArrowDownward {...props} ref={ref} />
          )),
          ThirdStateCheck: forwardRef((props, ref) => (
            <Remove {...props} ref={ref} />
          )),
          ViewColumn: forwardRef((props, ref) => (
            <ViewColumn {...props} ref={ref} />
          )),
        }}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'Editar',
            onClick: (event, rowData) => onEdit(rowData),
          },

          {
            icon: () => <Button>Teste</Button>,
            tooltip: 'Editar',
            isFreeAction: true,
            onClick: (rowData) => console.log('teste'),
          },
        ]}
        localization={{
          header: {
            actions: 'Ações',
          },
          body: {
            emptyDataSourceMessage: 'Sem Registros',
          },
        }}
        components={{
          Toolbar: (props) => {
            console.log(props);
            return (
              <div>
                <MTableToolbar {...props} />
              </div>
            );
          },
        }}
      />
    </div>
  );
};
export default DataTableComponent;
