/**
 * @openapi
 * components:
 *  schemas:
 *    createAdmin:
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
 *          default: someemail@gmail.com
 *        phone:
 *          type: string
 *          default: 3251239938
 *        password:
 *          type: string
 *          default: 1234567890
 *    createService:
 *      type: object
 *      required:
 *        - name
 *        - active
 *        - price
 *      properties:
 *        name:
 *          type: string
 *          default: barber
 *        active:
 *          type: boolean
 *          default: true
 *        price:
 *          type: int
 *          default: 2322
 *    makeOrderComplete:
 *      type: object
 *      required:
 *        - orderId
 *      properties:
 *        orderId:
 *          type: string
 *          default: 62cef883248a8bb14e138cbb
 */
