import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { itemInterface } from "@/typings";
import { UseFormSetValue } from "react-hook-form";
import { uploadFormInterface } from "@/typings";

type Props = {
  items: Array<itemInterface>;
  label: string;
  setValue: UseFormSetValue<uploadFormInterface>;
  fieldName: string;
};

function DropdownBar({ items, label, setValue, fieldName }: Props) {
  const [valueItem, setvalueItem] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setvalueItem(event.target.value);
    console.log(valueItem);
    setValue(fieldName, Number(event.target.value));
  };
  return (
    <FormControl
      required
      sx={{ m: 1, minWidth: 120, flexGrow: 3 }}
      size="small"
    >
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={valueItem}
        label={label}
        onChange={handleChange}
      >
        {items.map((i) => (
          <MenuItem key={i.id} value={i.id}>
            {i.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropdownBar;
