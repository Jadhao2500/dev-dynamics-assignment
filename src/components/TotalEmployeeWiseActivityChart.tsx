import { useDashboardContext } from "@/pages/dashboard/dashboardContext";
import { ACTION_TYPES } from "@/pages/dashboard/dashboardReducer";
import { memo, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import EmployeeSelect from "./EmployeeSelect";

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

const TotalEmployeeWiseActivityChart = () => {
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

    return <div className="chart_card">
        <div className="flex-between-center">
            <div>
                <span className="title">
                    Total Activities (Employee Wise)
                </span>
            </div>
            <div className="flex-end-center g-10">
                <EmployeeSelect value={state?.totalAnalyticsEmployee} type={ACTION_TYPES.TOTAL_ANALYTICS_EMPOYEE} />
            </div>
        </div>
        <div className="chart_container">
            <Bar
                options={options}
                data={{
                    labels: labels,
                    datasets: dataSets
                }}
            />
        </div>
    </div>
}

export default memo(TotalEmployeeWiseActivityChart)