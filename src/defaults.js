/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 26/06/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import capitalize from 'capitalize';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
const defaultTypesSuffixes = {
    PENDING: 'PENDING',
    REJECTED: 'REJECTED',
    FULFILLED: 'FULFILLED',
};
const allowedKeys = Object.keys(defaultTypesSuffixes);

const defaultGenerator = {
    defaultActionTransformer,
    defaultGenerateReducer,
    defaultGenerateInitialState,
};

/* ************************************* */
/* ********       CLASSES       ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export { defaultTypesSuffixes };
export { getGenerateReducer };
export { getGenerateInitialState };
export { getActionTransformer };
export { overrideDefaultTypesSuffixes };
export { overrideGenerateInitialState };
export { overrideGenerateReducer };
export { overrideActionTransformer };

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/**
 * Default action transformer.
 * @param action
 * @returns {*}
 */
function defaultActionTransformer(action) {
    return action;
}

/**
 * Generate initial state.
 * @param lowerCamelCaseType
 * @returns {{}}
 */
function defaultGenerateInitialState(lowerCamelCaseType) {
    return {
        [`is${capitalize(lowerCamelCaseType)}Pending`]: false,
        [`${lowerCamelCaseType}Data`]: null,
        [`${lowerCamelCaseType}Error`]: null,
    };
}

/**
 * Generate Reducer.
 * @param type
 * @param lowerCamelCaseType
 * @param typesSuffixes
 * @returns {{}}
 */
function defaultGenerateReducer(type, lowerCamelCaseType, typesSuffixes) {
    return {
        [type]: {
            [typesSuffixes.PENDING]: state => ({
                ...state,
                [`is${capitalize(lowerCamelCaseType)}Pending`]: true,
                [`${lowerCamelCaseType}Data`]: null,
                [`${lowerCamelCaseType}Error`]: null,
            }),
            [typesSuffixes.FULFILLED]: (state, action) => ({
                ...state,
                [`is${capitalize(lowerCamelCaseType)}Pending`]: false,
                [`${lowerCamelCaseType}Data`]: action.data,
                [`${lowerCamelCaseType}Error`]: null,
            }),
            [typesSuffixes.REJECTED]: (state, action) => ({
                ...state,
                [`is${capitalize(lowerCamelCaseType)}Pending`]: false,
                [`${lowerCamelCaseType}Data`]: null,
                [`${lowerCamelCaseType}Error`]: action.error,
            }),
        },
    };
}

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Get default action transformer.
 * @returns {defaultActionTransformer}
 */
function getActionTransformer() {
    return defaultGenerator.defaultActionTransformer;
}

/**
 * Override action transformer.
 * @param actionTransformer
 */
function overrideActionTransformer(actionTransformer) {
    if (typeof actionTransformer !== 'function') {
        throw new Error('Action transformer must be a function');
    }
    defaultGenerator.defaultActionTransformer = actionTransformer;
}

/**
 * Get generate initial state.
 * @returns {function}
 */
function getGenerateInitialState() {
    return defaultGenerator.defaultGenerateInitialState;
}

/**
 * Get generate reducer.
 * @returns {function}
 */
function getGenerateReducer() {
    return defaultGenerator.defaultGenerateReducer;
}

/**
 * Override Generate Reducer.
 * @param newGenerateReducer
 */
function overrideGenerateReducer(newGenerateReducer) {
    if (typeof newGenerateReducer !== 'function') {
        throw new Error('Default reducer generator must be a function');
    }
    defaultGenerator.defaultGenerateReducer = newGenerateReducer;
}

/**
 * Override Generate Initial State.
 * @param newGenerateInitialState
 */
function overrideGenerateInitialState(newGenerateInitialState) {
    if (typeof newGenerateInitialState !== 'function') {
        throw new Error('Default initial state generator must be a function');
    }
    defaultGenerator.defaultGenerateInitialState = newGenerateInitialState;
}

/**
 * Override default types suffixes.
 * @param newDefaultTypesSuffixes
 */
function overrideDefaultTypesSuffixes(newDefaultTypesSuffixes) {
    if (newDefaultTypesSuffixes === null
        || typeof newDefaultTypesSuffixes !== 'object'
        || Array.isArray(newDefaultTypesSuffixes)) {
        throw new Error('Default types suffixes must be an object');
    }
    const keys = Object.keys(newDefaultTypesSuffixes);
    if (keys.length === 0) {
        throw new Error(`Default types suffixes object must have keys in [${allowedKeys.toString()}]`);
    }
    keys.forEach((key) => {
        if (allowedKeys.indexOf(key) === -1) {
            throw new Error(`"${key}" must be in [${allowedKeys.toString()}]`);
        }
    });

    const { PENDING, REJECTED, FULFILLED } = newDefaultTypesSuffixes;
    defaultTypesSuffixes.PENDING = PENDING;
    defaultTypesSuffixes.REJECTED = REJECTED;
    defaultTypesSuffixes.FULFILLED = FULFILLED;
}
