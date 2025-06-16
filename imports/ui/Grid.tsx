import React, {useState} from 'react';

//  Утилита: создаёт пустую сетку 10×10, заполненную нулями (0 означает белую ячейку)
const generateEmptyGrid = (): number[][] =>
    Array.from({length: 10}, () => Array(10).fill(0));

export const Grid: React.FC = () => {
    const [grid, setGrid] = useState<number[][]>(generateEmptyGrid);

    //  Функция для изменения состояния одной ячейки по индексу строки и столбца
    const toggleCell = (row: number, col: number) => {
        // Копируем сетку и изменяем только нужную ячейку
        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
                // Если совпадает нужная ячейка — инвертируем её значение: 0 -> 1, 1 -> 0
                rowIndex === row && colIndex === col ? 1 - cell : cell
            )
        );
        setGrid(newGrid);
    };

    return (
        // контейнер, чтобы можно было отобразить всё как блок
        <div style={{display: 'inline-block'}}>
            {grid.map((row, rowIndex) => (
                // Для каждой строки — создаём div с display: flex (чтобы ячейки шли в ряд)
                <div key={rowIndex} style={{display: 'flex'}}>
                    {row.map((cell, colIndex) => {
                        // Уникальный ID для каждой ячейки: "строка-столбец" ("3-7")
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
