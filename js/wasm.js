import photon from './dist/photon_rs.js';

window.loadPhoton = (() => {
    return new Promise(async (resolve) => {
        window.photon = await photon();
        return resolve(true);
    });
});
