import { useDashboardContext } from "@/pages/dashboard/dashboardContext";
import { memo, useMemo } from "react";
import { Bar } from "react-chartjs-2";

// type props = {
//     activityData: {
//         name: string;
//         totalActivity: {
//             name: string;
//             value: string
//         }[]
//     }[],
//     color: string[],
// }

type labels = string[];

type dataSets = { label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number }[]

type activity = {
    name: string;
    value: string
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: "Total Activities"
        }
    }
}

const TotalActivityChart = () => {
    const { state } = useDashboardContext();

    const { dataSets, labels }: { dataSets: dataSets, labels: labels } = useMemo(() => {
        let dataSets: dataSets = [];
        let labels: labels = []
        state.totalActivitiesAnalytics.forEach((el: any) => {
            let set = {
                label: el.name,
                data: el.totalActivity.map((el: activity) => {
                    if (!labels.includes(el.name)) {
                        labels.push(el.name)
                    }
                    return Number(el.value)
                }),
                backgroundColor: state.color?.map((el: string) => `${el}1A`) ?? [""] ?? [""],
                borderColor: state.color,
                borderWidth: 1
            }
            dataSets.push(set)
        })

        return {
            dataSets, labels
        }
    }, [state.totalActivitiesAnalytics])

    console.log({
        dataSets,
        labels
    })
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
        <Bar
            options={options}
            data={{
                labels: labels,
                datasets: dataSets
            }}
        />
    </div>
}

export default memo(TotalActivityChart)