import { useDashboardContext } from "@/pages/dashboard/dashboardContext";
import { memo, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

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

        let activityWiseData: {
            [key: string]: number
        } = {}

        state.analyticalData.forEach((el: any) => {
            el?.totalActivity?.forEach((item: activity) => {
                if (!activityWiseData[item.name]) {
                    activityWiseData[item.name] = Number(item.value)
                } else {
                    activityWiseData[item.name] += Number(item.value)
                }
            })
        })

        let labels: labels = Object.keys(activityWiseData);
        let set = {
            label: "Total Activities",
            data: Object.values(activityWiseData),
            backgroundColor: state.color?.map((el: string) => `${el}1A`) ?? [""] ?? [""],
            borderColor: state.color,
            borderWidth: 1
        }
        dataSets.push(set)
        return {
            dataSets, labels
        }
    }, [state])

    return <div className="chart_card">
        <div className="flex-between-center">
            <div>
                <span className="title">
                    Total Activities
                </span>
            </div>
        </div>
        <div className="chart_container">
            <Doughnut
                options={options}
                data={{
                    labels: labels,
                    datasets: dataSets
                }}
            />
        </div>
    </div>
}

export default memo(TotalActivityChart)