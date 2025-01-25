import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormPropsTextFields({ title, vis }) {
  return (
    <TextField
      id="standard-basic"
      label={title}
      type={vis}
      variant="standard"
    />
  );
}
