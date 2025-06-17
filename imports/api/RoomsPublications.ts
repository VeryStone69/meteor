import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./RoomsCollection";
import { Mongo } from 'meteor/mongo';
import {RoomType} from "/imports/types/RoomType";


Meteor.publish("tasks", ():Mongo.Cursor<RoomType> => {
    return TasksCollection.find();
});