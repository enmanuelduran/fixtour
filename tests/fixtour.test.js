import Fixtour from '../src/fixtour';
import fs from 'fs';

describe('Fixtour', () => {
    describe('When loading HTML', () => {
        Fixtour.html('tests/fixtures/test.html');

        afterAll(() => {
            Fixtour.clear();
            Fixtour.clearCache();
        });

        it('Should succesfully add elements to the DOM', () => {
            expect(document.querySelector('.first-class').innerHTML).toBe('First Div');
            expect(document.querySelector('.second-class').innerHTML).toBe('Second Div');
        });

        it('Should sucessfully add nested elements to the DOM', () => {
            expect(document.querySelector('.third-class .nested-class').innerHTML).toBe('Nested Div');
        });
    });

    describe('When caching', () => {
        it('Should cache the files that have already been read', () => {
            Fixtour.html('tests/fixtures/test.html');

            jest.spyOn(fs, 'readFileSync');

            Fixtour.html('tests/fixtures/test.html');

            expect(fs.readFileSync).not.toHaveBeenCalled();
            expect(Object.keys(Fixtour.getCachedFixtures()).length).toBe(1);
        });

        it('Should clear the cache', () => {
            expect(Object.keys(Fixtour.getCachedFixtures()).length).toBe(1);

            Fixtour.clearCache();

            expect(Object.keys(Fixtour.getCachedFixtures()).length).toBe(0);
        });
    });

    describe('When loading JSON', () => {
        it('Should correctly return json fixtures', () => {
            const jsonFixture = Fixtour.json('tests/fixtures/test.json');

            expect(jsonFixture).toEqual({
                "particles": [
                    {
                        "name": "Fermions",
                        "type": "Elementary particles"
                    },
                    {
                        "name": "Quarks",
                        "type": "Elementary particles"
                    },
                    {
                        "name": "Leptons",
                        "type": "Elementary particles"
                    },
                    {
                        "name": "Hadrons",
                        "type": "Composite particles"
                    },
                    {
                        "name": "Atoms",
                        "type": "Composite particles"
                    },
                ],
                "numberOfParticles": 5
            });
        });

        it('Should throw an error if JSON file is not parseable', () => {
            const jsonFixture = () => {
                Fixtour.json('tests/fixtures/invalid-json.json')
            };

            expect(jsonFixture).toThrowError('Not possible to parse JSON file, incorrect format or JSON structure');
        });
    });
});
