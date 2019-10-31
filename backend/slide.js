const { JWT } = require('google-auth-library');
const keys = require('./theobot-siqtvw-250df50c6c92.json');

let client;
let exercices = ['1', '2'];

client = new JWT(
    keys.client_email,
    null,
    keys.private_key,
    [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/presentations'
    ],
);

async function list() {
    // console.log('CLient', client)
    const url = `https://www.googleapis.com/drive/v3/files`;
    return await client.request({
        url,
        method: 'GET'
    })
}

async function create() {
    const url = `https://slides.googleapis.com/v1/presentations`;
    return await client.request({ url, method: 'POST' })
}

async function createFromAnother(fileId) {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}/copy`;
    return await client.request({
        url,
        method: 'POST'
    })
}

async function get(presentationId) {
    const url = `https://slides.googleapis.com/v1/presentations/${presentationId}`;
    return await client.request({ url, method: 'GET' })
}
async function getFile(fileId) {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
    return await client.request({
        url,
        method: 'GET',
        params: {
            fields: '*'
        }
    })
}
async function deleteFile(fileId) {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
    return await client.request({
        url,
        method: 'DELETE'
    })
}

// ####################################################
// ###################### MAIN ########################
// ####################################################
async function main() {
    let result = await list();
    // console.log('Files', result.data);
    result.data.files.forEach((file) => console.log('File', file.mimeType, file.id, file.name));

    let result2 = await getFile('1PZlc06GPgGVVlGE5Tt_eViB5tuPl7gRjkew5YuGAjlA');
    console.log('2', result2.data);

}

main();