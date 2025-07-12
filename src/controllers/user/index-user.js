import {create} from './create.ctrl.js'
import {get_all} from './get-all.ctrl.js'
import {get_one} from './get-one.ctrl.js'
import {update}  from './update.ctrl.js'
import { freeze } from './freeze.ctrl.js'

const ctrl_user = {
  /**
   * User controller for handling user-related operations.
   * @description This controller provides methods to create, retrieve, update, and freeze users.
   */
  create,
  /**
   * Get all users controller.
   * @description Retrieves a list of all users with optional filtering and pagination.
   */
  get_all,
  /**
   * Get user by ID controller.
   * @description Retrieves a user by their unique ID.
   */
  get_one,
  /**
   * Update user by ID controller.
   * @description Updates a user by their unique ID.
   */
  update,
  /**
   * Freeze user by ID controller.
   * @description Freezes a user by their unique ID.
   */
  freeze,
};

export default ctrl_user;