import * as React from 'react';
import { Container, Typography, Checkbox, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Collapse, Paper } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
  },
  list: {
    width: '100%',
  },
  listItem: {
    borderBottom: '2px solid #e0e0e0',
  },
  nestedListItem: {
    paddingLeft: '4rem',
  },
  header: {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  expandIcon: {
    color: '#757575',
  },
});

const departmentData = [
  {
    name: 'Department 1',
    subDepartments: [
      { name: 'Sub Department 1-1' },
      { name: 'Sub Department 1-2' }
    ]
  },
  {
    name: 'Department 2',
    subDepartments: [
      { name: 'Sub Department 2-1' },
      { name: 'Sub Department 2-2' },
      { name: 'Sub Department 2-3' }
    ]
  }
];

const DepartmentsList: React.FC = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = React.useState<{ [key: string]: boolean }>({});

  const handleExpandClick = (departmentName: string) => {
    setExpanded((prev) => ({ ...prev, [departmentName]: !prev[departmentName] }));
  };

  const handleSelect = (name: string, subDepartmentNames: string[] = []) => {
    const newSelected = { ...selected };
    const isSelected = !selected[name];

    newSelected[name] = isSelected;
    subDepartmentNames.forEach((subDept) => {
      newSelected[subDept] = isSelected;
    });

    setSelected(newSelected);
  };

  const handleSubDepartmentSelect = (departmentName: string, subDepartmentName: string) => {
    const newSelected = { ...selected };
    newSelected[subDepartmentName] = !selected[subDepartmentName];

    const allSubSelected = departmentData
      .find((dept) => dept.name === departmentName)
      ?.subDepartments.every((subDept) => newSelected[subDept.name]);

    newSelected[departmentName] = allSubSelected ? true : false;

    if (newSelected[subDepartmentName]) {
      newSelected[departmentName] = true;
    } else {
      const anySubSelected = departmentData
        .find((dept) => dept.name === departmentName)
        ?.subDepartments.some((subDept) => newSelected[subDept.name]);

      newSelected[departmentName] = anySubSelected ? true : false;
    }

    setSelected(newSelected);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.header}>Departments</Typography>
      <Paper className={classes.paper}>
        <List className={classes.list}>
          {departmentData.map((department) => (
            <React.Fragment key={department.name}>
              <ListItem className={classes.listItem}>
                <Checkbox
                  edge="start"
                  checked={selected[department.name] || false}
                  onChange={() => handleSelect(department.name, department.subDepartments.map(sub => sub.name))}
                />
                <ListItemText primary={department.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleExpandClick(department.name)}>
                    {expanded[department.name] ? <ExpandLess className={classes.expandIcon} /> : <ExpandMore className={classes.expandIcon} />}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={expanded[department.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {department.subDepartments.map((subDepartment) => (
                    <ListItem key={subDepartment.name} className={`${classes.listItem} ${classes.nestedListItem}`}>
                      <Checkbox
                        edge="start"
                        checked={selected[subDepartment.name] || false}
                        onChange={() => handleSubDepartmentSelect(department.name, subDepartment.name)}
                      />
                      <ListItemText primary={subDepartment.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default DepartmentsList;
