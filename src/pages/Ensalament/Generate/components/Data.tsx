import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';
import TreeView from './TreeView';
import { useCourseDataSelects } from '../../../../hooks/Ensalament/Datas/DataCourseSelectsContext';
import { useBuildingDataSelects } from '../../../../hooks/Ensalament/Datas/DataBuildingSelectsContext';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
  })
);

const Data: FC = () => {
  const classes = useStyles();

  const {
    loading: loadingCourse,
    data: dataCourse,
    defaultExpanded: defaultExpandedCourse,
    childrenSelecteds: childrenSelectedsCourse,
    setDataSelectsChildren: setDataSelectsChildrenCourse,
    fathersState: fathersStateCourse,
    setFatherSelectsChildren: setFatherSelectsChildrenCourse,
  } = useCourseDataSelects();

  const {
    loading: loadingBulding,
    data: dataBulding,
    defaultExpanded: defaultExpandedBuilding,
    childrenSelecteds: childrenSelectedBuilding,
    setDataSelectsChildren: setDataSelectsChildrenBuilding,
    fathersState: fathersStateBuilding,
    setFatherSelectsChildren: setFatherSelectsChildrenBuilding,
  } = useBuildingDataSelects();

  return (
    <div className={classes.root}>
      <TreeView
        title="Turmas"
        loading={loadingCourse}
        data={dataCourse}
        defaultExpanded={defaultExpandedCourse}
        childrenSelecteds={childrenSelectedsCourse}
        setDataSelectsChildren={setDataSelectsChildrenCourse}
        fathersState={fathersStateCourse}
        setFatherSelectsChildren={setFatherSelectsChildrenCourse}
      />
      <Divider orientation="vertical" flexItem />
      <TreeView
        title="Salas"
        loading={loadingBulding}
        data={dataBulding}
        defaultExpanded={defaultExpandedBuilding}
        childrenSelecteds={childrenSelectedBuilding}
        setDataSelectsChildren={setDataSelectsChildrenBuilding}
        fathersState={fathersStateBuilding}
        setFatherSelectsChildren={setFatherSelectsChildrenBuilding}
      />
    </div>
  );
};

export default Data;
