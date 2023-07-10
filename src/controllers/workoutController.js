const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  try {
    const getAllWorkouts = workoutService.getAllWorkouts();
    res.send({ status: "OK", data: getAllWorkouts });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error });
  }
};

const getOneWorkout = (req, res) => {
  try {
    const {
      params: { workoutId },
    } = req;
    if (!workoutId) {
      res.status(400).send({ status: "FAILED", data: "Missing workoutId" });
      return;
    }
    const retrievedWorkout = workoutService.getOneWorkout(workoutId);
    res.status(200).send({ status: "OK", data: retrievedWorkout });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error });
  }
};

const createNewWorkout = (req, res) => {
  const { body } = req;

  if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
    res
      .status(400)
      .send({ status: "FAILED", data: { error: "One of the parameters missing[name, body, equipment,exercises, trainerTips]" } });
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req, res) => {
  try {
    const {
      params: { workoutId },
      body,
    } = req;
    if (!workoutId) {
      res.status(400).send({ status: "FAILED", data: "Missing workoutId" });
      return;
    }
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.status(200).send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: error?.message || error });
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    return;
  }

  workoutService.deleteOneWorkout(workoutId);
  res.status(204).send({ status: "OK" });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
