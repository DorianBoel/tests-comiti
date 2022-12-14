import * as cors from "cors";
import { config as envConfig } from "dotenv";
import * as express from "express";
import addContact from "./contact";

const app: express.Express = express.default();

envConfig();
const PORT: string | undefined = process.env.PORT;

app.use(express.json());
app.use(cors.default());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post("/contact", (req, res) => {
    addContact(req.body)
        .then((ent) => {
            console.log("New contact added: ");
            console.log(ent);
            console.log();
            res.send(ent);
        })
        .catch((err: Error) => res.send(err.message));
});
