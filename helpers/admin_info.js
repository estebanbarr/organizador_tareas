const fs = require('fs');

const archivo = './data/data.dat';

const leerInfo = () => {
    if (!fs.existsSync(archivo))
        return null;

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    if (info.length == 0)
        return null;

    const data = JSON.parse(info);

    return data;
}

const guardarInfo = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

module.exports = {
    leerInfo,
    guardarInfo
}
