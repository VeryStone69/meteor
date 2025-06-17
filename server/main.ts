import {Meteor} from 'meteor/meteor';
import {RoomsCollection} from '/imports/api/RoomsCollection';
import "../imports/api/RoomsPublications";
import "../imports/api/RoomsMethods";
import {RoomType} from "/imports/types/RoomType";

type NewRoom = Omit<RoomType, '_id'>;

const insertRoom = async (roomName: string): Promise<void> => {
    const room: NewRoom = {
        text: roomName,
        createdAt: new Date(),
    };
    await RoomsCollection.insertAsync(room);
};

Meteor.startup(async () => {
    if ((await RoomsCollection.find().countAsync()) === 0) {
        [
            'Смайлик',
            'Цветок',
            'Солнце',
            'Футбол',
            'Айтигеник',
        ].forEach(insertRoom);
    }
});