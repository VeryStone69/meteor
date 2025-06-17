import React, {useEffect, useState} from 'react';
import {RoomsCollection} from "/imports/api/RoomsCollection";
import {useTracker, useSubscribe} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import type {RoomType} from "/imports/types/RoomType";
import {Grid} from "/imports/ui/Grid";
import {RoomName} from "/imports/ui/RoomName"
import {RoomNameForm} from "/imports/ui/RoomNameForm";

const EMPTY_GRID: number[][] = Array.from({length: 10}, () => Array(10).fill(0));

export const App = () => {
    const isLoading = useSubscribe("rooms");
    const rooms: RoomType[] = useTracker(() => RoomsCollection.find({}, {sort: {createdAt: -1}}).fetch());

    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
    const [activeGrid, setActiveGrid] = useState<number[][] | null>(null);

    // когда изменяется список задач — выбирается первая задача
    useEffect(() => {
        // если нет комнат — сбрасываем оба состояния
        if (rooms.length === 0) {
            setActiveRoomId(null);
            setActiveGrid(null);
            return;
        }
        // проверяем, осталась ли активная комната в новом списке
        const stillExists = rooms.some(r => r._id === activeRoomId);
        // если активной комнаты больше нет (например, её удалили) — выбираем первую
        if (!stillExists) {
            const first = rooms[0];
            setActiveRoomId(first._id);
            setActiveGrid(first.grid || EMPTY_GRID);
            return;
        }
    }, [rooms]);


    // обработчик клика по названию комнаты
    const handleRoomClick = async (room: RoomType) => {
        // сохраняем сетку текущей активной комнаты
        if (activeRoomId && activeGrid) {
            await Meteor.callAsync('rooms.updateGrid', {
                _id: activeRoomId,
                grid: activeGrid,
            });
        }
        // переключаемся на новую комнату
        setActiveRoomId(room._id);
        setActiveGrid(room.grid || EMPTY_GRID);
    };

    // обработчик удаления комнаты
    const handleDelete = async ({_id}: { _id: string }) => {
        await Meteor.callAsync('rooms.delete', {_id});
    };


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
                        onClick={() => handleRoomClick(room)}
                        onDeleteClick={handleDelete}
                    />)}
                </ul>
            </div>
            <Grid
                grid={activeGrid || EMPTY_GRID}
                setGrid={setActiveGrid}
            />
        </div>
    );
};
