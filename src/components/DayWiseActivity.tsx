import { VALID_DATA_TYPES } from "@/constant";
import { useDashboardContext } from "@/pages/dashboard/dashboardContext";
import { ACTION_TYPES } from "@/pages/dashboard/dashboardReducer";
import { util } from "@/utils/utils";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { memo, useMemo } from "react";
import { Bar } from "react-chartjs-2";

type dayWiseActivity = {
    name: string;
    dayWiseActivity: {
        date: string;
        items: {
            children: {
                count: number | string;
                label: string;
            }[];
        };
    }[];
}


type labels = string[];

type dataSets = { label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number }[]

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: "Day Wise Activities"
        }
    }
}

const DayWiseActivityChart = () => {
    const { state, dispatch } = useDashboardContext();

    const handleSelectValueChange = (type: string, event: SelectChangeEvent) => {
        let value = event.target.value as string
        dispatch({ type, value })
    };

    const { labels, dataSets }: { dataSets: dataSets, labels: labels } = useMemo(() => {
        let dataSets: dataSets = [];
        let labels: string[] = []
        state.dayWiseActivitiesAnalytics.forEach((el: dayWiseActivity) => {
            let set = {
                label: el.name,
                data: el.dayWiseActivity?.[0].items.children.map((el: any) => {
                    if (!labels.includes(el?.label)) {
                        labels.push(el?.label)
                    }
                    return Number(el?.count)
                }),
                backgroundColor: state.color?.map((el: string) => `${el}1A`) ?? [""] ?? [""],
                borderColor: state.color,
                borderWidth: 1
            }
            dataSets.push(set)
        })

        return {
            labels, dataSets
        }
    }, [state.dayWiseActivitiesAnalytics])

    console.log({ labels, dataSets, day: state?.dayWiseActivitiesAnalytics, currentDate: state.currentSelectedDate })

    return <div className="chart_card">
        {/* <Bar
            data={{
                labels: labels,
                datasets: Object.entries(dataSets).map(([key, value]) => ({
                    label: key,
                    data: value,
                    backgroundColor: color?.map((el) => `${el}1A`),
                    borderColor: color,
                    borderWidth: 1
                }))
            }}
        /> */}
        <div className="flex-end-center g-10">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="selected-date">Selected Date</InputLabel>
                <Select
                    labelId="selected-date"
                    value={state.currentSelectedDate}
                    label="Selected Date"
                    onChange={(e) => {
                        handleSelectValueChange(ACTION_TYPES.SELECTED_DATE, e)
                    }}
                    sx={{ width: "160px" }}
                >
                    {
                        util.validateDataType(state?.dateOptions, VALID_DATA_TYPES.ARRAY) && state.dateOptions.map((el: any) => (
                            <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="selected-employee">Select Employee</InputLabel>
                <Select
                    labelId="selected-employee"
                    value={state?.dayWiseAnalyticsEmployee}
                    label="Select Employee"
                    onChange={(e) => {
                        handleSelectValueChange(ACTION_TYPES.DAY_WISE_ANALYTICS_EMPLOYEE, e)
                    }}
                    sx={{ width: "160px" }}
                >
                    {
                        util.validateDataType(state?.employees, VALID_DATA_TYPES.ARRAY) && state.employees.map((el: any) => (
                            <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
        <Bar
            options={options}
            data={{
                labels: labels,
                datasets: dataSets
            }}
        />
    </div>
}

export default memo(DayWiseActivityChart)