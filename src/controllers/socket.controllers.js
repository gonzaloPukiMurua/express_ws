import { poolPromise } from "../database/db.js";

export const raffleController = async (index) => {
    const pool = await poolPromise;
    const resultados = await pool.query(`SELECT AuxGrafBolillaNumero, AuxGrafBolillaPosicion FROM [dbo].[AuxGrafBolillas] where AuxGrafBolillaPosicion = ${index}`);
    console.log(resultados.recordset[0]);
    const {AuxGrafBolillaNumero : orden, AuxGrafBolillaPosicion : bolilla} = resultados.recordset[0];
    return {orden, bolilla};
};

export const winnersController = async(index) => {
    const pool = await poolPromise;
    const resultados = await pool.query(`SELECT AuxGrafGanadorBolillaNumero, AuxGrafGanadorGrupoNombre,  FROM [dbo].[AuxGrafGanadores] where AuxGrafBolillaPosicion = ${index}`);
    console.log(resultados.recordset[0]);
    const {AuxGrafBolillaNumero : orden, AuxGrafBolillaPosicion : bolilla} = resultados.recordset[0];
    return {orden, bolilla};
};

export const licitationController = async(group) => {
    const pool = await poolPromise;
    const resultados = await pool.query(`SELECT AuxGrafLicBolillaNumero, AuxGrafLicOfertaLibre, AuxGrafLicBolillaPosicion, AuxGrafLicTipoAdj FROM [dbo].[AuxGrafLicitaciones] where AuxGrafLicGrupoCodigo = ${group}`);
    console.log(resultados.recordset);    
    return resultados.recordset;
}

export const resumeController = () => {

};