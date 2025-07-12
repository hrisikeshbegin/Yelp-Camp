// controllers/campgrounds.js

const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');
const NodeGeocoder = require('node-geocoder');

// Use OpenStreetMap via node-geocoder (no API key required)
const geocoder = NodeGeocoder({ provider: 'openstreetmap' });

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new');
};

module.exports.renderContactUs = (req, res) => {
  res.render('campgrounds/contactUs');
};

module.exports.createCampground = async (req, res, next) => {
  // geocode returns an array; we take the first result
  const [geoData] = await geocoder.geocode(req.body.campground.location);
  const campground = new Campground(req.body.campground);
  // build GeoJSON point
  campground.geometry = {
    type: 'Point',
    coordinates: [geoData.longitude, geoData.latitude]
  };
  campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.author = req.user._id;
  await campground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: { path: 'author' }
    })
    .populate('author');
  if (!campground) {
    req.flash('error', 'Requested Campground is not available!');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash('error', 'Requested Campground is not available!');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
};

module.exports.updateCampground = async (req, res) => {
  // re-geocode the updated location
  const [geoData] = await geocoder.geocode(req.body.campground.location);

  const { id } = req.params;
  const campground = await Campground.findById(id);

  // add any new uploaded images
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.images.push(...imgs);

  // update geometry
  campground.geometry = {
    type: 'Point',
    coordinates: [geoData.longitude, geoData.latitude]
  };

  // assign other updated fields (name, price, etc.)
  Object.assign(campground, req.body.campground);
  await campground.save();

  // delete images if requested
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }

  req.flash('success', 'Successfully updated the campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'Campground has been successfully deleted!');
  res.redirect('/campgrounds');
};
