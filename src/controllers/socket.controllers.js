import { poolPromise } from "../database/db.js";

export const raffleController = async (index) => {
    const pool = await poolPromise;
    const resultados = await pool.query(`SELECT AuxGrafBolillaNumero, AuxGrafBolillaPosicion FROM [dbo].[AuxGrafBolillas] where AuxGrafBolillaPosicion = ${index}`);
    console.log(resultados.recordset[0]);
    const {AuxGrafBolillaNumero : orden, AuxGrafBolillaPosicion : bolilla} = resultados.recordset[0];
    return {orden, bolilla};
};

export const winnersController = () => {

};

export const resumeController = () => {

};