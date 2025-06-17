import React from 'react';
import {RoomType} from "/imports/types/RoomType";

type RoomNamePropsType = {
    task: RoomType;
    isActive: boolean;
    onClick: () => void;
    onDeleteClick: ({_id}: { _id: string }) => void;
};

export const RoomName = ({task, isActive, onClick, onDeleteClick}: RoomNamePropsType) => {
    return (
        <li className="room-name" style={{ fontWeight: isActive ? 'bold' : 'normal',
            backgroundColor: isActive ? '#e0f7fa' : 'transparent'}} onClick={onClick}>
            {task.text}
            <button onClick={() => onDeleteClick({_id: task._id})} style={{marginLeft: 10}}>
                <img width="20" height="20" src="https://img.icons8.com/pulsar-line/48/delete.png" alt="delete"/>
            </button>
        </li>
    );
};