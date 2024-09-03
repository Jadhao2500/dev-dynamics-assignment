import { memo, useMemo } from "react"
import { Pie } from "react-chartjs-2"

type props = {
    activityData: {
        name: string;
        activeDays: {
            days: number;
            isBurnOut: boolean;
        }
    }[],
    color: string[],
}

type set = { label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number, hoverOffset?: number }
type dataSets2 = set[]

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

const ActiveDaysChart = (props: props) => {
    const { activityData, color } = props;
    
    const { labels, dataSets } = useMemo(() => {
        const labels = activityData.map((el) => el.name);
        const dataSets: dataSets2 = [];
        let set: set = {
            label: "Active Days",
            data: [],
            backgroundColor: color?.map((el) => `${el}1A`) ?? [""] ?? [""],
            borderColor: color,
            borderWidth: 1,
            hoverOffset: 5,
        }
        let activeDays: number[] = []
        activityData.forEach((item) => {

            const data = item.activeDays.days

            activeDays.push(data)
        })
        dataSets.push({ ...set, data: activeDays })
        return { labels, dataSets }
    }, [activityData])

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