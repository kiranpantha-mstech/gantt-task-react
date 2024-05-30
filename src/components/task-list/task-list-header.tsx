import React from "react";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  taskWidth:number;
  fontFamily: string;
  fontSize: string;
}> = ({ headerHeight, fontFamily, fontSize, rowWidth, taskWidth }) => {
  return (
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: taskWidth,
            textAlign:'center'
          }}
        >
          Task
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        />
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
            textAlign:'center'
          }}
        >
          From
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
            textAlign:'center'
          }}
        >
          To
        </div>
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
            textAlign:'center'
          }}
        >
          To
        </div>        
      </div>
    </div>
  );
};
