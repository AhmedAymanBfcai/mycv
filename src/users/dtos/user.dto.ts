// User DTO that desribes how to serialize a user for this particular route handler
import { Expose, Exclude } from 'class-transformer';

export class UserDto {
  @Exclude()
  id: number;

  @Expose()
  email: string;
}
