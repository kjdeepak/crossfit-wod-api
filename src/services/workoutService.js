const { v4: uuid } = require("uuid");

const Workout = require("../database/workout");

const getAllWorkouts = () => {
  const getAllWorkouts = Workout.getAllWorkouts();
  return getAllWorkouts;
};

const getOneWorkout = (workoutId) => {
  const retrievedWorkout = Workout.getOneWorkout(workoutId);
  return retrievedWorkout;
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
  };
  const createdWorkout = Workout.createNewWorkout(workoutToInsert);
  return createdWorkout;
};

const updateOneWorkout = () => {
  return;
};

const deleteOneWorkout = () => {
  return;
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
