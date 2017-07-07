/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 02/07/17
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

describe('defaults', () => {
    let lib;
    let defaults;
    before(() => {
        // eslint-disable-next-line global-require
        lib = require('../src/index');
        // eslint-disable-next-line global-require
        defaults = require('../src/defaults');
    });

    after(() => {
        lib = null;
    });

    describe('overrideDefaultTypeSuffixes', () => {
        it('should fail when override default types suffixes with "undefined"', () => {
            const func = () => {
                lib.overrideDefaultTypeSuffixes(undefined);
            };
            expect(func).to.throw(Error, 'Default types suffixes must be an object');
        });

        it('should fail when override default types suffixes with "null"', () => {
            const func = () => {
                lib.overrideDefaultTypeSuffixes(null);
            };
            expect(func).to.throw(Error, 'Default types suffixes must be an object');
        });

        it('should fail when override default types suffixes with a number', () => {
            const func = () => {
                lib.overrideDefaultTypeSuffixes(1);
            };
            expect(func).to.throw(Error, 'Default types suffixes must be an object');
        });

        it('should fail when override default types suffixes with a string', () => {
            const func = () => {
                lib.overrideDefaultTypeSuffixes('1');
            };
            expect(func).to.throw(Error, 'Default types suffixes must be an object');
        });

        it('should fail when override default types suffixes with a function', () => {
            const func = () => {
                lib.overrideDefaultTypeSuffixes(() => {});
            };
            expect(func).to.throw(Error, 'Default types suffixes must be an object');
        });

        it('should fail when override default types suffixes with an array', () => {
            const func = () => {
                lib.overrideDefaultTypeSuffixes([]);
            };
            expect(func).to.throw(Error, 'Default types suffixes must be an object');
        });

        it('should fail when override default types suffixes with an empty object', () => {
            const func = () => {
                lib.overrideDefaultTypeSuffixes({});
            };
            expect(func).to.throw(Error, 'Default types suffixes object must have keys');
        });

        it('should be ok when override default types suffixes with other keys', () => {
            const data = { testKey: 'value1' };
            lib.overrideDefaultTypeSuffixes(data);
            const result = defaults.getDefaultTypeSuffixes();
            expect(result).to.deep.equal(data);
        });
    });

    describe('overrideGenerateInitialState', () => {
        it('should fail when override default types suffixes with "undefined"', () => {
            const func = () => {
                lib.overrideGenerateInitialState(undefined);
            };
            expect(func).to.throw(Error, 'Default initial state generator must be a function');
        });

        it('should fail when override default types suffixes with "null"', () => {
            const func = () => {
                lib.overrideGenerateInitialState(null);
            };
            expect(func).to.throw(Error, 'Default initial state generator must be a function');
        });

        it('should fail when override default types suffixes with a number', () => {
            const func = () => {
                lib.overrideGenerateInitialState(1);
            };
            expect(func).to.throw(Error, 'Default initial state generator must be a function');
        });

        it('should fail when override default types suffixes with a string', () => {
            const func = () => {
                lib.overrideGenerateInitialState('1');
            };
            expect(func).to.throw(Error, 'Default initial state generator must be a function');
        });

        it('should fail when override default types suffixes with an array', () => {
            const func = () => {
                lib.overrideGenerateInitialState([]);
            };
            expect(func).to.throw(Error, 'Default initial state generator must be a function');
        });

        it('should fail when override default types suffixes with an object', () => {
            const func = () => {
                lib.overrideGenerateInitialState({ testKey: 'value1' });
            };
            expect(func).to.throw(Error, 'Default initial state generator must be a function');
        });
    });

    describe('overrideGenerateReducer', () => {
        it('should fail when override default types suffixes with "undefined"', () => {
            const func = () => {
                lib.overrideGenerateReducer(undefined);
            };
            expect(func).to.throw(Error, 'Default reducer generator must be a function');
        });

        it('should fail when override default types suffixes with "null"', () => {
            const func = () => {
                lib.overrideGenerateReducer(null);
            };
            expect(func).to.throw(Error, 'Default reducer generator must be a function');
        });

        it('should fail when override default types suffixes with a number', () => {
            const func = () => {
                lib.overrideGenerateReducer(1);
            };
            expect(func).to.throw(Error, 'Default reducer generator must be a function');
        });

        it('should fail when override default types suffixes with a string', () => {
            const func = () => {
                lib.overrideGenerateReducer('1');
            };
            expect(func).to.throw(Error, 'Default reducer generator must be a function');
        });

        it('should fail when override default types suffixes with an array', () => {
            const func = () => {
                lib.overrideGenerateReducer([]);
            };
            expect(func).to.throw(Error, 'Default reducer generator must be a function');
        });

        it('should fail when override default types suffixes with an object', () => {
            const func = () => {
                lib.overrideGenerateReducer({ testKey: 'value1' });
            };
            expect(func).to.throw(Error, 'Default reducer generator must be a function');
        });
    });

    describe('overrideActionTransformer', () => {
        it('should fail when override default types suffixes with "undefined"', () => {
            const func = () => {
                lib.overrideActionTransformer(undefined);
            };
            expect(func).to.throw(Error, 'Action transformer must be a function');
        });

        it('should fail when override default types suffixes with "null"', () => {
            const func = () => {
                lib.overrideActionTransformer(null);
            };
            expect(func).to.throw(Error, 'Action transformer must be a function');
        });

        it('should fail when override default types suffixes with a number', () => {
            const func = () => {
                lib.overrideActionTransformer(1);
            };
            expect(func).to.throw(Error, 'Action transformer must be a function');
        });

        it('should fail when override default types suffixes with a string', () => {
            const func = () => {
                lib.overrideActionTransformer('1');
            };
            expect(func).to.throw(Error, 'Action transformer must be a function');
        });

        it('should fail when override default types suffixes with an array', () => {
            const func = () => {
                lib.overrideActionTransformer([]);
            };
            expect(func).to.throw(Error, 'Action transformer must be a function');
        });

        it('should fail when override default types suffixes with an object', () => {
            const func = () => {
                lib.overrideActionTransformer({ testKey: 'value1' });
            };
            expect(func).to.throw(Error, 'Action transformer must be a function');
        });
    });
});
