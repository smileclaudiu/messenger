const mongoose = require('mongoose');
const CONFIG = require('../config');
var ObjectId = mongoose.Schema.Types.ObjectId;
const mongo_uri = process.env.MONGODB_URI || CONFIG.DB_ADDRESS;


//Se face conexiunea la baza de date cu mongoose
mongoose.connect(mongo_uri, { useNewUrlParser: true })
	.then(data => {
		console.log("Connected to DB")
	})
	.catch(err => {
		console.log(err);
	})
mongoose.set('useCreateIndex', true);

//Se extrage contructorul de schema
var Schema = mongoose.Schema;


//Se creeaza schema utilizatorului cu toate constrangerile necesare
var UserSchema = new Schema({
	email: { type: String, required: true, unique: true, trim: true },
	firstName: { type: String, required: true, trim: true},
	lastName: {type: String, required: true, trim: true },
	password: { type: String, required: true, trim: true, select: false },
	description: { type: String },
	picture: { type: String, trim: true },
	phone: { type: String, trim: true },
	age: { type: Number, min: 16, max: 120 },
	sex: { type: String, enum: ["Male", "Female", null], trim: true },
	newActivity: [{conversation: {type: Schema.Types.ObjectId, ref: 'Conversation'},
					kind: String,
					message: {_id: {type: Schema.Types.ObjectId},
							author: {type: Schema.Types.ObjectId, ref: 'User'},
							message: String,
							timestamp: Date},
					_id: false
				}],
	isOnline: {type: Boolean, default: false},
	friends: [	{friend: {type: Schema.Types.ObjectId, ref: 'User'},
				status: Number,
				conversation: {type: Schema.Types.ObjectId, ref: 'Conversation'}
				}	]
}, {
		versionKey: false
	})

	
//Se adauga schema sub forma de "Colectie" in baza de date
var User = mongoose.model("User", UserSchema);
//Se exporta modelul de control
module.exports = User;