import { Router } from 'express';
import {
  AuthController
} from './../controllers/';
export default () => {
	let api = Router();
	api.use('/', AuthController);
	return api;
}