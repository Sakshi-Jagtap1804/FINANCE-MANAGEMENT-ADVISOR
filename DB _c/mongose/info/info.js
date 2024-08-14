const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/Investment")
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Failed to connect to MongoDB:", error));

const investmentSchema = require('../../../PlanMine/investmentSchema'); // Ensure this schema is defined and exported correctly
const User = mongoose.model('test1', investmentSchema);

// GET route to fetch amount invested from the database
app.get("/getAmountInvested", async (req, res) => {
    try {
        const lastDocument = await User.findOne().sort({ _id: -1 });
        res.json({ amountToInvest: lastDocument ? lastDocument.amountToInvest : null });
    } catch (error) {
        console.error("Error fetching data from the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/api/enquiry", async (req, res) => {
    try {
        const lastEntry = await User.findOne().sort({ _id: -1 }).limit(1);
        res.json(lastEntry);
    } catch (error) {
        console.error("Error fetching last entry:", error);
        res.status(500).json({ error: "Failed to fetch last entry" });
    }
});


// POST route to handle form submission
app.post('/post', async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, phone, age, gender, salary, retireage, childrens, childexpense,
            parents, parexpenses, emergencyexpenses, loan, loanamount, loaninterest,
            expenditure } = req.body;

        // Calculate amountToInvest
        const amountToInvest = salary - parexpenses - childexpense - loanamount - emergencyexpenses - expenditure;

        // Create a new user instance
        const user = new User({
            name, email, phone, age, gender, salary, retireage, childrens, childexpense,
            parents, parexpenses, emergencyexpenses, loan, loanamount, loaninterest,
            expenditure, amountToInvest
        });

        // Save user data to the database
        await user.save();
        console.log("Investment details saved successfully:", user);

        // Redirect to the next page
        res.redirect('/plantype');
    } catch (err) {
        console.error("Error saving investment details:", err);
        res.status(400).send(err);
    }
});

// Serve Plandetails.html when root URL is accessed
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"info.html"));
});

// Serve plantype.html
app.get("/plantype", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../PlanMine/plantype.html"));
});

// Serve goaloptions.html
app.get('/goaloptions', (req, res) => {
    res.sendFile(path.join(__dirname, "../../../PlanMine/goaloptions.html"));
});

// Redirect to marriage.html

const port = 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = User;
