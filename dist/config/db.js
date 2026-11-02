import mongoose from "mongoose";
const connectDB = async (url) => {
    await mongoose.connect(url);
    console.log("MongoDB connected");
};
export default connectDB;
//# sourceMappingURL=db.js.map