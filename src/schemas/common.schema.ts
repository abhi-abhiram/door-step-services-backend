/**
 * @openapi
 * components:
 *  schemas:
 *    addAddress:
 *      type: object
 *      required:
 *        - address
 *        - city
 *        - state
 *        - country
 *        - pinCode
 *      properties:
 *        address:
 *          type: string
 *          default: "6 Woodside Lane West Babylon, NY 11704"
 *        city:
 *          type: string
 *          default: NYC
 *        state:
 *          type: string
 *          default: NY
 *        country:
 *          type: string
 *          default: USA
 *        pinCode:
 *          type: number
 *          default: 10012
 *    login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: "jane.doe@example.com"
 *        password:
 *          type: string
 *          default: "stringPassword123"
 *    logout:
 *    createCheckout:
 *      type: object
 *      required:
 *        - fullName
 *        - email
 *        - phoneNumber
 *        - serviceDate
 *        - address
 *        - city
 *        - note
 *        - serviceName
 *        - serviceDesc
 *      properties:
 *        fullName:
 *          type: string
 *          default: jane.doe
 *        email:
 *          type: string
 *          default: 406223@gmail.com
 *        serviceName:
 *          type: string
 *          default: barber
 *        serviceDate:
 *           type: string
 *           default: 2022-08-12
 *        address:
 *           type: string
 *           default: faffasdf
 *        city:
 *           type: string
 *           default: NYC
 *        note:
 *           type: string
 *           default: dklfjasd;lkfjkdslj
 *        serviceDesc:
 *           type: string
 *           default: dklfjasd;lkfjkdslj
 *        phoneNumber:
 *           type: string
 *           default: 43412314
 */
