import { Module } from '@nestjs/common';
import { ExperimentsModule } from './experiments/experiments.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UsersModule, ExperimentsModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
