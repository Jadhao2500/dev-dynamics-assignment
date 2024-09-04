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
  dayWiseAnalyticsEmployee: string;
  employees: { value: string; label: string }[];
  totalAnalyticsEmployee: string;
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
  dayWiseAnalyticsEmployee: "",
  employees: sampleData.data.AuthorWorklog.rows.map((el) => ({
    label: el.name,
    value: el.name,
  })),
  totalAnalyticsEmployee: "",
};

export const ACTION_TYPES = {
  SELECTED_DATE: "SELECTED_DATE",
  DAY_WISE_ANALYTICS_EMPLOYEE: "DAY_WISE_ANALYTICS_EMPLOYEE",
  TOTAL_ANALYTICS_EMPOYEE: "TOTAL_ANALYTICS_EMPOYEE",
};

export function dashboardReducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_TYPES.SELECTED_DATE: {
      let dayWiseData = filterDaywiseDataByDate(
        action.value,
        state.analyticalData,
        state.dayWiseAnalyticsEmployee
      );
      return {
        ...state,
        currentSelectedDate: action.value,
        dayWiseActivitiesAnalytics: dayWiseData,
      };
    }
    case ACTION_TYPES.DAY_WISE_ANALYTICS_EMPLOYEE: {
      let dayWiseData = filterDaywiseDataByDate(
        state.currentSelectedDate,
        state.analyticalData,
        action.value
      );
      return {
        ...state,
        dayWiseAnalyticsEmployee: action.value,
        dayWiseActivitiesAnalytics: dayWiseData,
      };
    }
    case ACTION_TYPES.TOTAL_ANALYTICS_EMPOYEE: {
      let filterData = filterDataByEmployee(action.value, state.analyticalData);
      return {
        ...state,
        totalAnalyticsEmployee: action.value,
        totalActivitiesAnalytics: filterData,
      };
    }
    default: {
      throw new Error(
        `Unknown action:-${action.type}, either add switch case for the action or dispatch another action`
      );
    }
  }
}

const filterDaywiseDataByDate = (date: string, data: any[], name: string) => {
  let filterActivities = [];

  if (name.length) {
    let filterByEmpName = filterDataByEmployee(name, data);
    filterActivities = filterByEmpName.map((el) => {
      const currentData = el?.dayWiseActivity.filter(
        (el: { date: string }) => el.date === date
      );
      return { ...el, dayWiseActivity: currentData };
    });
  } else {
    filterActivities = data.map((el) => {
      const currentData = el?.dayWiseActivity.filter(
        (el: { date: string }) => el.date === date
      );
      return { ...el, dayWiseActivity: currentData };
    });
  }

  return filterActivities;
};

const filterDataByEmployee = (name: string, data: any[]) => {
  let filterActivities = data.filter((el) => el?.name === name);
  return name.length ? filterActivities : data;
};
