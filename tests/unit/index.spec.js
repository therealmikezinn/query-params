const { join } = require('path');

const QueryParams = require(join(__dirname, '..', '..', 'dist', 'index'));

const { expect } = require('chai');

describe('QueryParams', function() {
    describe('Constructed With Full URL', function () {
        let instance;

        beforeEach(function() {
            instance = QueryParams('http://www.example.com?varOne=12&varTwo=13')
        });

        it('Get all should return an approprate object', function () {
            expect(instance.getAll()).to.be.a('object').to.deep.equal({
                varOne: '12',
                varTwo: '13',
            });
        });

        it('Get Should appropriate value', function () {
            expect(instance.get('varOne')).to.equal('12');
        });

        it('Should be equal to original query string when stringifed', function () {
            expect(instance.toString()).to.equal('?varOne=12&varTwo=13');
        });

        it('Contains should return true for valid props', function(){
           expect(instance.contains(['varOne', 'varTwo'])).to.equal(true);
        });

        it('Contains should return false for invalid props', function(){
            expect(instance.contains(['varOne', 'varThree'])).to.equal(false);
        });

        it('Has should return true', function(){
            expect(instance.has('varOne')).to.equal(true);
        });

        it('Has should return false', function(){
            expect(instance.has('varThree')).to.equal(false);
        });

        it('Should add new values with merge', function(){
            instance.merge({
                varThree: 13,
                varFour: 15,
            });

            expect(instance.getAll()).to.be.a('object').to.deep.equal({
                varOne: '12',
                varTwo: '13',
                varThree: 13,
                varFour: 15,
            });
        });

        it('Pick should extract the correct keys', function(){
            instance.merge({
                varThree: 13,
                varFour: 15,
            });

            expect(instance.pick(['varOne', 'varTwo'])).to.deep.equal({
                varOne: '12',
                varTwo: '13',
            });
        });

        it('setOrAppend On existing property', function(){
            instance.setOrAppend('varOne', 11);
            expect(instance.get('varOne')).to.be.a('array').to.deep.equal(['12', 11]);
        });

        it('toUrl Should Create the correct url', function(){
            expect(instance.toUrl('http://www.example.com')).to.equal('http://www.example.com?varOne=12&varTwo=13')
        });

        it('append on non existent property', function(){
            instance.append('varThree', 12);
            expect(instance.get('varThree')).to.deep.equal([12]);
        });

        it('append on existing property', function(){
            instance.append('varTwo', 12);
            expect(instance.get('varTwo')).to.deep.equal(['13', 12]);
        });
    });

    describe('Constructed With Full URL with repeat parameters', function () {
        let instance;

        beforeEach(function() {
            instance = QueryParams('http://www.example.com?varOne=12&varOne=13')
        });

        it('Get all should return an approprate array [12, 13]', function () {
            expect(instance.get('varOne')).to.be.a('array').to.deep.equal(['12', '13']);
        });
    });

    describe('Constructed With No Parameters', function() {
        let instance;

        beforeEach(function () {
            instance = QueryParams();
        });

        it('Get All Should return an empty object', function() {
            expect(instance.getAll()).to.be.a('object').to.deep.equal({});
        });

        it('toUrl Should return an empty string', function() {
            expect(instance.toUrl()).to.equal('');
        });

        it('toUrl should return http://www.example.com', function(){
            expect(instance.toUrl('http://www.example.com')).to.equal('http://www.example.com');
        });
    });
});
