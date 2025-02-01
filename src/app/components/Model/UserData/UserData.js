import mongoose from "mongoose";

// Define the schema
const UserDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    ImageData: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const UserData = mongoose.model('UserData', UserDataSchema);

// Export the model
export default UserData;
