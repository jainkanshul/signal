
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Email: { type: String, required: true },
    Country: { type: String, required: true },
    PhoneNumber: { type: String},
    Password: { type: String, required: true },
    Location: { type: String },
    IP: { type: String },
    services: { type:  [], required: true },
    devicetoken: { type: String},
    devicetype: { type:  String},
    createddate: { type: Date, default: Date.now },
    issubscribed: { type: Boolean, default: false },
    isfreetrailaproove: { type: Boolean, default: false },
    isexpire: { type: Boolean, default: false },
    isSubscriptionaproove: { type: Boolean, default: false },
    startdate: { type: Date },
    fromdate: { type: Date },
    amountrecive: { type: String },
    totalamount: { type: String},
    isedit: { type: String,default: false }

});

module.exports = mongoose.model('Userdetail', userSchema);
