type Client<K extends string> = { db: K } & { [P in K]: (data: P) => void }

export function f<T extends 'a' | 'b'>(c: Client<T>, name: T) {
  c[name]('a')
}
