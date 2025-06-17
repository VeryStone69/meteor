import React, {useEffect, useState} from 'react';
import {RoomsCollection} from "/imports/api/RoomsCollection";
import {useTracker, useSubscribe} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import type {RoomType} from "/imports/types/RoomType";
import {Grid} from "/imports/ui/Grid";
import {RoomName} from "/imports/ui/RoomName"
import {RoomNameForm} from "/imports/ui/RoomNameForm";

export const App = () => {
    const isLoading = useSubscribe("rooms");

    // id активной задачи
    const [activeRoomId, setActiveTaskId] = useState<string | null>(null);

    //  состояние сетки для текущей активной задачи
    const [activeGrid, setActiveGrid] = useState<number[][] | null>(null);

    const rooms: RoomType[] = useTracker(() => RoomsCollection.find({}, {sort: {createdAt: -1}}).fetch());
    //  когда изменяется список задач — выбирается первая задача (по умолчанию)
    useEffect(() => {
        if (rooms.length === 0) {
            setActiveTaskId(null);
            setActiveGrid(null);
        } else if (!activeRoomId || !rooms.find(t => t._id === activeRoomId)) {
            const first = rooms[0];
            setActiveTaskId(first._id);
            setActiveGrid(first.grid ?? Array.from({length: 10}, () => Array(10).fill(0)));
        }
    }, [rooms]);

    // поиск текущую активную задачу
    const activeRoom = rooms.find((room) => room._id === activeRoomId);

    // при переключении задачи — сохраняется сетка
    const handleTaskClick = async (room: RoomType) => {
        if (activeRoom && activeGrid) {
            await Meteor.callAsync("rooms.updateGrid", {
                _id: activeRoom._id,
                grid: activeGrid,
            });
        }

        // загрузить сетку новой задачи
        setActiveTaskId(room._id);
        setActiveGrid(room.grid ?? Array.from({length: 10}, () => Array(10).fill(0)));
    };

    const handleDelete = async ({_id}: { _id: string }) => {
        await Meteor.callAsync("rooms.delete", {_id});
        // если удалили активную задачу — сбросить
        if (_id === activeRoomId) {
            setActiveTaskId(null);
            setActiveGrid(null);
        }
    }
    const emptyGrid = Array.from({length: 10}, () => Array(10).fill(0));

    if (isLoading()) {
        return <div>Загрузка...</div>;
    }


    return (
        <div className="app">
            <div className="main">
                <RoomNameForm/>

                <ul className="rooms">
                    {rooms.map((room: RoomType) => <RoomName
                        key={room._id}
                        room={room}
                        isActive={room._id === activeRoomId}
                        onClick={() => handleTaskClick(room)}
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