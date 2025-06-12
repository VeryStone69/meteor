import React from 'react';
import type { TaskType} from './App';

type Props = {
    task: TaskType;
};
export const Task = ({task}:Props)=>{
    return <li>{task.text}</li>
}
