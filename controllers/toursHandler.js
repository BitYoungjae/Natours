import { promises } from 'fs';
import { tours, dataPaths } from '../data.js';
import { sendFail, sendSuccess } from '../lib/jsend.js';

const { writeFile } = promises;
const { tours: tourPath } = dataPaths;

let cachedTours = tours;

// prettier-ignore
export { 
  getAllTours, 
  getTour, 
  createTour, 
  updateTour, 
  deleteTour, 
  checkBody,
  checkId,
  checkIsIn,
};

const writeTours = () =>
  writeFile(tourPath, JSON.stringify(cachedTours), 'utf-8');

const checkId = (req, res, next, val) => {
  const isNum = /^[0-9]+$/.test(val);
  if (!isNum) return sendFail(res, 'TypeError : Id must be numeric');

  next();
};

const checkBody = ({ body = {} }, res, next) => {
  const { name, price } = body;
  if (!name || !price) return sendFail(res, 'Missing name or price');

  next();
};

const checkIsIn = (req, res, next) => {
  const { id } = req.params;
  const tour = cachedTours.find(el => el.id == id);

  if (!tour) return sendFail(res, `Not Found (#${id})`, 404);

  req.tour = tour;
  next();
};

const getAllTours = (req, res) => sendSuccess(res, cachedTours);

const getTour = ({ tour }, res) => {
  sendSuccess(res, tour);
};

const createTour = async ({ body }, res) => {
  const newId = cachedTours[cachedTours.length - 1].id + 1;

  const newTour = {
    id: newId,
    ...body,
  };

  cachedTours.push(newTour);

  try {
    await writeTours();
    sendSuccess(res, cachedTours, 201);
  } catch {
    res.end('Error Occured');
  }
};

const deleteTour = async (req, res) => {
  const { id } = req.params;
  cachedTours = cachedTours.filter(el => el.id != id);

  sendSuccess(res, cachedTours, 200);
  await writeTours();
};

const updateTour = async (req, res) => {
  cachedTours = cachedTours.map(tour => {
    return tour.id == req.params.id
      ? {
          ...tour,
          ...req.body,
        }
      : tour;
  });

  sendSuccess(res, { ...req.tour, ...req.body });
  await writeTours();
};
