import React from 'react';

type GridProps = {
    grid: number[][];
    setGrid: (grid: number[][]) => void; // функция обновления сетки
};

export const Grid = ({ grid, setGrid }:GridProps) => {

    const toggleCell = (row: number, col: number) => {
        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? 1 - cell : cell
            )
        );
        setGrid(newGrid);
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
