import Tour from '../model/tourModel.js';
import { sendFail, sendSuccess } from '../lib/jsend.js';

const getAllTours = async (req, res) => {
  const tours = await Tour.find();
  res.send(tours);
};

const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findOne({ _id: id });
    sendSuccess(res, tour);
  } catch (e) {
    sendFail(res, e.message);
  }
};

const createTour = async ({ body }, res) => {
  try {
    await Tour.create(body);
  } catch (e) {
    return sendFail(res, e.message);
  }

  res.send();
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
    await Tour.updateOne(
      {
        _id: id,
      },
      req.body,
    );
  } catch (e) {
    return sendFail(res, e.message);
  }

  sendSuccess(res, `${id} updated succesfully`);
};

// prettier-ignore
export { 
  getAllTours, 
  getTour, 
  createTour, 
  updateTour, 
  deleteTour, 
};
