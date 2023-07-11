const recordService = require("../services/recordService");

const getAllRecords = (req, res) => {
  try {
    const result = recordService.getAllRecords();
    res.status(200).send({ status: "OK", data: result });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error });
  }
};
const getOneRecord = (req, res) => {
  try {
    const {
      params: { recordId },
    } = req;
    if (!recordId) {
      res.status(400).send({ status: "FAILED", data: "Parameter recordId is missing" });
      return;
    }
    const result = recordService.getOneRecord(recordId);
    res.status(200).send({ status: "OK", data: result });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error });
  }
};
const createNewRecord = (req, res) => {
  try {
    const { body } = req;
    if (!body.workout || !body.record) {
      res.status(400).send({ status: "FAILED", data: `One of the parameters [workout, record] missing` });
      return;
    }
    const result = recordService.createNewRecord(body);
    res.status(201).send({ status: "OK", data: result });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error });
  }
};
const updateOneRecord = (req, res) => {
  try {
    const {
      params: { recordId },
      body,
    } = req;
    if (!recordId || !body) {
      res.status(400).send({ status: "FAILED", data: `One of the parameters [recordId, workout, record] missing` });
      return;
    }
    const result = recordService.updateOneRecord(recordId, body);
    res.status(200).send({ status: "OK", data: result });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error });
  }
};
const deleteOneRecord = (req, res) => {
  try {
    const {
      params: { recordId },
    } = req;
    if (!recordId) {
      res.status(400).send({ status: "FAILED", data: "Parameter recordId is missing" });
      return;
    }
    const result = recordService.deleteOneRecord(recordId);
    res.status(204).send({ status: "OK", data: result });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error });
  }
};

module.exports = {
  getAllRecords,
  getOneRecord,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
};
