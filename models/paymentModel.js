'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new mongoose.Schema({
    payerId: {type: Schema.Types.ObjectId, ref: 'User'},
    paymentType: {type: String, required: true},
    paymentAmt: {type: Number, required: true},
    date:{type: Date}
});




var Payment = mongoose.model('Payment', PaymentSchema);

module.exports.Payment = Payment;