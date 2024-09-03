import sampleData from "../../sample-data.json";
type initialState = {
  analyticalData: any[];
  activeDaysAnalytics: {
    name: string;
    activeDays: {
      days: number;
      isBurnOut: boolean;
    };
  }[];
  totalActivitiesAnalytics: {
    name: string;
    totalActivity: {
      name: string;
      value: string;
    }[];
  }[];
  dayWiseActivitiesAnalytics: {
    name: string;
    dayWiseActivity: {
      date: string;
      items: {
        children: {
          count: number | string;
          label: string;
        }[];
      };
    }[];
  }[];
  color: string[];
  currentSelectedDate: string;
  dateOptions: { value: string; label: string }[];
};
export const initialState: initialState = {
  analyticalData: sampleData.data.AuthorWorklog.rows,
  activeDaysAnalytics: sampleData.data.AuthorWorklog.rows,
  color: sampleData.data.AuthorWorklog.activityMeta.map((el) => el.fillColor),
  totalActivitiesAnalytics: sampleData.data.AuthorWorklog.rows,
  dayWiseActivitiesAnalytics: sampleData.data.AuthorWorklog.rows,
  currentSelectedDate: "",
  dateOptions: sampleData.data.AuthorWorklog.rows[0].dayWiseActivity.map(
    (el) => ({ value: el.date, label: el.date })
  ),
};

export const ACTION_TYPES = {
  SELECTED_DATE: "SELECTED_DATE",
};

export function dashboardReducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_TYPES.SELECTED_DATE: {
      let dayWiseData = filterDaywiseDataByDate(
        action.date,
        state.analyticalData
      );
      console.log({ dayWiseData });
      return {
        ...state,
        currentSelectedDate: action.date,
        dayWiseActivitiesAnalytics: dayWiseData,
      };
    }
    default: {
      throw new Error(
        `Unknown action:-${action.type}, either add switch case for the action or dispatch another action`
      );
    }
  }
}

const filterDaywiseDataByDate = (date: string, data: any[]) => {
  let filterActivities = data.map((el) => {
    const currentData = el?.dayWiseActivity.filter(
      (el: { date: string }) => el.date === date
    );
    return { ...el, dayWiseActivity: currentData };
  });
  return filterActivities;
};
