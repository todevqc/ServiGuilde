import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes'; //importation des variables d'actions pour eviter les erreurs
import * as api from '../api';

//  Action Creators
//  les Actiopn creators sont des fonction qui retournent des actions
//  des actions qui ont un type, et un contenu
export const getDemandes = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDemandes();
        dispatch({ type: FETCH_ALL, payload: data });

    } catch (error) {
        console.log(error);
    }

}

export const createDemande = (demande) => async (dispatch) => {
    try {
        const { data } = await api.createDemande(demande);

        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error);
    }

}

export const updateDemande = (id, demande) => async (dispatch) => {
    try {
        const { data } = await api.updateDemande(id, demande);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }

}

export const deleteDemande = (id) => async (dispatch) => {
    try {
        await api.deleteDemande(id);

        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error);
    }

}


export const likeDemande = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeDemande(id);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }

}