import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";
import {Mongo} from "/.meteor/local/build/programs/server/assets/packages/mongo/mongo";
import {TaskType} from "/imports/ui/App";


Meteor.publish("tasks", ():Mongo.Cursor<TaskType> => {
    return TasksCollection.find();
});