import { promises } from 'fs';
const { writeFile } = promises;

//prettier-ignore
export { 
  getAll,
  getOne, 
  createOne 
};

const getAll = (data = []) => {
  return (req, res) => {
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    });
  };
};

const getOne = (data = [], paramKey = 'id', dataKey = 'id') => {
  return (req, res) => {
    const param = req.params[paramKey];
    const one = data.find(el => el[dataKey] == param);

    if (!one) {
      res.status(404).json({
        status: 'fail',
        data: `Not Found (#${param})`,
      });

      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        one,
      },
    });
  };
};

const createOne = (data = [], path, paramKey = 'id', dataKey = 'id') => {
  return async (req, res) => {
    const newId = data[data.length - 1][dataKey] + 1;

    const newOne = {
      [dataKey]: newId,
      ...req.body,
    };

    data.push(newOne);

    try {
      await writeFile(path, JSON.stringify(data), 'utf8');
      res.status(201 /* 201 means created */).json({
        status: 'success',
        data: newOne,
      });
    } catch {
      res.end('Error Occured');
    }
  };
};
