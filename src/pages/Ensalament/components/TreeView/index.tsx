import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Avatar, CircularProgress, Typography } from '@material-ui/core';

import TreeItemCheckbox from './TreeItemCheckbox';
import { DataInterface } from '../../../../models/EnsalamentData';
import { FatherState } from '../../../../hooks/helpers';
import EmptyStateImage from '../../../../assets/images/EmptyState.png';
import { useOptionWeekShift } from '../../../../hooks/OptionsWeekShiftContext';

interface TreeViewComponentProps {
  title: string;
  loading: boolean;
  data: DataInterface[];
  defaultExpanded: string[];
  childrenSelecteds: string[];
  setDataSelectsChildren: (id: string) => void;
  fathersState: FatherState[];
  setFatherSelectsChildren: (id: string) => void;
}

const useStyles = makeStyles(theme =>
  createStyles({
    treeView: {
      margin: theme.spacing(3),
      color: theme.palette.text.primary,
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
      },
    },
    root: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      minWidth: 400,
    },
    test: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      marginTop: 40,
      marginBottom: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

const TreeViewComponent: FC<TreeViewComponentProps> = ({
  title,
  loading,
  data,
  defaultExpanded,
  childrenSelecteds,
  setDataSelectsChildren,
  fathersState,
  setFatherSelectsChildren,
}: TreeViewComponentProps) => {
  const classes = useStyles();
  const { status } = useOptionWeekShift();

  const renderTreeView = () => {
    return (
      <TreeView
        multiSelect={false}
        className={classes.treeView}
        defaultExpanded={defaultExpanded}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}>
        {data?.map(value => {
          const disabled = value.children && value.children.length === 0;
          return (
            <TreeItemCheckbox
              nodeId={value.id}
              disabled={disabled}
              indeterminate={fathersState.some(
                father => father.id === value.id && father.state === 'some'
              )}
              selected={fathersState.some(
                father => father.id === value.id && father.state === 'all'
              )}
              label={value.name}
              key={value.id}
              onClick={() => {
                if (!disabled) setFatherSelectsChildren(value.id);
              }}>
              {value.children &&
                value.children.map(children => (
                  <TreeItemCheckbox
                    nodeId={children.id}
                    onClick={() => {
                      setDataSelectsChildren(children.id);
                    }}
                    label={children.name}
                    info={children.info}
                    selected={childrenSelecteds.some(v => v === children.id)}
                    key={children.id}
                  />
                ))}
            </TreeItemCheckbox>
          );
        })}
      </TreeView>
    );
  };

  const renderNoSelected = () => {
    return (
      <div
        style={{
          marginTop: 40,
          marginBottom: 40,
          marginLeft: 20,
          marginRight: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
        }}>
        <Typography variant="h4" gutterBottom>
          Não foram selecionados dia e turno
        </Typography>
      </div>
    );
  };

  const renderNoData = () => {
    return (
      <div
        style={{
          marginTop: 40,
          marginBottom: 40,
          marginLeft: 20,
          marginRight: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
        }}>
        <Avatar
          alt="Remy Sharp"
          src={EmptyStateImage}
          style={{ height: 200, width: 200 }}
        />
        <Typography variant="h4" gutterBottom>
          Sem registros!
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
          Para inserir um registro acesso atreavés do manu lateral.
        </Typography>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className={classes.test}>
        <CircularProgress size={75} />
      </div>
    );
  };

  const renderBody = () => {
    if (status === 'waitingRequest') {
      return renderNoSelected();
    }
    if (loading) {
      return renderLoading();
    }
    if (data.length === 0) {
      return renderNoData();
    }
    return renderTreeView();
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h5" align="center">
        {title}
      </Typography>
      {renderBody()}
    </div>
  );
};

export default TreeViewComponent;
