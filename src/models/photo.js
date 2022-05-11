const connect = require("../database");

const newPhoto = async(photo) => {
    const connection = await connect();
    await connection.query(`INSERT INTO photo (title, description, imageURL, public_id) VALUES ("${photo.title}", "${photo.description}", "${photo.imageURL}", "${photo.public_id}")`);
}

const getPhotos = async() => {
    const connection = await connect();
    const [rows] = await connection.query(`SELECT * FROM photo`);
    return rows;
}

const deletePhoto = async(public_id) => {
    const connection = await connect();
    await connection.query(`DELETE FROM photo where public_id="${public_id}"`);
}

module.exports = { newPhoto, getPhotos, deletePhoto };