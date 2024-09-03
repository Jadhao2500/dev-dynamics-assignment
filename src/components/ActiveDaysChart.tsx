import { useDashboardContext } from "@/pages/dashboard/dashboardContext";
import { memo, useMemo } from "react"
import { Pie } from "react-chartjs-2"

// type props = {
//     activityData: {
//         name: string;
//         activeDays: {
//             days: number;
//             isBurnOut: boolean;
//         }
//     }[],
//     color: string[],
// }

type set = { label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number, hoverOffset?: number }
type dataSets = set[]

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: "Employee Active Days"
        }
    }
}

const ActiveDaysChart = () => {
    const { state, } = useDashboardContext()
    const { labels, dataSets } = useMemo(() => {
        const labels = state.activeDaysAnalytics.map((el: { name: string }) => el.name);
        const dataSets: dataSets = [];
        let set: set = {
            label: "Active Days",
            data: [],
            backgroundColor: state.color?.map((el: string) => `${el}1A`) ?? [""] ?? [""],
            borderColor: state.color,
            borderWidth: 1,
            hoverOffset: 5,
        }
        let activeDays: number[] = []
        state.activeDaysAnalytics.forEach((item: any) => {

            const data = item.activeDays.days

            activeDays.push(data)
        })
        dataSets.push({ ...set, data: activeDays })
        return { labels, dataSets }
    }, [state.activeDaysAnalytics])

    return <div className={`chart_card`}>
        <Pie
            options={options}
            data={{
                labels,
                datasets: dataSets
            }}
        />
    </div>
}

export default memo(ActiveDaysChart)