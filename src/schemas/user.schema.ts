/**
 * @openapi
 * components:
 *  schemas:
 *    createUser:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - phone
 *        - password
 *        - fullName
 *      properties:
 *        username:
 *          type: string
 *          default: jane_jon
 *        fullName:
 *          type: string
 *          default: ja_jon
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        phone:
 *          type: string
 *          default: 3251239938
 *        password:
 *          type: string
 *          default: stringPassword123
 *    editUser:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - location
 *        - phone
 *        - fullName
 *      properties:
 *        username:
 *          type: string
 *          default: jane_jon
 *        fullName:
 *          type: string
 *          default: ja_jon
 *        email:
 *          type: string
 *          default: someemail@gmail.com
 *        location:
 *          type: string
 *          default: NYC
 *        phone:
 *          type: string
 *          default: 3251239938
 */
