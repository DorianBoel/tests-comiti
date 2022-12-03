import * as express from "express";
import * as cors from "cors";
import addContact from "./contact";

const app: express.Express = express.default();
const PORT: number = 8008;

app.use(express.json());
app.use(cors.default());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post("/contact/add", (req, res) => {
    addContact(req.body)
        .then((entry) => {
            console.log("New contact added: ");
            console.log(entry);
            console.log();
            res.send(entry);
        })
        .catch((err: Error) => res.send(err.message));
});
