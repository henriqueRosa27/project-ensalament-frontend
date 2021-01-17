import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Typography, Checkbox } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400,
    },
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
    treeView: {
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
  })
);

export default function FileSystemNavigator() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.treeView}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}>
      <TreeItem
        nodeId="1"
        label={
          <div className={classes.labelRoot}>
            <Checkbox
              defaultChecked
              color="primary"
              className={classes.labelIcon}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <Typography variant="body1" className={classes.labelText}>
              Turma 1
            </Typography>
            <Typography variant="body2" color="inherit">
              123 Alunos
            </Typography>
          </div>
        }>
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}
