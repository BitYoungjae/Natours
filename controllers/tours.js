import { promises } from 'fs';
import { tours, dataPaths } from '../data.js';
import { getAll, getOne } from '../dataHandler.js';
const { writeFile } = promises;
const { tours: tourPath } = dataPaths;

// prettier-ignore
export { 
  getAllTours, 
  getTour, 
  createTour, 
  updateTour, 
  deleteTour, 
  checkBody,
  checkId,
};

const sendFail = (res, msg) =>
  res.status(400).json({
    status: 'fail',
    message: msg,
  });

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

const getAllTours = getAll(tours);
const getTour = getOne(tours, 'id');

const createTour = async (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = {
    id: newId,
    ...req.body,
  };

  tours.push(newTour);

  try {
    await writeFile(tourPath, JSON.stringify(tours), 'utf8');
    res.status(201 /* 201 means created */).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch {
    res.end('Error Occured');
  }
};

const deleteTour = async (req, res) => {
  const { id } = req.params;
  const prevLength = tours.length;
  tours = tours.filter(el => el.id != id);

  if (prevLength !== tours.length) {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });

    await writeFile(tourPath, JSON.stringify(tours), 'utf-8');

    return;
  }

  res.status(404 /*404 means Not Found*/).json({
    status: 'fail',
    data: `Not Found (#${id})`,
  });
};

const updateTour = async (req, res) => {
  const { id } = req.params;
  let tour = tours.find(el => el.id == id);

  if (!tour) {
    res.status(404 /*404 means Not Found*/).json({
      status: 'fail',
      data: `Not Found (#${id})`,
    });

    return;
  }

  tours = tours.map(tour => {
    return tour.id == id
      ? {
          ...tour,
          ...req.body,
        }
      : tour;
  });

  tour = tours.find(el => el.id == id);

  res.status(200).json({
    status: 'success',
    data: {
      ...tour,
    },
  });

  await writeFile(tourPath, JSON.stringify(tours), 'utf-8');
};
