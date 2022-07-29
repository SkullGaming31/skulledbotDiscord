const { model, Schema} = require("mongoose");

module.exports = model("CardSystemDB", new Schema({
    GuildID: String,

    // Welcome Card
    WelcomeTitle: String,
    WelcomeDesc: String,
    WelcomeChannel: String,

    // Leave Card
    LeaveTitle: String,
    LeaveDesc: String,
    LeaveChannel: String,
}));