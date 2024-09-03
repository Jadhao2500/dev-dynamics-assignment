import { createContext, useContext } from "react";
import sampleData from "../../sample-data.json";

const initialState: { state: any; dispatch: any } = {
  state: {
    activeDaysAnalytics: sampleData.data.AuthorWorklog.rows,
    color: sampleData.data.AuthorWorklog.activityMeta.map((el) => el.fillColor),
  },
  dispatch: () => {},
};
const dashboardContext = createContext(initialState);

export const DashboardProvider = dashboardContext.Provider;

export const useDashboardContext = () => {
  const context = useContext(dashboardContext);
  if (!context) {
    throw new Error("you can't use context outside the provider");
  }

  return context;
};
