/**
 * @openapi
 * components:
 *  schemas:
 *    createProfessional:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - serviceName
 *        - location
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
 *          default: someemail@gmail.com
 *        serviceName:
 *          type: string
 *          default: barber
 *        location:
 *          type: string
 *          default: NYC
 *        phone:
 *          type: string
 *          default: 3251239938
 *        password:
 *          type: string
 *          default: 1234567890
 *    editProfessional:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - serviceName
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
 *        serviceName:
 *          type: string
 *          default: barber
 *        location:
 *          type: string
 *          default: NYC
 *        phone:
 *          type: string
 *          default: 3251239938
 */
