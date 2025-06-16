
export type TaskType = {
    _id: string;
    text: string;
    createdAt: Date;
    grid?: number[][]; // поле для хранения состояния сетки
};

export type TaskInsertInput = Omit<TaskType, "_id">;

export type ToggleCheckedArgs = {
    _id: string;
    isActive: boolean;
};

export interface RoomType {
    _id?: string;
    title: string;
    grid: number[][];
}

