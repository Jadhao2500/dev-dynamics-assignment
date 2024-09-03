import ActivityMeta from "@components/ActivityMeta";
import sampleData from "../../sample-data.json"
import Grid from '@mui/material/Grid2';
import ActiveDaysChart from "@components/ActiveDaysChart";
import TotalActivityChart from "@/components/TotalActivityChart";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, LineElement, Tooltip, Legend } from "chart.js";
import DayWiseActivity from "@/components/DayWiseActivity";
import { DashboardProvider } from "./dashboardContext";
import { useReducer } from "react";
import { dashboardReducer, initialState } from "./dashboardReducer";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, LineElement, Tooltip, Legend)

const AnalyticalDashboard = () => {
    const [state, dispatch] = useReducer(dashboardReducer, initialState)
    console.log({ state })
    return (
        <DashboardProvider value={{ state, dispatch }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <ActivityMeta meta={sampleData.data.AuthorWorklog.activityMeta} />
                </Grid>
                <Grid size={4}>
                    <ActiveDaysChart />
                </Grid>
                <Grid size={8}>
                    <ActiveDaysChart />
                </Grid>
                <Grid size={12}>
                    <TotalActivityChart />
                </Grid>
                <Grid size={12}>
                    <DayWiseActivity />
                </Grid>
            </Grid>
        </DashboardProvider>
    )
}

export default AnalyticalDashboard;