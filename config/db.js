import mongoose from "mongoose";
import { env } from './env.js';


export async function connectDatabase() {
    mongoose.set('strictQuery', true);

    mongoose.connection.on('connected', () => console.log("✅ Connected to the Reddit database successfully"));
    mongoose.connection.on('error', (error) => console.error("❌ Reddit database error:", error.message));
    mongoose.connection.on('disconnected', () => console.warn("⚠️ Disconnected from Reddit database. Attempting to reconnect...:"));

    const options = {
        autoIndex: !env.isProduction,
        maxPoolSize: 50,
        serverSelectionTimeout: 5000,
        socketTimeout: 45000
    };

    try {
        await mongoose.connect(env.mongoURI, options)

    } catch (error) {
        console.error('❌ Critical: Failed to connect to MongoDB ', error.message)
        process.exit(1);

    }


};

export async function closeDatabase() {
    try {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed safely')
        
    } catch (error) {
        console.error('❌ Error during MongoDB shutdown:', error.message)
        
    }
}