import React, {useEffect, useState} from 'react';
import {TasksCollection} from "/imports/api/RoomsCollection";
import {useTracker, useSubscribe} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import type {RoomType} from "/imports/types/RoomType";
import {Grid} from "/imports/ui/Grid";
import {RoomName} from "/imports/ui/RoomName"
import {RoomNameForm} from "/imports/ui/RoomNameForm";

export const App = () => {
    const isLoading = useSubscribe("tasks");

    // id активной задачи
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

    //  состояние сетки для текущей активной задачи
    const [activeGrid, setActiveGrid] = useState<number[][] | null>(null);

    const tasks: RoomType[] = useTracker(() => TasksCollection.find({}, {sort: {createdAt: -1}}).fetch());
    //  когда изменяется список задач — выбирается первая задача (по умолчанию)
    useEffect(() => {
        if (tasks.length === 0) {
            setActiveTaskId(null);
            setActiveGrid(null);
        } else if (!activeTaskId || !tasks.find(t => t._id === activeTaskId)) {
            const first = tasks[0];
            setActiveTaskId(first._id);
            setActiveGrid(first.grid ?? Array.from({length: 10}, () => Array(10).fill(0)));
        }
    }, [tasks]);

    // поиск текущую активную задачу
    const activeTask = tasks.find((task) => task._id === activeTaskId);

    // при переключении задачи — сохраняется предыдущая сетка
    const handleTaskClick = async (task: RoomType) => {
        if (activeTask && activeGrid) {
            await Meteor.callAsync("tasks.updateGrid", {
                _id: activeTask._id,
                grid: activeGrid,
            });
        }

        // загрузить сетку новой задачи
        setActiveTaskId(task._id);
        setActiveGrid(task.grid ?? Array.from({length: 10}, () => Array(10).fill(0)));
    };

    const handleDelete = async ({_id}: { _id: string }) => {
        await Meteor.callAsync("tasks.delete", {_id});
        // если удалили активную задачу — сбросить
        if (_id === activeTaskId) {
            setActiveTaskId(null);
            setActiveGrid(null);
        }
    }
    const emptyGrid = Array.from({length: 10}, () => Array(10).fill(0));

    if (isLoading()) {
        return <div>Loading...</div>;
    }


    return (
        <div className="app">
            <div className="main">
                <RoomNameForm/>

                <ul className="tasks">
                    {tasks.map((task: RoomType) => <RoomName
                        key={task._id}
                        task={task}
                        isActive={task._id === activeTaskId}
                        onClick={() => handleTaskClick(task)}
                        onDeleteClick={handleDelete}
                    />)}
                </ul>
            </div>
            <Grid
                grid={activeGrid || emptyGrid}
                setGrid={setActiveGrid}
            />
        </div>
    );
};