import mysql from "mysql";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import ejs from "ejs";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PRASHANT70nawale38@",
    database: "ayushmanhospital"
});
connection.connect((err, data) => {
    if (err) {
        console.log("Database is not connected");
    } else {
        console.log("Connection with ayushmanhospital Established..");
    }
});



const app = express();
const staticpath = "D:\\User\\admin\\Desktop\\NodeJs\\Projects\\Food_Delivery\\template"
app.use(express.static(staticpath));
// app.engine('html', ejs.renderFile)
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.render(staticpath + "//index.html");
});

app.post("/submit", (req, res) => {
    const zone = req.body.zone;
    const organization_id = req.body.organization_id;
    const total_distance = req.body.total_distance;
    const item_type = req.body.item_type;
    var price = 10;
    if (total_distance > 5 && item_type == "perishable") {
        price = price + 1.5 * (total_distance - 5);
    } else if (total_distance > 5) {
        price = price + total_distance - 5;
    }

    res.json({
        price: `Price of the item is ${price}`
    });
})

app.listen(8000);