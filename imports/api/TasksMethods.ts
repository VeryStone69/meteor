import {Meteor} from "meteor/meteor";
import {TasksCollection} from "./TasksCollection";
import type {TaskInsertInput, ToggleCheckedArgs} from "/imports/types/TaskType";


Meteor.methods({
    "tasks.insert"(doc: TaskInsertInput) {
        // (doc)- Аргумент метода. Это будет объект, переданный клиентом.
        return TasksCollection.insertAsync(doc);

    },
    "tasks.toggleChecked"({_id, isChecked}: ToggleCheckedArgs) {
        return TasksCollection.updateAsync(_id, {
            $set: {isChecked: !isChecked},
        });
    },
});