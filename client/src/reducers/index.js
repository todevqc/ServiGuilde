import { combineReducers } from 'redux';

import demandes from './demandes';
import auth from './auth';

export default combineReducers({ demandes, auth });