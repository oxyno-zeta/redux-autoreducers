/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 01/07/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

/* ************************************* */
/* ********        TESTS        ******** */
/* ************************************* */

describe('Generator', () => {
    let Generator;
    let Rule;

    before(() => {
        // eslint-disable-next-line global-require
        const index = require('../src/index');
        Generator = index.Generator;
        Rule = index.Rule;
    });

    describe('Generator will generate a simple reducer function', () => {
        it('should return initial state with "undefined" state and empty action', () => {
            const rule = new Rule('GET_ALL');
            const reducer = (new Generator([rule])).generate();
            const result = reducer(undefined, {});
            expect(result).to.deep.equal({
                isGetAllPending: false,
                getAllData: null,
                getAllError: null,
            });
        });

        it('should return initial state with initial state and GET_ALL_PENDING action', () => {
            const rule = new Rule('GET_ALL');
            const reducer = (new Generator([rule])).generate();
            const initialState = reducer(undefined, {});
            const result = reducer(initialState, { type: 'GET_ALL_PENDING' });
            expect(result).to.deep.equal({
                isGetAllPending: true,
                getAllData: null,
                getAllError: null,
            });
        });

        it('should return initial state with initial state and GET_ALL_FULFILLED action', () => {
            const rule = new Rule('GET_ALL');
            const reducer = (new Generator([rule])).generate();
            const initialState = reducer(undefined, {});
            const result = reducer(initialState, { type: 'GET_ALL_FULFILLED', data: 'data' });
            expect(result).to.deep.equal({
                isGetAllPending: false,
                getAllData: 'data',
                getAllError: null,
            });
        });

        it('should return initial state with initial state and GET_ALL_REJECTED action', () => {
            const rule = new Rule('GET_ALL');
            const reducer = (new Generator([rule])).generate();
            const initialState = reducer(undefined, {});
            const result = reducer(initialState, { type: 'GET_ALL_REJECTED', error: 'error' });
            expect(result).to.deep.equal({
                isGetAllPending: false,
                getAllData: null,
                getAllError: 'error',
            });
        });

        it('should return initial state with GET_ALL_PENDING state and GET_ALL_FULFILLED action', () => {
            const rule = new Rule('GET_ALL');
            const reducer = (new Generator([rule])).generate();
            const initialState = reducer(undefined, {});
            const state = reducer(initialState, { type: 'GET_ALL_PENDING', error: 'error' });
            expect(state).to.deep.equal({
                isGetAllPending: true,
                getAllData: null,
                getAllError: null,
            });
            const result = reducer(initialState, { type: 'GET_ALL_FULFILLED', data: 'data' });
            expect(result).to.deep.equal({
                isGetAllPending: false,
                getAllData: 'data',
                getAllError: null,
            });
        });

        it('should return initial state with GET_ALL_PENDING state and GET_ALL_REJECTED action', () => {
            const rule = new Rule('GET_ALL');
            const reducer = (new Generator([rule])).generate();
            const initialState = reducer(undefined, {});
            const state = reducer(initialState, { type: 'GET_ALL_PENDING', error: 'error' });
            expect(state).to.deep.equal({
                isGetAllPending: true,
                getAllData: null,
                getAllError: null,
            });
            const result = reducer(initialState, { type: 'GET_ALL_REJECTED', error: 'error' });
            expect(result).to.deep.equal({
                isGetAllPending: false,
                getAllData: null,
                getAllError: 'error',
            });
        });
    });

    describe('Generator will generate a simple reducer function for 2 rules', () => {
        it('should return initial state with "undefined" state and empty action', () => {
            const rule1 = new Rule('GET_ALL');
            const rule2 = new Rule('POST');
            const reducer = (new Generator([rule2, rule1])).generate();
            const result = reducer(undefined, {});
            expect(result).to.deep.equal({
                isGetAllPending: false,
                getAllData: null,
                getAllError: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
        });

        it('should return initial state with initial state and GET_ALL_PENDING action', () => {
            const rule1 = new Rule('GET_ALL');
            const rule2 = new Rule('POST');
            const reducer = (new Generator([rule2, rule1])).generate();
            const initialState = reducer(undefined, {});
            const result = reducer(initialState, { type: 'GET_ALL_PENDING' });
            expect(result).to.deep.equal({
                isGetAllPending: true,
                getAllData: null,
                getAllError: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
        });

        it('should return initial state with initial state and GET_ALL_FULFILLED action', () => {
            const rule1 = new Rule('GET_ALL');
            const rule2 = new Rule('POST');
            const reducer = (new Generator([rule2, rule1])).generate();
            const initialState = reducer(undefined, {});
            const result = reducer(initialState, { type: 'GET_ALL_FULFILLED', data: 'data' });
            expect(result).to.deep.equal({
                isGetAllPending: false,
                getAllData: 'data',
                getAllError: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
        });

        it('should return initial state with GET_ALL_PENDING state and GET_ALL_REJECTED action', () => {
            const rule1 = new Rule('GET_ALL');
            const rule2 = new Rule('POST');
            const reducer = (new Generator([rule2, rule1])).generate();
            const initialState = reducer(undefined, {});
            const state = reducer(initialState, { type: 'GET_ALL_PENDING' });
            expect(state).to.deep.equal({
                isGetAllPending: true,
                getAllData: null,
                getAllError: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result = reducer(initialState, { type: 'GET_ALL_REJECTED', error: 'error' });
            expect(result).to.deep.equal({
                isGetAllPending: false,
                getAllData: null,
                getAllError: 'error',
                isPostPending: false,
                postData: null,
                postError: null,
            });
        });
    });

    describe('Generator will generate a reducer function for 2 rules with some overrides', () => {
        it('should be ok with override initial state and reducer function', () => {
            const rule1 = new Rule('GET_ALL');
            rule1
                .overrideInitialState(() => ({ allPending: false, allData: null }))
                .overrideReducer(() => ({
                    GET_ALL: {
                        PENDING: state => ({
                            ...state,
                            allPending: true,
                        }),
                        DATA: (state, action) => ({
                            ...state,
                            allData: action.data,
                            allPending: false,
                        }),
                    },
                }));
            const rule2 = new Rule('POST');
            const reducer = (new Generator([rule2, rule1])).generate();
            const initialState = reducer(undefined, {});
            expect(initialState).to.deep.equal({
                allPending: false,
                allData: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result1 = reducer(initialState, { type: 'GET_ALL_PENDING' });
            expect(result1).to.deep.equal({
                allPending: true,
                allData: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result2 = reducer(result1, { type: 'POST_PENDING' });
            expect(result2).to.deep.equal({
                allPending: true,
                allData: null,
                isPostPending: true,
                postData: null,
                postError: null,
            });
            const result3 = reducer(result2, { type: 'GET_ALL_DATA', data: 'data' });
            expect(result3).to.deep.equal({
                allPending: false,
                allData: 'data',
                isPostPending: true,
                postData: null,
                postError: null,
            });
        });

        it('should be ok with override action transformer', () => {
            const rule1 = new Rule('GET_ALL');
            rule1
                .overrideActionTransformer((action) => {
                    if (action.payload) {
                        const { type, payload: { data } } = action;
                        return { type, data };
                    }

                    return action;
                });
            const rule2 = new Rule('POST');
            const reducer = (new Generator([rule2, rule1])).generate();
            const initialState = reducer(undefined, {});
            const state = reducer(initialState, { type: 'GET_ALL_PENDING' });
            expect(state).to.deep.equal({
                isGetAllPending: true,
                getAllData: null,
                getAllError: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const state2 = reducer(state, { type: 'GET_ALL_FULFILLED', payload: { data: 'data' } });
            expect(state2).to.deep.equal({
                isGetAllPending: false,
                getAllData: 'data',
                getAllError: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
        });

        it('should be ok with override initial state and reducer object for a simple event', () => {
            const rule1 = new Rule('POST');
            const rule2 = new Rule('OPEN');
            rule2
                .overrideInitialState({ isOpen: false })
                .overrideReducer({
                    OPEN: state => ({
                        ...state,
                        isOpen: true,
                    }),
                });
            const rule3 = new Rule('CLOSE');
            rule3
                .overrideInitialState({})
                .overrideReducer({
                    CLOSE: state => ({
                        ...state,
                        isOpen: false,
                    }),
                });
            const reducer = (new Generator([rule2, rule3, rule1])).generate();
            const initialState = reducer(undefined, {});
            expect(initialState).to.deep.equal({
                isOpen: false,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result1 = reducer(initialState, { type: 'OPEN' });
            expect(result1).to.deep.equal({
                isOpen: true,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result2 = reducer(result1, { type: 'CLOSE' });
            expect(result2).to.deep.equal({
                isOpen: false,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result3 = reducer(result2, { type: 'POST_FULFILLED', data: 'data' });
            expect(result3).to.deep.equal({
                isOpen: false,
                isPostPending: false,
                postData: 'data',
                postError: null,
            });
        });

        it('should be ok with override initial state and reducer function for a simple event', () => {
            const rule1 = new Rule('POST');
            const rule2 = new Rule('OPEN');
            rule2
                .overrideInitialState(() => ({ isOpen: false }))
                .overrideReducer(() => ({
                    OPEN: state => ({
                        ...state,
                        isOpen: true,
                    }),
                }));
            const rule3 = new Rule('CLOSE');
            rule3
                .overrideInitialState(() => ({}))
                .overrideReducer(() => ({
                    CLOSE: state => ({
                        ...state,
                        isOpen: false,
                    }),
                }));
            const reducer = (new Generator([rule2, rule3, rule1])).generate();
            const initialState = reducer(undefined, {});
            expect(initialState).to.deep.equal({
                isOpen: false,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result1 = reducer(initialState, { type: 'OPEN' });
            expect(result1).to.deep.equal({
                isOpen: true,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result2 = reducer(result1, { type: 'CLOSE' });
            expect(result2).to.deep.equal({
                isOpen: false,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const result3 = reducer(result2, { type: 'POST_FULFILLED', data: 'data' });
            expect(result3).to.deep.equal({
                isOpen: false,
                isPostPending: false,
                postData: 'data',
                postError: null,
            });
        });
    });

    describe('Generator will generate a reducer function for 2 rules with default overrides', () => {
        let oldValueReducer;
        let oldValueInitialState;
        let oldValueActionTransformer;
        let oldValueSuffixesTypes;
        let lib;
        beforeEach(() => {
            // eslint-disable-next-line global-require
            const index = require('../src/index');
            // eslint-disable-next-line global-require
            const defaults = require('../src/defaults');
            oldValueInitialState = defaults.getGenerateInitialState();
            oldValueReducer = defaults.getGenerateReducer();
            oldValueActionTransformer = defaults.getActionTransformer();
            oldValueSuffixesTypes = { ...defaults.defaultTypesSuffixes };
            lib = index;
        });

        afterEach(() => {
            lib.overrideGenerateInitialState(oldValueInitialState);
            lib.overrideGenerateReducer(oldValueReducer);
            lib.overrideActionTransformer(oldValueActionTransformer);
            lib.overrideDefaultTypesSuffixes(oldValueSuffixesTypes);
        });

        it('should be ok with override initial state and reducer function', () => {
            lib.overrideGenerateInitialState(lowerCamelCaseType => ({
                [`is${lowerCamelCaseType}Pending`]: false,
                [`${lowerCamelCaseType}Paging`]: null,
                [`${lowerCamelCaseType}Data`]: null,
                [`${lowerCamelCaseType}Error`]: null,
            }));
            lib.overrideGenerateReducer((type, lowerCamelCaseType, typesSuffixes) => ({
                [type]: {
                    [typesSuffixes.PENDING]: state => ({
                        ...state,
                        [`is${lowerCamelCaseType}Pending`]: true,
                        [`${lowerCamelCaseType}Data`]: null,
                        [`${lowerCamelCaseType}Paging`]: null,
                        [`${lowerCamelCaseType}Error`]: null,
                    }),
                    [typesSuffixes.FULFILLED]: (state, action) => ({
                        ...state,
                        [`is${lowerCamelCaseType}Pending`]: false,
                        [`${lowerCamelCaseType}Data`]: action.data,
                        [`${lowerCamelCaseType}Paging`]: action.paging,
                        [`${lowerCamelCaseType}Error`]: null,
                    }),
                    [typesSuffixes.REJECTED]: (state, action) => ({
                        ...state,
                        [`is${lowerCamelCaseType}Pending`]: false,
                        [`${lowerCamelCaseType}Data`]: null,
                        [`${lowerCamelCaseType}Paging`]: null,
                        [`${lowerCamelCaseType}Error`]: action.error,
                    }),
                },
            }));
            const rule1 = new Rule('GET_ALL');
            const rule2 = new Rule('POST');
            const reducer = (new Generator([rule2, rule1])).generate();
            const initialState = reducer(undefined, {});
            expect(initialState).to.deep.equal({
                isgetAllPending: false,
                getAllPaging: null,
                getAllData: null,
                getAllError: null,
                ispostPending: false,
                postData: null,
                postPaging: null,
                postError: null,
            });
            const result1 = reducer(initialState, { type: 'GET_ALL_PENDING' });
            expect(result1).to.deep.equal({
                isgetAllPending: true,
                getAllPaging: null,
                getAllData: null,
                getAllError: null,
                ispostPending: false,
                postData: null,
                postPaging: null,
                postError: null,
            });
            const result2 = reducer(result1, { type: 'POST_PENDING' });
            expect(result2).to.deep.equal({
                isgetAllPending: true,
                getAllPaging: null,
                getAllData: null,
                getAllError: null,
                ispostPending: true,
                postData: null,
                postPaging: null,
                postError: null,
            });
            const result3 = reducer(result2, { type: 'GET_ALL_FULFILLED', data: 'data', paging: 'paging' });
            expect(result3).to.deep.equal({
                isgetAllPending: false,
                getAllPaging: 'paging',
                getAllData: 'data',
                getAllError: null,
                ispostPending: true,
                postData: null,
                postPaging: null,
                postError: null,
            });
        });

        it('should be ok with override action transformer', () => {
            lib.overrideActionTransformer((action) => {
                if (action.payload) {
                    const { type, payload: { data } } = action;
                    return { type, data };
                }

                return action;
            });
            const rule1 = new Rule('GET_ALL');
            const rule2 = new Rule('POST');
            const reducer = (new Generator([rule2, rule1])).generate();
            const initialState = reducer(undefined, {});
            const state = reducer(initialState, { type: 'GET_ALL_PENDING' });
            expect(state).to.deep.equal({
                isGetAllPending: true,
                getAllData: null,
                getAllError: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
            const state2 = reducer(state, { type: 'GET_ALL_FULFILLED', payload: { data: 'data' } });
            expect(state2).to.deep.equal({
                isGetAllPending: false,
                getAllData: 'data',
                getAllError: null,
                isPostPending: false,
                postData: null,
                postError: null,
            });
        });

        it('should be ok with override initial state and reducer function for a simple event', () => {
            lib.overrideGenerateInitialState(lowerCamelCaseType => ({
                [`is${lowerCamelCaseType}Pending`]: false,
                [`${lowerCamelCaseType}Paging`]: null,
                [`${lowerCamelCaseType}Data`]: null,
                [`${lowerCamelCaseType}Error`]: null,
            }));
            lib.overrideGenerateReducer((type, lowerCamelCaseType, typesSuffixes) => ({
                [type]: {
                    [typesSuffixes.PENDING]: state => ({
                        ...state,
                        [`is${lowerCamelCaseType}Pending`]: true,
                        [`${lowerCamelCaseType}Data`]: null,
                        [`${lowerCamelCaseType}Paging`]: null,
                        [`${lowerCamelCaseType}Error`]: null,
                    }),
                    [typesSuffixes.FULFILLED]: (state, action) => ({
                        ...state,
                        [`is${lowerCamelCaseType}Pending`]: false,
                        [`${lowerCamelCaseType}Data`]: action.data,
                        [`${lowerCamelCaseType}Paging`]: action.paging,
                        [`${lowerCamelCaseType}Error`]: null,
                    }),
                    [typesSuffixes.REJECTED]: (state, action) => ({
                        ...state,
                        [`is${lowerCamelCaseType}Pending`]: false,
                        [`${lowerCamelCaseType}Data`]: null,
                        [`${lowerCamelCaseType}Paging`]: null,
                        [`${lowerCamelCaseType}Error`]: action.error,
                    }),
                },
            }));
            const rule1 = new Rule('POST');
            const rule2 = new Rule('OPEN');
            rule2
                .overrideInitialState({ isOpen: false })
                .overrideReducer({
                    OPEN: state => ({
                        ...state,
                        isOpen: true,
                    }),
                });
            const rule3 = new Rule('CLOSE');
            rule3
                .overrideInitialState({})
                .overrideReducer({
                    CLOSE: state => ({
                        ...state,
                        isOpen: false,
                    }),
                });
            const reducer = (new Generator([rule2, rule3, rule1])).generate();
            const initialState = reducer(undefined, {});
            expect(initialState).to.deep.equal({
                isOpen: false,
                ispostPending: false,
                postData: null,
                postPaging: null,
                postError: null,
            });
            const result1 = reducer(initialState, { type: 'OPEN' });
            expect(result1).to.deep.equal({
                isOpen: true,
                ispostPending: false,
                postData: null,
                postPaging: null,
                postError: null,
            });
            const result2 = reducer(result1, { type: 'CLOSE' });
            expect(result2).to.deep.equal({
                isOpen: false,
                ispostPending: false,
                postData: null,
                postPaging: null,
                postError: null,
            });
            const result3 = reducer(result2, { type: 'POST_FULFILLED', data: 'data' });
            expect(result3).to.deep.equal({
                isOpen: false,
                ispostPending: false,
                postData: 'data',
                postPaging: undefined,
                postError: null,
            });
        });
    });
});
