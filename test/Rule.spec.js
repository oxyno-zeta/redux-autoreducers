/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 26/06/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

/* ************************************* */
/* ********        TESTS        ******** */
/* ************************************* */

describe('Rule', () => {
    let Rule;

    before(() => {
        // eslint-disable-next-line global-require
        const index = require('../src/index');
        Rule = index.Rule;
    });

    it('should throw an error when creating a instance with a number', () => {
        const func = () => new Rule(1);
        expect(func).to.throw(Error, 'Rule constructor take a string as parameter');
    });

    it('should throw an error when creating a instance with an object', () => {
        const func = () => new Rule({});
        expect(func).to.throw(Error, 'Rule constructor take a string as parameter');
    });

    it('should throw an error when creating a instance with an array', () => {
        const func = () => new Rule([]);
        expect(func).to.throw(Error, 'Rule constructor take a string as parameter');
    });

    it('should throw an error when creating a instance with a function', () => {
        const func = () => new Rule(() => {});
        expect(func).to.throw(Error, '');
    });

    it('should generate a simple generator for type "TEST"', () => {
        const rule = new Rule('TEST');
        const { initialState, reducer } = rule.generate();
        expect(initialState).to.deep.equal({
            isTestPending: false,
            testData: null,
            testError: null,
        });
        expect(reducer).to.have.all.keys('TEST');
        const result = reducer.TEST;
        expect(result).to.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
    });

    it('should generate a simple generator for type "test"', () => {
        const rule = new Rule('test');
        const { initialState, reducer } = rule.generate();
        expect(initialState).to.deep.equal({
            isTestPending: false,
            testData: null,
            testError: null,
        });
        expect(reducer).to.have.all.keys('test');
        const result = reducer.test;
        expect(result).to.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
    });

    it('should generate a simple generator for type "GET_ALL"', () => {
        const rule = new Rule('GET_ALL');
        const { initialState, reducer } = rule.generate();
        expect(initialState).to.deep.equal({
            isGetAllPending: false,
            getAllData: null,
            getAllError: null,
        });
        expect(reducer).to.have.all.keys('GET_ALL');
        const result = reducer.GET_ALL;
        expect(result).to.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
    });

    it('should fail a override reducer with "null"', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideReducer(null);
        };
        expect(func).to.throw(Error, 'Reducer cannot be null/undefined');
    });

    it('should fail a override reducer with "undefined"', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideReducer(undefined);
        };
        expect(func).to.throw(Error, 'Reducer cannot be null/undefined');
    });

    it('should fail a override reducer with number', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideReducer(1);
        };
        expect(func).to.throw(Error, 'Reducer must be a function or an object');
    });

    it('should fail a override reducer with string', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideReducer('1');
        };
        expect(func).to.throw(Error, 'Reducer must be a function or an object');
    });

    it('should fail a override reducer with array', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideReducer([]);
        };
        expect(func).to.throw(Error, 'Reducer must be a function or an object');
    });

    it('should fail to override reducer with an empty object', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideReducer({});
        };
        expect(func).to.throw(Error, 'Reducer object must have keys');
    });

    it('should be ok to override reducer with a function', () => {
        const rule = new Rule('GET_ALL');
        const reducerGenerator = sinon.spy(() => ({}));
        rule.overrideReducer(reducerGenerator);
        const { reducer, initialState } = rule.generate();
        expect(reducer).to.deep.equal({});
        expect(initialState).to.deep.equal({
            isGetAllPending: false,
            getAllData: null,
            getAllError: null,
        });
        expect(reducerGenerator).to.have.been.calledWith('GET_ALL', 'getAll', {
            PENDING: 'PENDING',
            REJECTED: 'REJECTED',
            FULFILLED: 'FULFILLED',
        });
    });

    it('should be ok to override reducer with an object', () => {
        const rule = new Rule('GET_ALL');
        rule.overrideReducer({
            GET_ALL: {
                PENDING: () => ({}),
                REJECTED: () => ({}),
                FULFILLED: () => ({}),
            },
        });
        const { reducer, initialState } = rule.generate();
        expect(initialState).to.deep.equal({
            isGetAllPending: false,
            getAllData: null,
            getAllError: null,
        });
        expect(reducer).to.have.all.keys('GET_ALL');
        const result = reducer.GET_ALL;
        expect(result).to.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
    });

    it('should fail to override initial state with a number', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideInitialState(1);
        };
        expect(func).to.throw(Error, 'Initial State must be an object or a function');
    });

    it('should fail to override initial state with null', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideInitialState(null);
        };
        expect(func).to.throw(Error, 'Initial State must be an object or a function');
    });

    it('should fail to override initial state with undefined', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideInitialState(undefined);
        };
        expect(func).to.throw(Error, 'Initial State must be an object or a function');
    });

    it('should fail to override initial state with a string', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideInitialState('1');
        };
        expect(func).to.throw(Error, 'Initial State must be an object or a function');
    });

    it('should fail to override initial state with an array', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideInitialState([]);
        };
        expect(func).to.throw(Error, 'Initial State must be an object or a function');
    });

    it('should be ok to override initial state with a function', () => {
        const rule = new Rule('GET_ALL');
        const initialStateGenerator = sinon.spy(() => ({}));
        rule.overrideInitialState(initialStateGenerator);
        const { reducer, initialState } = rule.generate();
        expect(initialState).to.deep.equal({});
        expect(reducer).to.have.all.keys('GET_ALL');
        const result = reducer.GET_ALL;
        expect(result).to.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
        expect(initialStateGenerator).to.have.been.calledWith('getAll');
    });

    it('should be ok to override initial state with an object', () => {
        const rule = new Rule('GET_ALL');
        rule.overrideInitialState({});
        const { reducer, initialState } = rule.generate();
        expect(initialState).to.deep.equal({});
        expect(reducer).to.have.all.keys('GET_ALL');
        const result = reducer.GET_ALL;
        expect(result).to.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
    });

    it('should fail to add an action transformer with a number', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideActionTransformer(1);
        };
        expect(func).to.throw(Error, 'Action Transformer must be a function');
    });

    it('should fail to add an action transformer with a string', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideActionTransformer('1');
        };
        expect(func).to.throw(Error, 'Action Transformer must be a function');
    });

    it('should fail to add an action transformer with an array', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideActionTransformer([]);
        };
        expect(func).to.throw(Error, 'Action Transformer must be a function');
    });

    it('should fail to add an action transformer with a null', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideActionTransformer(null);
        };
        expect(func).to.throw(Error, 'Action Transformer must be a function');
    });

    it('should fail to add an action transformer with a undefined', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideActionTransformer(undefined);
        };
        expect(func).to.throw(Error, 'Action Transformer must be a function');
    });

    it('should fail to add an action transformer with an object', () => {
        const func = () => {
            const rule = new Rule('GET_ALL');
            rule.overrideActionTransformer({});
        };
        expect(func).to.throw(Error, 'Action Transformer must be a function');
    });

    it('should be ok to add an action transformer with a function', () => {
        const rule = new Rule('GET_ALL');
        rule.overrideActionTransformer(action => action);
        const { reducer, initialState } = rule.generate();
        expect(initialState).to.deep.equal({
            isGetAllPending: false,
            getAllData: null,
            getAllError: null,
        });
        expect(reducer).to.have.all.keys('GET_ALL');
        const result = reducer.GET_ALL;
        expect(result).to.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
    });
});

describe('Rule : Override default types suffixes', () => {
    let Rule;
    let oldValue;

    before(() => {
        // eslint-disable-next-line global-require
        const index = require('../src/index');
        // eslint-disable-next-line global-require
        const defaults = require('../src/defaults');
        Rule = index.Rule;
        oldValue = { ...defaults.defaultTypesSuffixes };
        index.overrideDefaultTypesSuffixes({
            PENDING: 'LOADING',
            REJECTED: 'ERROR',
            FULFILLED: 'DONE',
        });
    });

    after(() => {
        // eslint-disable-next-line global-require
        const index = require('../src/index');
        index.overrideDefaultTypesSuffixes(oldValue);
    });

    it('should be ok to change default types suffixes', () => {
        const rule = new Rule('GET_ALL');
        const { reducer, initialState } = rule.generate();
        expect(initialState).to.deep.equal({
            isGetAllPending: false,
            getAllData: null,
            getAllError: null,
        });
        expect(reducer).to.have.all.keys('GET_ALL');
        const result = reducer.GET_ALL;
        expect(result).to.not.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        expect(result).to.have.all.keys('LOADING', 'ERROR', 'DONE');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
    });
});

describe('Rule : Override default reducer generator', () => {
    let Rule;
    let generator;
    let oldValue;

    before(() => {
        // eslint-disable-next-line global-require
        const index = require('../src/index');
        // eslint-disable-next-line global-require
        const defaults = require('../src/defaults');
        Rule = index.Rule;
        oldValue = defaults.getGenerateReducer();
        generator = sinon.spy(() => ({}));
        index.overrideGenerateReducer(generator);
    });

    after(() => {
        // eslint-disable-next-line global-require
        const index = require('../src/index');
        index.overrideGenerateReducer(oldValue);
    });

    it('should be ok to change default reducer generator', () => {
        const rule = new Rule('GET_ALL');
        const { reducer, initialState } = rule.generate();
        expect(initialState).to.deep.equal({
            isGetAllPending: false,
            getAllData: null,
            getAllError: null,
        });
        expect(reducer).to.not.have.all.keys('GET_ALL');
        expect(generator).to.have.been.calledWith('GET_ALL', 'getAll', {
            PENDING: 'PENDING',
            REJECTED: 'REJECTED',
            FULFILLED: 'FULFILLED',
        });
    });
});

describe('Rule : Override default initial state generator', () => {
    let Rule;
    let generator;
    let oldValue;

    before(() => {
        // eslint-disable-next-line global-require
        const index = require('../src/index');
        // eslint-disable-next-line global-require
        const defaults = require('../src/defaults');
        Rule = index.Rule;
        oldValue = defaults.getGenerateInitialState();
        generator = sinon.spy(() => ({ initial: true }));
        index.overrideGenerateInitialState(generator);
    });

    after(() => {
        // eslint-disable-next-line global-require
        const index = require('../src/index');
        index.overrideGenerateInitialState(oldValue);
    });

    it('should be ok to change default initial state generator', () => {
        const rule = new Rule('GET_ALL');
        const { reducer, initialState } = rule.generate();
        expect(initialState).to.deep.equal({ initial: true });
        expect(reducer).to.have.all.keys('GET_ALL');
        const result = reducer.GET_ALL;
        expect(result).to.have.all.keys('PENDING', 'FULFILLED', 'REJECTED');
        Object.keys(result).forEach((key) => {
            expect(typeof result[key]).to.equal('function');
        });
        expect(generator).to.have.been.calledWith('getAll');
    });
});
