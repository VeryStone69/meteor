export type RoomType = {
    _id: string;
    text: string;
    createdAt: Date;
    grid?: number[][]; // поле для хранения состояния сетки
};

export type TaskInsertInput = Omit<RoomType, "_id">;