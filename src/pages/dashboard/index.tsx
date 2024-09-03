import ActivityMeta from "@components/ActivityMeta";
import sampleData from "../../sample-data.json"
import Grid from '@mui/material/Grid2';
import ActiveDaysChart from "@components/ActiveDaysChart";
import TotalActivityChart from "@/components/TotalActivityChart";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, LineElement, Tooltip, Legend)

const AnalyticalDashboard = () => {

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <ActivityMeta meta={sampleData.data.AuthorWorklog.activityMeta} />
            </Grid>
            <Grid size={6}>
                <ActiveDaysChart
                    activityData={sampleData.data.AuthorWorklog.rows}
                    color={sampleData.data.AuthorWorklog.activityMeta.map((el) => el.fillColor)} />
            </Grid>
            <Grid size={6}>

                <ActiveDaysChart
                    activityData={sampleData.data.AuthorWorklog.rows}
                    color={sampleData.data.AuthorWorklog.activityMeta.map((el) => el.fillColor)}
                />
            </Grid>
            <Grid size={12}>
                <TotalActivityChart
                    activityData={sampleData.data.AuthorWorklog.rows}
                    color={sampleData.data.AuthorWorklog.activityMeta.map((el) => el.fillColor)}
                />
            </Grid>
        </Grid>
    )
}

export default AnalyticalDashboard;