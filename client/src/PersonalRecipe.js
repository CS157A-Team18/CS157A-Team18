import React from 'react';
import MaterialTable from 'material-table';
import './PersonalRecipe.css'
import { forwardRef } from 'react';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
};

export default function PersonalRecipe() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Food', field: 'name' },
      // { title: 'Price', field: 'birthYear', type: 'numeric' },
    ],
    data: [
      { name: 'Banh mi', birthYear: 1987 },
      {
        name: 'Pho',
        birthYear: 2017
      },
    ],
  });


  return (
    <div className="table">
        <MaterialTable
            icons={tableIcons}
            title="Your recipes"
            columns={state.columns}
            data={state.data}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                  }, 600);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    });
                    }, 600);
                }),
            }}
            options={{
                search: false
            }}
        />
    </div>
  );
}