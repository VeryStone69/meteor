import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";
import {TaskType} from "/imports/ui/App";

type TaskInsertInput = Omit<TaskType, "_id">;

Meteor.methods({"tasks.insert"(doc:TaskInsertInput) {
        // (doc)- Аргумент метода. Это будет объект, переданный клиентом.
        return TasksCollection.insertAsync(doc);
    },
});