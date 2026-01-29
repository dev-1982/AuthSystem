import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get(key: string, defaultValue?: string): string {
    return process.env[key] ?? defaultValue ?? '';
  }

  get jwtSecret(): string {
    return this.get('JWT_SECRET', 'dev_secret');
  }

  get jwtExpiresIn(): string {
    return this.get('JWT_EXPIRES_IN', '1h');
  }

  get dbHost(): string {
    return this.get('DB_HOST', 'db');
  }

  get dbPort(): number {
    return Number(this.get('DB_PORT', '5432'));
  }

  get dbUser(): string {
    return this.get('DB_USER', 'postgres');
  }

  get dbPassword(): string {
    return this.get('DB_PASSWORD', 'postgres');
  }

  get dbName(): string {
    return this.get('DB_NAME', 'authdb');
  }

  get adminEmail(): string {
    return this.get('ADMIN_EMAIL', 'admin@example.com');
  }

  get adminPassword(): string {
    return this.get('ADMIN_PASSWORD', 'admin123');
  }
}
