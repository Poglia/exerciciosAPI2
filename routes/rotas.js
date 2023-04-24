const { Router } = require('express');

const { getExercicios, addExercicio, updateExercicio,
deleteExercicio, getExercicioPorCodigo } = require('../controllers/exerciciosController')

const rotas = new Router();

rotas.route('/exercicios')
     .get(getExercicios)
     .post(addExercicio)
     .put(updateExercicio);

rotas.route('/exercicios/:codigo')
     .get(getExercicioPorCodigo)
     .delete(deleteExercicio);

module.exports = rotas;