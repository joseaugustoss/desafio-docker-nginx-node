const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const databaseConfig = {
    host: process.env.MYSQL_URL || 'database',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'desafiodb'
};

const app = express();

const queryDatabase = async (sql, values) => {
    const connection = await mysql.createConnection(databaseConfig);

    try {
        const [queryResults] = await connection.query(sql, values);
        return queryResults;
    } catch (error) {
        throw error;
    } finally {
        await connection.end();
    }
};

const createTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS characterSW (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
    `;
    await queryDatabase(createTableQuery);
};

const insertTestData = async () => {
    const characters = ['José Augusto'];
    const insertCharacterQuery = 'INSERT INTO characterSW (name) VALUES (?)';

    for (const character of characters) {
        await queryDatabase(insertCharacterQuery, [character]);
    }
};

const getAllCharacters = async () => {
    const selectCharactersQuery = 'SELECT * FROM characterSW';
    const allCharacters = await queryDatabase(selectCharactersQuery);
    return allCharacters;
};

app.get('/', async (req, res) => {
    try {
        const allCharacters = await getAllCharacters();

        const html = `<h1>Full Cycle Rocks!</h1>\n<ol>\n${allCharacters.map(character => `<li>${character.name}</li>`).join('\n')}\n</ol>`;
        res.send(html);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

const initializeApp = async () => {
    try {
        await createTable();
        await insertTestData();

        app.listen(PORT, () => {
            console.log(`Serviço rodando na em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao inicializar o app:', error);
    }
};

initializeApp();
