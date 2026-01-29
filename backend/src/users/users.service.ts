import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './users.entity';
import { ConfigService } from '../config/config.service';
import * as bcrypt from 'bcrypt';
import { QueryUsersDto } from './dto/query-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly config: ConfigService
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createUser(email: string, password: string, role: UserRole = 'USER') {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, passwordHash, role });
    return this.repo.save(user);
  }

  async getUsersWithQuery(query: QueryUsersDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 20);
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('user');

    if (query.search) {
      const term = `%${query.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(user.email) LIKE :term OR CAST(user.id AS text) LIKE :term)',
        { term }
      );
    }

    qb.orderBy(
      'user.createdAt',
      query.sort === 'asc' ? 'ASC' : 'DESC'
    );

    qb.skip(skip).take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async ensureAdminExists() {
    const adminEmail = this.config.adminEmail;
    const existing = await this.findByEmail(adminEmail);
    if (existing) return;

    const adminPassword = this.config.adminPassword;
    await this.createUser(adminEmail, adminPassword, 'ADMIN');
  }
}
