import React from 'react';
import {Task} from './Task';

export type TaskType = {
    _id: number;
    text: string;
};

const tasks: TaskType[] = [
    {_id: 1, text: 'Смайлик'},
    {_id: 2, text: 'Цветок'},
    {_id: 3, text: 'Солнце'},
    {_id: 4, text: 'Футбол'},
    {_id: 5, text: 'Айтигеник'},
];

export const App = () => (
    <div>
        <h1>Welcome to Meteor!</h1>
        <ul>
            {tasks.map((task: TaskType) => <Task key={task._id} task={task}/>)}
        </ul>
    </div>
);
