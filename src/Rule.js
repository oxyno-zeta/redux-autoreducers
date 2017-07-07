/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 26/06/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORT        ******** */
/* ************************************* */
import { snakeToLowerCamel } from './utils';
import {
    getDefaultTypeSuffixes,
    getGenerateInitialState,
    getGenerateReducer,
    getActionTransformer,
} from './defaults';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       CLASSES       ******** */
/* ************************************* */
class Rule {
    constructor(type) {
        if (typeof type !== 'string') {
            throw new Error('Rule constructor take a string as parameter');
        }
        this.type = type;
        this.lowerCamelCaseType = snakeToLowerCamel(type.toLowerCase());
        this.generateReducer = getGenerateReducer();
        this.generateInitialState = getGenerateInitialState();
        this.actionTransformer = getActionTransformer();
        this.typeSuffixes = getDefaultTypeSuffixes();
    }

    overrideReducer(overrideGenerateReducer) {
        if (overrideGenerateReducer === null || overrideGenerateReducer === undefined) {
            throw new Error('Reducer cannot be null/undefined');
        }
        const typeOf = typeof overrideGenerateReducer;
        if (!((typeOf === 'function' || typeOf === 'object')
            && !Array.isArray(overrideGenerateReducer))) {
            throw new Error('Reducer must be a function or an object');
        }
        if (typeOf === 'object') {
            if (Object.keys(overrideGenerateReducer).length === 0) {
                throw new Error('Reducer object must have keys');
            }
        }

        this.generateReducer = (typeOf === 'object') ? () => overrideGenerateReducer : overrideGenerateReducer;
        return this;
    }

    overrideInitialState(overrideGenerateInitialState) {
        const typeOf = typeof overrideGenerateInitialState;
        if (overrideGenerateInitialState === null || (!((typeOf === 'function' || typeOf === 'object')
            && !Array.isArray(overrideGenerateInitialState)))) {
            throw new Error('Initial State must be an object or a function');
        }

        this.generateInitialState = (typeOf === 'function') ?
                                    overrideGenerateInitialState : () => overrideGenerateInitialState;
        return this;
    }

    overrideActionTransformer(actionTransformer) {
        if (typeof actionTransformer !== 'function') {
            throw new Error('Action Transformer must be a function');
        }
        this.actionTransformer = actionTransformer;
        return this;
    }

    generate() {
        const initialState = this.generateInitialState(this.lowerCamelCaseType);
        const reducerTemp = this.generateReducer(this.type, this.lowerCamelCaseType, this.typeSuffixes);
        const reducer = addActionTransformer(reducerTemp, this.actionTransformer);
        return { initialState, reducer };
    }
}

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default Rule;

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/**
 * Add action transformer.
 * @param reducerObject
 * @param actionTransformer
 * @returns {*}
 */
function addActionTransformer(reducerObject, actionTransformer) {
    return Object
        .keys(reducerObject)
        .reduce((accu, key) => {
            const old = reducerObject[key];
            if (typeof old === 'object') {
                accu[key] = addActionTransformer(old, actionTransformer);
            } else {
                accu[key] = (state, action) => old(state, actionTransformer(action));
            }
            return accu;
        }, {});
}

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */
