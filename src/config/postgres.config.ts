export default (): Record<string, unknown> => ({
  redis: {
    name: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: parseInt(process.env.POSTGRES_USER),
    password: parseInt(process.env.POSTGRES_PASSWORD),
    db: parseInt(process.env.POSTGRES_DB),
  },
});
