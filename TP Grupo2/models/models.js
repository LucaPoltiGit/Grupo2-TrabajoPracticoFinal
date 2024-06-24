import User from "./user.js";
import Room from "./room.js";

Room.hasMany(User, {
    foreingKey: {
        name:"room_id",
        allowNull: true
    },
})

User.belongsTo(Room, {
    foreingKey: {
        name:"room_id",
        allowNull: true
    },
})

export { Room, User };