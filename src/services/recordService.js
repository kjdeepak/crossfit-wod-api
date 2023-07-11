const { v4: uuid } = require("uuid");

const Record = require("../database/record");

const getAllRecords = () => {
  try {
    return Record.getAllRecords();
  } catch (error) {
    throw error;
  }
};
const getOneRecord = (recordId) => {
  try {
    return Record.getOneRecord(recordId);
  } catch (error) {
    throw error;
  }
};
const createNewRecord = (newRecordDetails) => {
  try {
    const newRecord = {
      id: uuid(),
      ...newRecordDetails,
    };
    return Record.createNewRecord(newRecord);
  } catch (error) {
    throw error;
  }
};
const updateOneRecord = (recordId, changes) => {
  try {
    return Record.updateOneRecord(recordId, changes);
  } catch (error) {
    throw error;
  }
};
const deleteOneRecord = (recordId) => {
  try {
    return Record.deleteOneRecord(recordId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRecords,
  getOneRecord,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
};
