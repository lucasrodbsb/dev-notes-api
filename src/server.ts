import express, { urlencoded } from "express";
import cors from "cors";
import notesRoute from "./routes/notesRoutes"
import userRoute from "./routes/userRoutes"
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


const app = express();

dotenv.config();

let PORT = process.env.API_PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: ['POST']
  })
);

app.use(urlencoded({ extended: true }));

app.use(express.json());

app.use(userRoute)
app.use(notesRoute)

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} port.`)
})
