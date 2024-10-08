import mongoose from "mongoose"

const connectToDB = async () => {
    const connectionURL = process.env.MONGODB_URL
    mongoose.connect(connectionURL).then(()=> console.log("DB Connected")).catch(error => console.log(error))
}

export default connectToDB