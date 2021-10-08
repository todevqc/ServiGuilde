import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//  verifier authorisation de l'utilisateur avant de le laisser passer
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchDemandes = () => API.get('/demandes');
export const createDemande = (newDemande) => API.post('/demandes', newDemande);
export const updateDemande = (id, updatedDemande) => API.patch(`/demandes/${id}`, updatedDemande);
export const deleteDemande = (id) => API.delete(`/demandes/${id}`);
export const likeDemande = (id) => API.patch(`/demandes/${id}/likeDemande`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);