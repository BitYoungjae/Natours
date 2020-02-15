import fs from 'fs';
import path from 'path';
import { getPathNames } from 'esm-pathnames';

const { __dirname } = getPathNames(import.meta);

const dataPaths = {
  tours: path.resolve(__dirname, './dev-data/data/tours-simple.json'),
  users: path.resolve(__dirname, './dev-data/data/users.json'),
};

const tours = JSON.parse(fs.readFileSync(dataPaths.tours, 'utf-8'));
const users = JSON.parse(fs.readFileSync(dataPaths.users, 'utf-8'));

export { tours, users, dataPaths };
