import { poolPromise } from "../database/db";

export const raffleController = async (index) => {
    const pool = await poolPromise;
    const resultados = await pool.query(`SELECT AuxGrafBolillaNumero, AuxGrafBolillaPosicion FROM [dbo].[AuxGrafBolillas] where AuxGrafBolillaNumero = ${index}`);
    const {AuxGrafBolillaNumero : orden, AuxGrafBolillaPosicion : bolilla} = resultados.recordset[0];
    return {orden, bolilla};
};

export const winnersController = () => {

};

export const resumeController = () => {

};