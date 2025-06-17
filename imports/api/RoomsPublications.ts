import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "./RoomsCollection";
import { Mongo } from 'meteor/mongo';
import {RoomType} from "/imports/types/RoomType";


Meteor.publish("rooms", ():Mongo.Cursor<RoomType> => {
    return RoomsCollection.find();
});