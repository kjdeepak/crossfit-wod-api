const workoutService = require('../services/workoutService');

const getAllWorkouts = (req, res) => {
  const getAllWorkouts = workoutService.getAllWorkouts();
  res.send({status: 'OK', data: getAllWorkouts});
};

const getOneWorkout = (req, res) => {
  const {params: {workoutId}} = req;
  if(!workoutId){
    return;
  }
  const retrievedWorkout = workoutService.getOneWorkout(workoutId);
  res.status(200).send({status: 'OK', data: retrievedWorkout});
};

const createNewWorkout = (req, res) => {
  const {body} = req;

  if(!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips){
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips
  };

  const createdWorkout = workoutService.createNewWorkout(newWorkout);
  res.status(201).send({status: 'OK', data:createdWorkout});
};

const updateOneWorkout = (req, res) => {
  workoutService.updateOneWorkout();
  res.send("Update an existing workout");
};

const deleteOneWorkout = (req, res) => {
  const {params: {workoutId}} = req;
  if(!workoutId){
    return;
  }

  workoutService.deleteOneWorkout(workoutId);
  res.status(204).send({status: 'OK'});
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
