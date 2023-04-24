const { pool } = require('../config')
const Exercicio = require('../entities/exercicio')

const getExerciciosDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM exercicios ORDER BY codigo');
        return rows.map((exercicio) => new Exercicio(exercicio.codigo, exercicio.nome,
            exercicio.series, exercicio.repeticoes));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addExercicioDB = async (body) => {
    try {
        const { nome, series, repeticoes } = body;
        const results = await pool.query(`INSERT INTO exercicios (nome, series,
            repeticoes) VALUES ($1, $2, $3) 
            RETURNING codigo, nome, series, repeticoes`, 
            [nome, series, repeticoes]);
        const exercicio = results.rows[0];
        return new Exercicio(exercicio.codigo, exercicio.nome, exercicio.series, exercicio.repeticoes);
    } catch (err){
        throw "Erro ao inserir o exercicio: " + err;
    }
}

const updateExercicioDB = async (body) => {
    try {
        const { codigo, nome, series, repeticoes } = body;
        const results = await pool.query(`UPDATE exercicios SET nome=$1,
        series=$2, repeticoes = $3 WHERE codigo=$4 
        RETURNING codigo, nome, series, repeticoes`, 
            [nome, series, repeticoes, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const exercicio = results.rows[0];
        return new Exercicio(exercicio.codigo, exercicio.nome, exercicio.series, exercicio.repeticoes);
    } catch (err){
        throw "Erro ao alterar o Exercício: " + err;
    }
}

const deleteExercicioDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM exercicios 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Exercicio de código ${codigo} removido com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover o exercício: " + err;
    }
}

const getExercicioPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM exercicios 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const exercicio = results.rows[0];
            return new Exercicio(exercicio.codigo, exercicio.nome,
                 exercicio.series, exercicio.repeticoes);
        }
    } catch (err){
        throw "Erro ao recuperar o exercício: " + err;
    }
}

module.exports = { getExerciciosDB, addExercicioDB, 
    updateExercicioDB, deleteExercicioDB, getExercicioPorCodigoDB }