import app from "./app";
import config from "./config";

const port = config.PORT;

app.listen(port, () => {
    console.log(`Assignment 2 server is running on port ${port}`)
})