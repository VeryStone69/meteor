import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";
import { Mongo } from 'meteor/mongo';
import {TaskType} from "/imports/types/TaskType";


Meteor.publish("tasks", ():Mongo.Cursor<TaskType> => {
    return TasksCollection.find();
});