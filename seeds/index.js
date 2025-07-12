const mongoose = require('mongoose');   
const axios = require('axios');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// const fetchRandomImage = async () => {
//     try {
//         const response = await axios.get('https://api.unsplash.com/photos/random', {
//             params: {
//                 query: 'camping',
//                 client_id: 'Z8VA-_RlJpCKxmCoCsDq8U9IyBLhCtiaSOD7BNRKA3I'  // Replace with your Unsplash Access Key
//             }
//         });
//         const imageUrl = response.data.urls.small;
//         console.log('Fetched image URL:', imageUrl);
//         return imageUrl;
//     } catch (error) {
//         console.error('Error fetching image from Unsplash', error);
//         // Return a default image URL in case of an error
//         return 'https://via.placeholder.com/300';
//     }
// };

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 100; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 12000);
        // const image = await fetchRandomImage();
        const camp = new Campground({
            author: '6661a658fca9e96d6ed55bdd',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)}, ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/de5hfnodk/image/upload/v1717936417/YelpCamp/k3evezc9mzv4wn6smh3u.webp',
                  filename: 'YelpCamp/k3evezc9mzv4wn6smh3u',
                },
                {
                  url: 'https://res.cloudinary.com/de5hfnodk/image/upload/v1717933877/YelpCamp/gqmmbewkkytcvopqjgl1.png',
                  filename: 'YelpCamp/gqmmbewkkytcvopqjgl1',
                }
              ],
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quam similique neque numquam dolorum! A autem doloremque quia maiores animi cumque ipsum dolores ea officiis tempore laborum, aspernatur nostrum quis.`, 
            price: `${price}`,
            geometry : { 
                type: 'Point',
                coordinates: [cities[random1000].longitude , cities[random1000].latitude] 
            },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});   