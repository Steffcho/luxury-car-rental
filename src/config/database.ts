import mysql, { Pool } from 'mysql2/promise';

export class Database {
  public conn!: Pool;

  async init() {
    this.conn = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'rentals'
    });

    console.log('Connected to MySQL!');
  }
}

export const db = new Database();
