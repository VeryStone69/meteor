import React from 'react';
import {Task} from './Task';
import {TasksCollection} from "/imports/api/TasksCollection";
import {useTracker, useSubscribe} from "meteor/react-meteor-data";
import {TaskForm} from "/imports/ui/TaskForm";
import {Meteor} from "meteor/meteor";
import type {TaskType, ToggleCheckedArgs} from "/imports/types/TaskType";
import {Grid} from "/imports/ui/Grid";

export const App = () => {
    const isLoading = useSubscribe("tasks");

    const tasks: TaskType[] = useTracker(() => TasksCollection.find({}, {sort: {createdAt: -1}}).fetch());

    const handleToggleChecked = async ({_id, isChecked}: ToggleCheckedArgs) =>
        await Meteor.callAsync("tasks.toggleChecked", {_id, isChecked});

    const handleDelete = async ({_id}: { _id: string }) =>
        await Meteor.callAsync("tasks.delete", {_id});

    if (isLoading()) {
        return <div>Loading...</div>;
    }
    return (
        <div className="app">
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>📝️ To Do List</h1>
                    </div>
                </div>
            </header>
            <div className="main">
                <TaskForm/>

                <ul className="tasks">
                    {tasks.map((task: TaskType) => <Task key={task._id} task={task}
                                                         onCheckboxClick={handleToggleChecked}
                                                         onDeleteClick={handleDelete}
                    />)}
                </ul>
            </div>
            <Grid/>
        </div>
    );
};
