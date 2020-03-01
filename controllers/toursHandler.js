import Tour from '../model/tourModel.js';
import { sendFail, sendSuccess } from '../lib/jsend.js';

const getAllTours = async (req, res) => {
  const tours = await Tour.find();
  sendSuccess(res, tours);
};

const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findOne({ _id: id });
    if (!tour) throw new Error(`Not Found (id : ${id})`);
    sendSuccess(res, tour);
  } catch (e) {
    sendFail(res, e.message);
  }
};

const searchTour = async (req, res) => {
  const { text } = req.params;
  try {
    const tours = await Tour.findByTourText(text);
    if (!tours.length) throw new Error(`Not Found (search : ${text})`);
    sendSuccess(res, tours);
  } catch (e) {
    sendFail(res, e.message);
  }
};

const createTour = async ({ body }, res) => {
  try {
    const newTour = await Tour.create(body);
    sendSuccess(res, newTour, 201);
  } catch (e) {
    return sendFail(res, e.message);
  }
};

const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    await Tour.deleteOne({
      _id: id,
    });
  } catch (e) {
    return sendFail(res, e.message);
  }

  sendSuccess(res, `${id} removed sucessfully`);
};

const updateTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).exec();
    if (!tour) throw new Error(`Not Found (id : ${id})`);
    return sendSuccess(res, tour);
  } catch (e) {
    return sendFail(res, e.message);
  }
};

// prettier-ignore
export { 
  getAllTours, 
  getTour, 
  createTour, 
  updateTour, 
  deleteTour,
  searchTour
};
