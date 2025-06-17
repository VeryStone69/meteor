import React, {FormEvent, useState} from "react";
import {Meteor} from 'meteor/meteor';
import {RoomInsertInputType} from "/imports/types/RoomType";


export const RoomNameForm = () => {
    const [text, setText] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text) return;

        const doc: RoomInsertInputType = {
            text: text.trim(),
            createdAt: new Date(),
        };

        await Meteor.callAsync("rooms.insert", doc);
        setText("");
    };

    return (
        <form className="text-form" onSubmit={handleSubmit}>
            <h4>Название комнаты</h4>
            <input
                type="text"
                placeholder="Введите название"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">Создать</button>
        </form>
    );
};