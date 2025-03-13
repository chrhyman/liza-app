import { v4 as uuidv4 } from 'uuid'

export class UUID {
  static validation =
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i

  private static EMPTY = String('00000000-0000-0000-0000-000000000000')
  private readonly value: string

  private constructor(uuid: string) {
    if (!UUID.validate(uuid)) {
      throw new TypeError(`The value [${uuid}] is not a valid v4 UUID`)
    }
    this.value = uuid
  }

  static validate(uuid?: string | UUID): boolean {
    if (!uuid) {
      return false
    }
    if (uuid instanceof UUID) {
      return true
    }
    return UUID.validation.test(uuid)
  }

  static empty(): UUID {
    return new UUID(UUID.EMPTY)
  }

  static create(): UUID {
    return new UUID(uuidv4())
  }

  static fromString(uuid: string): UUID {
    return new UUID(uuid)
  }

  equals(other?: UUID): boolean {
    if (!other) {
      return false
    }
    return UUID.validate(other) && this.value === other.toString()
  }

  isEmpty(): boolean {
    return this.value === UUID.EMPTY
  }

  toString(): string {
    return this.value
  }
}
