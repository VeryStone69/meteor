
export type TaskType = {
    _id: string;
    text: string;
    isChecked: boolean;
    createdAt: Date;
};

export type TaskInsertInput = Omit<TaskType, "_id">;

export type ToggleCheckedArgs = {
    _id: string;
    isChecked: boolean;
};
