import React, {useState} from 'react';
import {TaskType} from "/imports/types/TaskType";

type Props = {
    task: TaskType;
    // onCheckboxClick: (args: { _id: string; isChecked: boolean }) => void;
    onDeleteClick: (args: { _id: string }) => void;
};
export const Task = ({task,
                         // onCheckboxClick,
                         onDeleteClick}: Props) => {
    const [active, setActive] = useState<boolean>(false);
    const onClickHandler = ()=>console.log(`click ${task._id}`)
    return <li>
        <span onClick={onClickHandler}>{task.text}</span>
        <button onClick={() => onDeleteClick({ _id: task._id })}>&times;</button>
    </li>
}
