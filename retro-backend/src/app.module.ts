import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SessionModule,
    MongooseModule.forRoot('mongodb://mongo:27017/admin', {
      auth: {
        user: 'root',
        password: 'example',
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
