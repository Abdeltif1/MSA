import React from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function JumaaTime() {
  const handleJumaaTime = (choice) => {




  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Jumaa Management</h1>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="Basic time picker" />
      </DemoContainer>
    </LocalizationProvider>
  );
}


/*    <div>
      <h1>Jumaa</h1>
      <input type="text" />
      <div>
        <CDBBtn color="primary" style={{ margin: "2px" }}>
          Submit
        </CDBBtn>
      </div>
    </div> */