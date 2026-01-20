import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
    name: { type: String },  
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profilepic: { type: String },
    coverpic: { type: String }, 
    razorpayid:{type:String},
    razorpaysecret:{type:String},
}, { 
    // This handles your createdAt and updatedAt automatically!
    timestamps: true 
});

// FIXED LINE: Both sides now use "User" (Singular)
const User = models.User || model("User", userSchema);

export default User;