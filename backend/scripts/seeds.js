//TODO: seeds script should come here, so we'll be able to put some data in our local mongo db
require("dotenv").config();
const mongoose = require("mongoose");
const isProduction = process.env.NODE_ENV === "production";
const { randUserName, randProductAdjective, randEmail, randProductDescription, randProductName, randCatchPhrase } = require('@ngneat/falso');

const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

const santizeUserName = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, "");
}

const returnRandomArrayItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

(async ()=>{
    mongoose.connect(process.env.MONGODB_URI);
    if (!isProduction) {
        mongoose.set("debug", true);
    }
    // drop all users and items collections
    await User.deleteMany({});
    await Item.deleteMany({});
    await Comment.deleteMany({});
    const users = [];
    const items = [];
    const comments = [];
    for (let i = 0; i < 100; i++) {
        const user = new User({
            username: `${santizeUserName(randUserName())}${i}`,
            email: randEmail(),
            image: "https://picsum.photos/600",
            bio: randCatchPhrase(),
        });
        user.setPassword("password");
        users.push(user);
    }
    await User.insertMany(users);
    
    for (let i = 0; i < 100; i++) {
        items.push(new Item({
            title: randProductName(),
            description: randProductDescription(),
            image: `https://picsum.photos/id/${i}/200/300`,
            tagList: [randProductAdjective(), randProductAdjective()],
            seller: returnRandomArrayItem(users)._id,
        }));
    }
    await Item.insertMany(items);

    for (let i = 0; i < 100; i++) {
        comments.push(new Comment({
            body: randCatchPhrase(),
            seller: returnRandomArrayItem(users)._id,
            item: returnRandomArrayItem(items)._id,
        }));
    }
    await Comment.insertMany(comments);

    console.log("Seeding complete");
    process.exit();    
})();
