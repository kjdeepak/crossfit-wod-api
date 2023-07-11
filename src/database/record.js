const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllRecords = () => {
  try {
    return DB.records;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};
const getOneRecord = (recordId) => {
  try {
    const result = DB.records.find((item) => item.id === recordId) || null;
    if (result) {
      return result;
    } else {
      throw {
        status: 400,
        message: `Record not found`,
      };
    }
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};
const createNewRecord = (newRecordDetails) => {
  try {
    DB.records.push(newRecordDetails);
    saveToDatabase(DB);
    return newRecordDetails;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};
const updateOneRecord = (recordId, changes) => {
  try {
    const itemIndex = DB.records.findIndex((item) => item.id === recordId);
    if (itemIndex === -1) {
      throw {
        status: 400,
        message: "Record not found",
      };
    }
    const updatedRecordDetails = {
      ...DB.records[itemIndex],
      ...changes,
    };
    DB.records[itemIndex] = updatedRecordDetails;
    saveToDatabase(DB);
    return updatedRecordDetails;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};
const deleteOneRecord = (recordId) => {
  try {
    const itemIndex = DB.records.findIndex((item) => item.id === recordId);
    if (itemIndex === -1) {
      throw {
        status: 400,
        message: "Record not found",
      };
    }
    DB.records.splice(itemIndex, 1);
    saveToDatabase(DB);
    return recordId;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getAllRecords,
  getOneRecord,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
};
