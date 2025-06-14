import React from 'react';
import {TaskType} from "/imports/types/TaskType";

type Props = {
    task: TaskType;
    onCheckboxClick: (args: { _id: string; isChecked: boolean }) => void;
    onDeleteClick: (args: { _id: string }) => void;
};
export const Task = ({task, onCheckboxClick, onDeleteClick}: Props) => {
    return <li>
        <input
            type="checkbox"
            checked={task.isChecked}
            onClick={() => onCheckboxClick(task)}
            readOnly
        />
        <span>{task.text}</span>
        <button onClick={() => onDeleteClick({ _id: task._id })}>&times;</button>
    </li>
}
