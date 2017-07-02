/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 26/06/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import typeToReducer from 'type-to-reducer';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       CLASSES       ******** */
/* ************************************* */
class Generator {
    constructor(rules) {
        this.rules = rules;
    }

    generate() {
        const reduceAccu = {
            initialState: {},
            reducers: {},
        };

        const result = this.rules
                           .map(it => it.generate())
                           .reduce(({ initialState, reducers }, it) => ({
                               initialState: {
                                   ...initialState,
                                   ...it.initialState,
                               },
                               reducers: {
                                   ...reducers,
                                   ...it.reducer,
                               },
                           }), reduceAccu);

        return typeToReducer(result.reducers, result.initialState);
    }
}

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default Generator;

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */
