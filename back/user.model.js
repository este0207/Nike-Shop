export class UserModel{
    constructor(clientSQL){
        this.client = clientSQL;
        this.initTable();
    }

    async initTable() {
        try {
            // Création de la nouvelle table
            await this.client.execute(`
                CREATE TABLE IF NOT EXISTS user (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name TINYTEXT NOT NULL,
                    lastname TINYTEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL
                )
            `);
            console.log("Table 'user' ouvert avec succès");
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la table:", error);
            throw error;
        }
    }

    async getAllUser(){
        const [users] = await this.client.execute(`SELECT * FROM user`).catch(console.error);
        return users;
    }

    async getUserByEmail(email) {
        const [users] = await this.client.execute(
            `SELECT * FROM user WHERE email = ?`,
            [email]
        ).catch(console.error);
        return users[0];
    }

    async loginUser(email, password) {
        const [users] = await this.client.execute(
            `SELECT * FROM user WHERE email = ? AND password = ?`,
            [email, password]
        ).catch(console.error);
        return users[0];
    }

    async addUser(name, lastname, email, password){
        try {
            const [insertuser] = await this.client.execute(
                `INSERT INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)`,
                [name, lastname, email, password]
            );
            const [newUser] = await this.client.execute(
                `SELECT id, name, lastname, email FROM user WHERE id = ?`,
                [insertuser.insertId]
            );
            return newUser[0];
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Cet email est déjà utilisé');
            }
            throw error;
        }
    }

    async deleteUser(id){
        const [users] = await this.client.execute(`DELETE FROM user WHERE id =?`, [id]).catch(console.error);
        return users;
    }
}