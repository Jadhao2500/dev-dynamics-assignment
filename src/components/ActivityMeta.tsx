import { memo } from "react"

type props = {
    meta: { label: string, fillColor: string }[]
}
const ActivityMeta = (props: props) => {
    const { meta } = props
    console.log({ meta })
    console.log()
    return <>

    </>
}

export default memo(ActivityMeta)