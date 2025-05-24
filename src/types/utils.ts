type Primitive = string | number | bigint | boolean | null | undefined;

type StringOr<T extends Primitive> = T | `${T}`;

export type NumberLike<T extends number = number> = StringOr<T>;
