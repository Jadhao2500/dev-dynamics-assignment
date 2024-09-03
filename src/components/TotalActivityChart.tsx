import { memo, useMemo } from "react";
import { Bar } from "react-chartjs-2";
type props = {
    activityData: {
        name: string;
        totalActivity: {
            name: string;
            value: string
        }[]
    }[],
    color: string[],
}
type dataSets = {
    [key: string | number]: (number)[]
}
type labels = string[];

type dataSets2 = { label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number }[]

const TotalActivityChart = (props: props) => {
    const { activityData, color } = props;
    const { labels, dataSets, dataSets2, labels2 }: { labels: labels, dataSets: dataSets, dataSets2: dataSets2, labels2: labels } = useMemo(() => {
        const labels = activityData.map((el) => el.name);
        const dataSets: dataSets = {};
        activityData.forEach((el) => {
            el.totalActivity.forEach((activity) => {
                if (!dataSets[activity.name]) {
                    dataSets[activity.name] = [Number(activity.value)]
                } else {
                    dataSets[activity.name].push(Number(activity.value))
                }
            })
        })
        let dataSets2: dataSets2 = [];
        let labels2: string[] = []
        activityData.forEach((el) => {
            let set = {
                label: el.name,
                data: el.totalActivity.map((el) => {
                    if (!labels2.includes(el.name)) {
                        labels2.push(el.name)
                    }
                    return Number(el.value)
                }),
                backgroundColor: color?.map((el) => `${el}1A`) ?? [""] ?? [""],
                borderColor: color,
                borderWidth: 1
            }
            dataSets2.push(set)
        })

        return {
            labels, dataSets, dataSets2, labels2
        }
    }, [activityData])

    console.log({
        labels,
        dataSets, color, data: Object.entries(dataSets).map(([key, value]) => ({
            label: key,
            data: value,
            backgroundColor: color,
            borderColor: color?.map((el) => `${el}1A`),

        })),
        dataSets2,
        labels2
    })
    return <div className="chart-card">
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
            data={{
                labels: labels2,
                datasets: dataSets2
            }}
        />
    </div>
}

export default memo(TotalActivityChart)