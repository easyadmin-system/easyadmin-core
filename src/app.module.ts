import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { VersionModule } from './modules/version/version.module';

@Module({
  imports: [UsersModule, VersionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
