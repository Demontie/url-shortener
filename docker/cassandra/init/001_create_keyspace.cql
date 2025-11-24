-- path: docker/cassandra/init/001_create_keyspace.cql
CREATE KEYSPACE IF NOT EXISTS url_shortener
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
AND durable_writes = true;