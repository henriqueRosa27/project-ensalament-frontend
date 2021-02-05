import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TreeItem } from '@material-ui/lab';
import { Typography, Checkbox } from '@material-ui/core';

interface TreeItemCheckboxProps {
  label: string;
  selected?: boolean;
  info?: string;
  children?: React.ReactNode;
  onClick: () => void;
  indeterminate?: boolean;
  disabled?: boolean;
  nodeId: string;
}

const useStyles = makeStyles(theme =>
  createStyles({
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
      marginRight: theme.spacing(5),
    },
  })
);

const TreeItemCheckbox: FC<TreeItemCheckboxProps> = ({
  label,
  selected,
  info,
  children,
  onClick,
  indeterminate = false,
  disabled = false,
  nodeId,
}: TreeItemCheckboxProps) => {
  const classes = useStyles();

  return (
    <TreeItem
      onLabelClick={e => {
        e.preventDefault();
        onClick();
      }}
      nodeId={nodeId}
      label={
        <div className={classes.labelRoot}>
          <Checkbox
            disabled={disabled}
            indeterminate={indeterminate}
            checked={selected}
            color="primary"
            className={classes.labelIcon}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <Typography variant="body1" className={classes.labelText}>
            {label}
          </Typography>
          {info && (
            <Typography variant="body2" color="inherit">
              {info}
            </Typography>
          )}
        </div>
      }>
      {children}
    </TreeItem>
  );
};

TreeItemCheckbox.defaultProps = {
  selected: undefined,
  info: undefined,
  children: undefined,
  indeterminate: false,
  disabled: false,
};

export default TreeItemCheckbox;
