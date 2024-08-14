const mongoose = require("mongoose");
const express = require("express");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/Investment1").then(() => {
   console.log("Connected to MongoDB");
 })
 .catch((error) => {
   console.error("Failed to connect to MongoDB:", error);
 });
 const investmentSchema = new mongoose.Schema({
   // Define your schema fields here
   name: String,
   amount: Number,
   interest: Number,
   Risk:String,
   Maturity: Number,
   Min_Age:Number,
   Gender:String,
   Max_Age:Number,
   Max_Amount:Number,

   // Add more fields as needed
 });
 
 const option = mongoose.model('option2', investmentSchema);
 const createDocument =async()=>{try {
   const mutualFunds=new option({
      name: "Mutual Funds",
      amount: 1000,
      interest: 5,
      Risk:"medium",
      Min_Age:18,
      Gender:"Both",
    })
    const GOLD_EFT=new option({
      name: "GOLD_EFT",
      amount: 1000,
      Min_Age:16,
      Risk:"medium",
      Gender:"Both",
    })
    const ISTATE=new option({
      name: "ISTATE",
      amount: 1000,
      interest: 5,
      Risk:"medium",
      Min_Age:18,
      Gender:"Both",

    })
    const ppf=new option({
      name: "Public Provident Fund",
      amount: 500,
      interest: 7.1,
      Risk:"low",
      Min_Age:18,
      Gender:"Both",
      Max_Amount:150000,
      Maturity: 15,
    })
    const carpbonds=new option({
      name: "Carporate Bonds",
      amount: 1000,
      interest: 7,
      Risk:"high",
      Min_Age:16,
      Gender:"Both",
        
      })
    const govnbonds=new option({
      name: "Government Bonds",
      amount: 1000,
      interest: 7.75,
      Risk:"low",
      Min_Age:16,
      Gender:"Both",
     
      })
    const Shares=new option({
        name: "Shares",
        amount: 1,
        Risk:"high",
        Min_Age:18,
        Gender:"Both",
      })
      const Postoffice=new option({
        name: "Post Office Deposit ",
        amount: 1000,
        interest:7.4,
        Risk:"low",
    Min_Age:18,
    Gender:"Both",
    Max_Amount:900000,
    Maturity: 1,
      })
      const SovereignGoldBond=new option({
        name: "SGB",
        amount: 1,
        interest:2.5 ,
        Risk:"low",
        Min_Age:18,
      Gender:"Both",
      Max_Amount:900000,
      Maturity: 1,
      })
      const Crypto=new option({
        name: "Crypto Currency",
        amount: 500,
       
        Risk:"high",
        Min_Age:18,
        Gender:"Both",
        
      })
      const KVP =new option({
        name: "Kisan Vikas Patra ",
        amount: 1000,
        interest:6.9 ,
        Risk:"medium",
        Maturity:9.5,
        Min_Age:18,
        Gender:"Both",
       
        
      })
      const SCSS=new option({
        name: "Senior Citizens Savings Scheme ",
        amount: 1000,
        interest:7.4,
        Risk:"low",
        Maturity:5,
        Gender:"Both",
        Min_Age:55,
        Max_Amount:1500000,
      })
      const SSA=new option({
        name: "Sukanya Samriddhi Account",
        amount: 250,
        interest:7.6,
        Risk:"low",
        Maturity:21,
        Gender:"Female",
        Min_Age:0.1,
        Max_Age:10,
        Max_Amount:150000,
      })
      const RD=new option({
        name: "Recurring Deposit ",
        amount:100,
        interest:5,
        Risk:"low",
        Maturity:0.5,
        Gender:"Both",
        Min_Age:10,
        Max_Amount:100000,
      })
      const VPF =new option({
        name: "Voluntary Provident Fund  ",
        amount:100,
        interest:8.5,
        Risk:"low",
        Maturity:5,
        Min_Age:18,
        Max_Age:60,
        Gender:"Both",
      })
      const NPS =new option({
        name: "National Pension System ",
        amount:500,
        interest:9,
        Risk:"medium",
        Maturity:60,
        Gender:"Both",
        Min_Age:18,
        Max_Age:65,
        
      })
      const ULIP =new option({
        name: "Unit-Linked Insurance Plan ",
        amount:1000,
        interest:9,
        Risk:"medium",
        Maturity:5,
        Gender:"Both",
        Min_Age:18,
        Max_Age:65,
       
      })
      const ELSS =new option({
        name: "Equity Linked saving Scheme",
        amount:500,
        interest:15,
        Risk:"high",
        Maturity:3,
        Gender:"Both",
        Min_Age:18,
        
      })
      const IF=new option({
        name: "International Funds",
        amount:500,
        interest:2.3,
        Risk:"high",
        Maturity:3,
        Gender:"Both",
        Min_Age:18,
       
      })
      const EMF=new option({
        name: "Equity Mutual Funds",
        amount:100,
        Risk:"high",
        Gender:"Both",
        Min_Age:18,
        
        
      })
      const DirectEquity =new option({
        name: "Direct Equity",
        amount:1,
        Risk:"high",
        Gender:"Both",
        Min_Age:18,
        
      })
      const HybridFund=new option({
        name: "Hybrid Funds",
        amount:500,
        interest:13,
        Risk:"medium",
        Maturity:3,
        Gender:"Both",
        Min_Age:18,
      })
      const DeptFund=new option({
        name: "dept Funds",
        amount:100,
        Risk:"low",
        Gender:"Both",
        Min_Age:18,
        
      })
   const result = await option.insertMany([mutualFunds,GOLD_EFT,ISTATE,ppf,
                  carpbonds,govnbonds,Shares,Postoffice,SovereignGoldBond,
                  Crypto,KVP,SCSS,SSA,RD,VPF,NPS,ULIP,ELSS,IF,EMF,DirectEquity,
                  HybridFund,DeptFund]);
 } catch (error) {
   console.log(error);
 }
   
    }
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
 
 createDocument();