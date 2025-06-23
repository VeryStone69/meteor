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

    // получаем активную комнату и её сетку
    const activeRoom = rooms.find((r) => r._id === activeRoomId);
    const activeGrid = activeRoom?.grid || EMPTY_GRID;

    // когда изменяется список задач — выбирается первая задача
    useEffect(() => {
        // если нет комнат — сбрасываем оба состояния
        if (rooms.length === 0) {
            setActiveRoomId(null);
            return;
        }
        // проверяем, осталась ли активная комната в новом списке
        const stillExists = rooms.some(r => r._id === activeRoomId);
        // если активной комнаты больше нет (например, её удалили) — выбираем первую
        if (!stillExists) {
            setActiveRoomId(rooms[0]._id);
        }
    }, [rooms,activeRoomId]);


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
                grid={activeGrid}
                updateGrid={(grid) =>
                    Meteor.callAsync("rooms.updateGrid", { _id: activeRoomId, grid })
                }
            />
        </div>
    );
};
