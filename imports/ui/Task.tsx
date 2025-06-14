import React from 'react';
import {TaskType} from "/imports/types/TaskType";

type Props = {
    task: TaskType;
    onCheckboxClick: (args: { _id: string; isChecked: boolean }) => void;
};
export const Task = ({task, onCheckboxClick}: Props) => {
    return <li>
        <input
            type="checkbox"
            checked={task.isChecked}
            onClick={() => onCheckboxClick(task)}
            readOnly
        />
        <span>{task.text}</span>
    </li>
}
