import React from 'react';
import {Meteor} from "meteor/meteor";

type GridProps = {
    grid: number[][];
    setGrid: (grid: number[][]) => void; // функция обновления сетки
    activeRoomId:  string | null
};

export const Grid = ({ grid, setGrid,activeRoomId }:GridProps) => {

    const toggleCell = (row: number, col: number) => {
        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? 1 - cell : cell
            )
        );
        setGrid(newGrid);
        Meteor.call("rooms.updateGrid", {
            _id: activeRoomId, // этот id нужно прокинуть через пропсы или контекст
            grid: newGrid,
        });
    };

    return (
        <div className="gridContainer">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => {
                        const cellId = `${rowIndex}-${colIndex}`;
                        return (
                            <div
                                key={cellId}
                                id={cellId}
                                onClick={() => toggleCell(rowIndex, colIndex)}
                                style={{
                                    width: 30,
                                    height: 30,
                                    margin: 1,
                                    backgroundColor: cell ? '#000' : '#fff',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
