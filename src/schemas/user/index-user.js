import {create} from './create.sch.js'
import {get_all} from './get-all.sch.js'
import {get_one} from './get-one.sch.js'
import {update}  from './update.sch.js'
import {freeze} from './freeze.sch.js'

const schema_user = {
  /**
   * User creation schema.
   * @description Schema for creating a new user.
   */
  create,
  /**
   * Get all users schema.
   * @description Schema for getting all users.
   */
  get_all,
  /**
   * Get user by ID schema.
   * @description Schema for getting a user by ID.
   */
  get_one,
  /**
   * Update user by ID schema.
   * @description Schema for updating a user by ID.
   */
  update,
  /**
   * Freeze user by ID schema.
   * @description Schema for freezing a user by ID.
   */
  freeze
}

export default schema_user;