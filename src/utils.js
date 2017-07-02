/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 26/06/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       CLASSES       ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
// eslint-disable-next-line import/prefer-default-export
export { snakeToLowerCamel };

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Transform snake case to lower camel case.
 * @param s
 * @returns {XML|*|void|string}
 */
function snakeToLowerCamel(s) {
    return s.replace(/(_\w)/g, m => m[1].toUpperCase());
}
