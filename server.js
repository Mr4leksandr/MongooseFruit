const express = require('express');
const mongoose = require('mongoose');
const app = express();
 
mongoose.connect('mongodb://localhost:27017/fruitDB', { useNewUrlParser: true, useUnifiedTopology: true });

//fruit schema - a blueprint for the object that will be saved in the database
const fruitSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: [true, "Error: no name specified" ]//the property name must not be empty
    },
       rating: {
           type: Number, //must be a number
           min: 1, //minimum value allowed 1
           max: 10 //maximum value allowed 10
       }, 
       review: String 
   });
   

//use the schema to create a Mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

//create a fruit document
const fruit = new Fruit({
    name: "Apple",
    rating: 8,
    review: "Sweet and crunchy"
});
//saving the document (our object) to the database
//fruit.save();

const banana = new Fruit({
    name: "Banana",
    rating: 5,
    review: "Soft texture"
});
 
const lemon = new Fruit({
    name: "Lemon",
    rating: 5,
    review: "Sour as hell"
});

const orange = new Fruit({
    name: "orange",
    rating: 8
});
 
orange.save();

/*const fruit = new Fruit({
    rating: 10,
    review: "Yummy"
});*/

/*const fruit = new Fruit({
    name: "Apple",
    rating: 11,
    review: "Sweet and crunchy"
});*/

//to add all the fruit in bulk
/*Fruit.insertMany([banana, lemon], (error)=> {
    if(error){
        console.log(err);
    } else {
        console.log("Fruit successfully added to the fruitDB");
    }
})*/

Fruit.find(function(error, fruits) {
    if(error){
        console.log(error);
    } else {
        console.log(fruits);
    }
});

Fruit.find(function(error, fruits) {
    if(error){
        console.log(error);
    } else {
        //console.log(fruits);
        fruits.forEach(fruit => {
            console.log(fruit.name);
        });
 
    }
});

Fruit.update({_id: "5e84e9abf929b352c8a05f61"}, {review: "Juicy fruit"}, function(error){
    if(error){
        console.log(error);
    } else {
        console.log("Record successfully updated.");
    }
});

Fruit.deleteMany({name: "Banana"}, function(error){
    if(error){
        console.log(error);
    } else {
        console.log("Item successfully deleted.");
    }
});

app.listen(3000, ()=>{
    console.log("Server is Running on Port 3000");
});
