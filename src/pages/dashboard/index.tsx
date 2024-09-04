// import ActivityMeta from "@components/ActivityMeta";
// import sampleData from "../../sample-data.json"
import Grid from '@mui/material/Grid2';
import ActiveDaysChart from "@components/ActiveDaysChart";
import TotalEmployeeWiseActivityChart from "@/components/TotalEmployeeWiseActivityChart";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Tooltip, Legend } from "chart.js";
import DayWiseActivity from "@/components/DayWiseActivity";
import { DashboardProvider } from "./dashboardContext";
import { useEffect, useReducer } from "react";
import { ACTION_TYPES, dashboardReducer, initialState } from "./dashboardReducer";
import TotalActivityChart from "@/components/TotalActivityChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Tooltip, Legend)

const AnalyticalDashboard = () => {
    const [state, dispatch] = useReducer(dashboardReducer, initialState);

    useEffect(() => {
        dispatch({ type: ACTION_TYPES.SELECTED_DATE, value: "2024-05-06" })
    }, []);

    return (
        <DashboardProvider value={{ state, dispatch }}>
            <Grid container spacing={2}>
                {/* <Grid size={12}>
                    <ActivityMeta meta={sampleData.data.AuthorWorklog.activityMeta} />
                </Grid> */}
                <Grid size={6}>
                    <ActiveDaysChart />
                </Grid>
                <Grid size={6}>
                    <TotalActivityChart />
                </Grid>
                <Grid size={12}>
                    <TotalEmployeeWiseActivityChart />
                </Grid>
                <Grid size={12}>
                    <DayWiseActivity />
                </Grid>
            </Grid>
        </DashboardProvider>
    )
}

export default AnalyticalDashboard;