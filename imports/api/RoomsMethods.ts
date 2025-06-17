import {Meteor} from "meteor/meteor";
import {TasksCollection} from "./RoomsCollection";
import type {TaskInsertInput} from "/imports/types/RoomType";
import {check} from "meteor/check";


Meteor.methods({
    "tasks.insert"(doc: TaskInsertInput) {
        // (doc)- Аргумент метода. Это будет объект, переданный клиентом.
        return TasksCollection.insertAsync(doc);

    },
    "tasks.updateGrid"({_id, grid}: { _id: string; grid: number[][] }) {
        check(_id, String);
        check(grid, Array);
        return TasksCollection.updateAsync(_id, {
            $set: {grid},
        });
    },
    "tasks.delete"({_id}: { _id: string }) {
        return TasksCollection.removeAsync(_id);
    },
});