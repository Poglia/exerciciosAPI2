const { getExerciciosDB, addExercicioDB, updateExercicioDB,
deleteExercicioDB, getExercicioPorCodigoDB } = require('../useCases/exercicioUseCases');

const getExercicios = async (request, response) => {
    await getExerciciosDB()
          .then(data => response.status(200).json(data))
          .catch(err => {
            response.status(400).json({
                status : 'error',
                message : 'Erro ao consultar os exercícios: ' + err
            })
          })
}

const addExercicio = async (request, response) => {
    await addExercicioDB(request.body)
          .then(data => response.status(200).json({
            status : "success", message : "Exercício criado",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const updateExercicio = async (request, response) => {
    await updateExercicioDB(request.body)
          .then(data => response.status(200).json({
            status : "success", message : "Exercício alterado",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const deleteExercicio = async (request, response) => {
    await deleteExercicioDB(request.params.codigo)
          .then(data => response.status(200).json({
            status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const getExercicioPorCodigo = async (request, response) => {
    await getExercicioPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

module.exports = { getExercicios, addExercicio, 
    updateExercicio, deleteExercicio, getExercicioPorCodigo }