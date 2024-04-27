import { Module } from '@nestjs/common';
import { StepsController } from './calculator/controller';
import { StepsCalculator } from './calculator/service';

@Module({
  imports: [],
  controllers: [StepsController],
  providers: [StepsCalculator],
})
export class AppModule {}
