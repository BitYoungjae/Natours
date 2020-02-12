import fs, { promises } from 'fs';
import path from 'path';
import express from 'express';
import { getPathNames } from 'esm-pathnames';

const { writeFile } = promises;
const { __dirname } = getPathNames(import.meta);

const app = express();

// Use middlewares
app.use(express.json());

// Global Variables
const dataPath = path.resolve(__dirname, './dev-data/data/tours-simple.json');
let tours = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Routes
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  const tour = tours.find(el => el.id == id);

  if (!tour) {
    res.status(404 /*404 means Not Found*/).json({
      status: 'fail',
      data: `Not Found (#${id})`,
    });

    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', async (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = {
    id: newId,
    ...req.body,
  };

  tours.push(newTour);

  try {
    await writeFile(dataPath, JSON.stringify(tours), 'utf8');
    res.status(201 /* 201 means created */).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch {
    res.end('Error Occured');
  }
});

app.delete('/api/v1/tours/:id', async (req, res) => {
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

    await writeFile(dataPath, JSON.stringify(tours), 'utf-8');

    return;
  }

  res.status(404 /*404 means Not Found*/).json({
    status: 'fail',
    data: `Not Found (#${id})`,
  });
});

app.patch('/api/v1/tours/:id', async (req, res) => {
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

  await writeFile(dataPath, JSON.stringify(tours), 'utf-8');
});

// Boiler Plate
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
