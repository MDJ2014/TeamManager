'use strict';


var mongoose = require('mongoose');

var FeeSchema = new mongoose.Schema({
        feeSeason: {type: String, required: true},
       // feeName: {type: String, required: true},
       feeName: {type: String, enum:["Registration","Equipment","Awards","Photo","Party","Jersey","Misc"], required: true, unique:true},
        feeAmount: {type: Number, required: true}
     });




var Fee = mongoose.model('Fee', FeeSchema);

module.exports.Fee = Fee;