export type RoomType = {
    _id: string;
    text: string;
    createdAt: Date;
    grid?: number[][];
};

export type RoomInsertInputType = Omit<RoomType, "_id">;