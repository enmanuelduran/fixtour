import fs from 'fs';
import path from 'path';

function Fixtour(cache = {}) {
    const _rootPath = filePath => path.join(process.cwd(), filePath);

    const _readFile = file => {
        const fileAddress = `${_rootPath(file)}`;

        if (!(fileAddress in cache)) {
            const response = fs.readFileSync(fileAddress, 'utf8');

            cache[fileAddress] = response;
        }

        return cache[fileAddress];
    };

    const html = file => {
        const content = _readFile(file);

        document.body.innerHTML  = content;
    };

    const json = file => {
        const content = _readFile(file);

        try {
            return JSON.parse(content);
        } catch (error) {
            throw new Error(
                'Not possible to parse JSON file, incorrect format or JSON structure',
                error
            );
        }
    };

    const getCachedFixtures = () => {
        return cache;
    };

    const clear = () => {
        document.body.innerHTML = '';
    };

    const clearCache = () => {
        cache = {};
    };

    return Object.freeze({
        html,
        json,
        clear,
        clearCache,
        getCachedFixtures
    });
}

export default Fixtour();
