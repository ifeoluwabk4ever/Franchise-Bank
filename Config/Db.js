import mongoose from 'mongoose'


const connectDB = async () => {
   await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
   }, err => {
      if (err) throw err
   })
   console.log(`Connected to mongodb://${mongoose.connection.host}/${mongoose.connection.name}`.cyan.bgMagenta.bold);
}

export default connectDB