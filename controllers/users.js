import { users, dataPaths } from '../data.js';
import { getAll, getOne, createOne } from '../dataHandler.js';

export { getAllUsers, getUser, createUser };

const getAllUsers = getAll(users);
const getUser = getOne(users, 'id', '_id');
const createUser = createOne(users, dataPaths.users, 'id', '_id');
