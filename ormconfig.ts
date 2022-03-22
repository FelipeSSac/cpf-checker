const path = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

module.exports = {
  type: 'sqlite',
  database: `./${path}/shared/infra/typeorm/database.sqlite`,
  entities: [`./${path}/modules/**/infra/typeorm/entities/*{.ts,.js}`],
  migrations: [`./${path}/shared/infra/typeorm/migrations/*{.ts,.js}`],
  synchronize: false,
  cli: {
    migrationsDir: `./${path}/shared/infra/typeorm/migrations`,
  },
};
