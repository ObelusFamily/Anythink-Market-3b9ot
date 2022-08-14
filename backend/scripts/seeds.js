//TODO: seeds script should come here, so we'll be able to put some data in our local mongo db
require("dotenv").config();
const mongoose = require("mongoose");
const isProduction = process.env.NODE_ENV === "production";
const { randUserName, randProductAdjective, randEmail, randProductDescription, randProductName, randCatchPhrase } = require('@ngneat/falso');



const User = require("../models/User");
const Item = require("../models/Item");

const santizeUserName = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, "");
}


(async ()=>{
    mongoose.connect(process.env.MONGODB_URI);
    if (!isProduction) {
        mongoose.set("debug", true);
    }
    // drop all users and items collections
    await User.deleteMany({});
    await Item.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const user = new User({
            username: `${santizeUserName(randUserName())}${i}`,
            email: randEmail(),
            image: "https://picsum.photos/600",
            bio: randCatchPhrase(),
        });
        user.setPassword("password");
        await user.save();
        const items = [];
        for (let j = 0; j < 100; j++) {
            items.push(new Item({
                title: randProductName(),
                description: randProductDescription(),
                image: `https://picsum.photos/id/${j}/200/300`,
                tagList: [randProductAdjective(), randProductAdjective()],
                seller: user._id,
            }));
        }
        await Item.insertMany(items);
    }
    process.exit();    
})();
