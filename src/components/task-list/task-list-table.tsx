import React, { useMemo, useState } from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";

const localeDateStringCache = {};
const toLocaleDateStringFactory =
  (locale: string) =>
  (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
    const key = date.toString();
    let lds = localeDateStringCache[key];
    if (!lds) {
      lds = date.toLocaleDateString(locale, dateTimeOptions).replace(/[/]/g, '-');
      localeDateStringCache[key] = lds;
    }
    return lds;
  };

  const calculateTimeDifference = (startDate:any, endDate:any, unit = 'days') => {
    const diffInMs = endDate - startDate;
  
    if (unit === 'hours') {
      const diffInHours = Math.floor(diffInMs / 3600000); // Convert milliseconds to hours
      return `${diffInHours}h`;
    } else {
      // Fallback to days
      const diffInDays = Math.floor(diffInMs / (3600000 * 24)); // Convert milliseconds to days
      return `${diffInDays}d`;
    }
  };

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  // weekday: "short",
  // year: "numeric",
  // month: "long",
  // day: "numeric",
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  taskWidth: number;
  rightSideElement:any;
  fetchData: () => void;
  onClickTask: (task_id: string) => void;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  taskWidth,
  rightSideElement,
  fetchData,
  onClickTask,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
}) => {
  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale]
  );

  const [hoveredTasks, setHoveredTasks] = useState({});
  

  // Function to handle hover enter for a specific task
  const handleMouseEnter = (taskId:string) => {
    setHoveredTasks((prevState) => ({
      ...prevState,
      [taskId]: true,
    }));
  };

  // Function to handle hover leave for a specific task
  const handleMouseLeave = (taskId:string) => {
    setHoveredTasks((prevState) => ({
      ...prevState,
      [taskId]: false,
    }));
  };

  const updateTimer = (taskId:string) => {
    const updatedElement = React.cloneElement(rightSideElement, {'taskId':taskId, 'fetchData':fetchData})
    return updatedElement;
  };

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map(t => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
          >
            <div
              className={styles.taskListCell}
              style={{
                minWidth: taskWidth,
                maxWidth: taskWidth,
                position:'relative',
                backgroundColor: (hoveredTasks[t.id]) ?"#efefef":"",
              }}
              title={t.name}
              onMouseEnter={() => handleMouseEnter(t.id)}
              onMouseLeave={() => handleMouseLeave(t.id)}  
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>
                <div style={{minWidth:taskWidth, maxWidth: taskWidth}}>
                  <span onClick={()=>{ onClickTask(t.id); }}>{t.name}</span>
                  {!expanderSymbol && <div style={{
                          margin: "0px",
                          position: "absolute",
                          width: "50%",
                          right: "0px",
                          color: "black",
                          backgroundColor: (hoveredTasks[t.id]) ?"#efefef":"",
                          opacity: (hoveredTasks[t.id]) ? 1 : 0,
                          top: 0,
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "5px",
                        }}>
                          &nbsp;{updateTimer(t.id)}
                  </div>}
                </div>
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
                textAlign:"center"
              }}
            >
              &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
                textAlign:"center"
              }}
            >
              &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
                textAlign:"center"
              }}
            >
              &nbsp;{calculateTimeDifference(t.start, t.end)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
