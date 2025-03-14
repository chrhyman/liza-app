import { DateTime } from 'luxon'
import { UUID } from './uuid'
import { Serializer } from './serializer.interface'
import { fromISO, toISO } from '@/util/timestamp'

export interface UserDto {
  id: string // UUID
  username: string
  email: string
  role: string // UserRole
  createdAt: string // timestamp
  updatedAt: string // timestamp
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
}

export class User {
  static serializer: Serializer<User, UserDto> = {
    fromJSON(json: UserDto): User {
      return new User(
        UUID.fromString(json.id),
        json.username,
        json.email,
        UserRole[json.role as keyof typeof UserRole],
        fromISO(json.createdAt),
        fromISO(json.updatedAt)
      )
    },

    toJSON(user: User): UserDto {
      const json: UserDto = {
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: toISO(user.createdAt),
        updatedAt: toISO(user.updatedAt),
      }
      return json
    },
  }

  constructor(
    readonly id: UUID,
    readonly username: string,
    readonly email: string,
    readonly role: UserRole,
    readonly createdAt: DateTime,
    readonly updatedAt: DateTime
  ) {}
}
