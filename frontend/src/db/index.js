import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase("ecommerce.db")

export const createSessionsTable = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL  ) '
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
};


export const createThemeTable = () => {
    return new Promise((resolve, reject) => {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS theme (
                ID INT PRIMARY KEY NOT NULL,
                DARK INT
            )
        `;
        const insertInitialRowQuery = `
            INSERT INTO theme (ID, DARK)
            SELECT 1, 0
            WHERE NOT EXISTS (SELECT 1 FROM theme WHERE ID = 1)
        `;

        db.transaction(tx => {
            // Crear la tabla si no existe
            tx.executeSql(createTableQuery, [], 
                () => {
                    // Insertar fila inicial si no existe
                    tx.executeSql(insertInitialRowQuery, [],
                        (_, result) => resolve(result),
                        (_, error) => reject(error)
                    );
                },
                (_, error) => reject(error)
            );
        });
    });
};

export const fetchTheme = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'SELECT * FROM theme'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result.rows._array),(_,result)=>rejected(result)))
    })
    return promise
};

export const updateTheme = (id, dark) => { 
    return new Promise((resolve, reject) => { 
        const updateQuery = ` UPDATE theme SET DARK = ? WHERE ID = ? `; db.transaction(tx => { 
            tx.executeSql(updateQuery, [dark, id], (_, result) => resolve(result), (_, error) => reject(error) ); 
        }); 
    }); 
};

export const insertSession = ({email, localId, token}) => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'INSERT INTO sessions (email, localId, token) VALUES (?,?,?)'
        db.transaction(tx=>tx.executeSql(query,[email,localId, token],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const fetchSession = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'SELECT * FROM sessions'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result.rows._array),(_,result)=>rejected(result)))
    })
    return promise
}

//FUNCION PELIGROSA:
export const clearSessions= () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = "DELETE FROM sessions" 
        db.transaction(tx=>{tx.executeSql(query,[],(_, result)=>resolved(result),(_,error)=>rejected(error))})
    })
    return promise
}