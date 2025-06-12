import React from 'react';
import {Task} from './Task';
import {TasksCollection} from "/imports/api/TasksCollection";
import {useTracker, useSubscribe} from "meteor/react-meteor-data";
import {TaskForm} from "/imports/ui/TaskForm";

export type TaskType = {
    _id: string;
    text: string;
};

export const App = () => {
    const tasks: TaskType[] = useTracker(() => TasksCollection.find().fetch());
    const isLoading = useSubscribe("tasks");
    if (isLoading()) {
        return <div>Loading...</div>;
    }
<TaskForm/>
    return (
        <div>
            <h1>Welcome to Meteor!!!!!!!!!!!!!</h1>

            <ul>
                {tasks.map((task: TaskType) => (
                    <Task key={task._id} task={task}/>
                ))}
            </ul>
        </div>
    );
};
