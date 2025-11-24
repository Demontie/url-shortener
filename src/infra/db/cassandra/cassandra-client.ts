/** biome-ignore-all lint/complexity/useLiteralKeys: <any> */
import { Client } from 'cassandra-driver';

let cassandraClientServiceInstance: CassandraClientService | undefined;

export class CassandraClientService {
  private contactPoints: string[] | undefined;
  private dataCenter: string | undefined;
  private keyspace: string | undefined;

  private client: Client | undefined;

  constructor(params?: {
    contactPoints?: string[];
    dataCenter?: string;
    keyspace?: string;
  }) {
    this.contactPoints =
      params?.contactPoints ||
      process.env.DATABASE_CONTACT_POINTS?.split(',') ||
      [];
    this.dataCenter =
      params?.dataCenter || process.env.DATABASE_LOCAL_DATACENTER || '';
    this.keyspace = params?.keyspace || process.env.DATABASE_KEYSPACE || '';
  }

  // Singleton pattern
  static getInstance(params?: {
    contactPoints?: string[];
    dataCenter?: string;
    keyspace?: string;
  }): CassandraClientService {
    if (!cassandraClientServiceInstance) {
      cassandraClientServiceInstance = new CassandraClientService(params);
    }
    return cassandraClientServiceInstance;
  }

  async connect() {
    if (this.client) {
      return;
    }
    this.client = new Client({
      contactPoints: this.contactPoints,
      localDataCenter: this.dataCenter,
      keyspace: this.keyspace,
    });
    await this.client.connect();
  }

  getClient(): Client {
    if (!this.client) {
      throw new Error('Client not initialized');
    }
    return this.client;
  }

  async disconnect(): Promise<void> {
    if (!this.client) {
      return;
    }
    await this.client.shutdown();
    this.client = undefined;
    cassandraClientServiceInstance = undefined;
  }

  async verifyConnection() {
    if (!this.client) {
      throw new Error('Client not initialized');
    }
    const result = await this.client.execute(
      'SELECT release_version FROM system.local',
    );
    return result.rows[0]['release_version'];
  }
}
