import {Db, MongoClient} from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

async function connectDB(): Promise<Db> {
    try {
        const conn: MongoClient = await client.connect();
        console.log("Connected to the database!");
        return conn.db("angular-todo");
    } catch (e) {
        console.error("Error connecting to the database:", e);
        throw e;
    }
}

export default connectDB;
