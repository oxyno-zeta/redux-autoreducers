/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 26/06/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import { expect } from 'chai';
import { snakeToLowerCamel } from '../src/utils';

/* ************************************* */
/* ********        TESTS        ******** */
/* ************************************* */

describe('snakeToLowerCamel', () => {
    it('should transform "test" into "test"', () => {
        const result = snakeToLowerCamel('test');
        expect(result).to.equal('test');
    });

    it('should transform "Test" into "Test"', () => {
        const result = snakeToLowerCamel('Test');
        expect(result).to.equal('Test');
    });

    it('should transform "Test_test" into "TestTest"', () => {
        const result = snakeToLowerCamel('Test_test');
        expect(result).to.equal('TestTest');
    });

    it('should transform "Test_Test" into "TestTest"', () => {
        const result = snakeToLowerCamel('Test_Test');
        expect(result).to.equal('TestTest');
    });

    it('should transform "Test_Test_test" into "TestTestTest"', () => {
        const result = snakeToLowerCamel('Test_Test_test');
        expect(result).to.equal('TestTestTest');
    });

    it('should transform "Test_Test_Test" into "TestTestTest"', () => {
        const result = snakeToLowerCamel('Test_Test_Test');
        expect(result).to.equal('TestTestTest');
    });

    it('should transform "Test-test_Test" into "Test-testTest"', () => {
        const result = snakeToLowerCamel('Test-test_Test');
        expect(result).to.equal('Test-testTest');
    });
});
