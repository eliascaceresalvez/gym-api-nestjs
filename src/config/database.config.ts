import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Resolves TypeORM options from environment.
 * Override DATABASE_FILE / DB_SYNCHRONIZE without code changes.
 */
export function createTypeOrmConfig(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'sqlite',
    database: config.get<string>('DATABASE_FILE', 'db.sqlite'),
    autoLoadEntities: true,
    synchronize: resolveSynchronize(config),
  };
}

function resolveSynchronize(config: ConfigService): boolean {
  const explicit = config.get<string>('DB_SYNCHRONIZE');
  if (explicit !== undefined && explicit !== '') {
    return explicit === 'true' || explicit === '1';
  }
  return config.get<string>('NODE_ENV', 'development') !== 'production';
}
