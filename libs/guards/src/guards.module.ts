import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserModule } from '@database/modules';

@Module({
  imports: [UserModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class GuardsModule {}
