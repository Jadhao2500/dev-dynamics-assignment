import { VALID_DATA_TYPES } from "@/constant";
import { useDashboardContext } from "@/pages/dashboard/dashboardContext";
import { util } from "@/utils/utils";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { memo } from "react";

type props = {
    type: string;
    value: string;
}
const EmployeeSelect = (props: props) => {
    const { state, dispatch } = useDashboardContext()
    const { type, value } = props

    const handleSelectValueChange = (type: string, event: SelectChangeEvent) => {
        let value = event.target.value as string
        dispatch({ type, value })
    };
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="selected-employee">Select Employee</InputLabel>
            <Select
                labelId="selected-employee"
                value={value}
                label="Select Employee"
                onChange={(e) => {
                    handleSelectValueChange(type, e)
                }}
                sx={{ width: "160px" }}
            >
                <MenuItem value="">
                    None
                </MenuItem>
                {
                    util.validateDataType(state?.employees, VALID_DATA_TYPES.ARRAY) && state.employees.map((el: any) => (
                        <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )

}
export default memo(EmployeeSelect);