import { VALID_DATA_TYPES } from "../constant";
import { util } from "../utils/utils";
import { memo } from "react";

type props = {
    meta: { label: string, fillColor: string }[]
}
const ActivityMeta = (props: props) => {
    const { meta } = props;

    return <div className={`flex-between-center g-10`}>
        {util.validateDataType(meta, VALID_DATA_TYPES.ARRAY) && meta.map((el) => (
            <p key={el.label} style={{ color: `${el.fillColor}`, background: `${el.fillColor}1A`, padding: "0.5rem", minHeight: "15vh", width: "100%", fontWeight: 600, fontSize: "1.25rem" }}>{el.label}</p>
        ))}
    </div>
}

export default memo(ActivityMeta)