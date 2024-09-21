// User DTO that desribes how to serialize a user for this particular route handler
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
