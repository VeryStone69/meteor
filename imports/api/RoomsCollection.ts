import {Mongo} from 'meteor/mongo';
import {RoomType} from "/imports/types/RoomType";

// база данных, в которую будут сохраняться задачи.
export const RoomsCollection = new Mongo.Collection<RoomType>('rooms');