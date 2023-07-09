const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const getOneWorkout = (workoutId) => {
  return DB.workouts.find((item) => item.id === workoutId) || null;
};

const createNewWorkout = (newWorkout) => {
  const alreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

  if (alreadyAdded) {
    return;
  }

  DB.workouts.push(newWorkout);
  saveToDatabase(DB);
  return newWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
  const index = DB.workouts.findIndex((item) => item.id === workoutId);
  if (index === -1) {
    return null;
  }

  const updatedWorkout = {
    ...DB.workouts[index],
    ...changes,
  };

  DB.workouts[index] = updatedWorkout;

  saveToDatabase(DB);
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
  const index = DB.workouts.findIndex((item) => item.id === workoutId);
  if (index === -1) {
    return null;
  }

  DB.workouts.splice(index, 1);
  saveToDatabase(DB);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
