const sqlite3 = require('sqlite3').verbose(); 

db = new sqlite3.Database(process.env.DB_PATH, (err) => { 
    if (err) { 
        console.error('Error al conectar:', err.message); 
    } else { 
        console.log('Conectado a SQLite'); } });

module.exports = db