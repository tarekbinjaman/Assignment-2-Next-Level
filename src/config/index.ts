import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env")});
// process.cwd() means root of the file
// dotenv.config({path: path.join(process.cwd(), ".env")}); > full path to .env
// dotenv.config is a setting for dotenv. in this case we setting a thing that helps us to setting up .env access that we can use .env things from anywhere in the project

const config = {
    CONNECTION_STR: process.env.CONNECTION_STR,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
};

export default config;