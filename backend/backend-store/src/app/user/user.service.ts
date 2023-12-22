import { Injectable } from '@nestjs/common';
import { UserRepo } from 'domain/repos/user.repo';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async getUserById(userId: number) {
    return await this.userRepo.getUserById(userId);
  }
}
