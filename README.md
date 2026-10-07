# `bun check` misses TS2345 on a generic key into an intersection with a mapped type

```ts
type Client<K extends string> = { db: K } & { [P in K]: (data: P) => void }

export function f<T extends 'a' | 'b'>(c: Client<T>, name: T) {
  c[name]('a')
}
```

| | |
| --- | --- |
| `tsc` 7.0.2, 6.0.2 | `repro.ts(4,11): error TS2345: Argument of type '"a"' is not assignable to parameter of type 'never'.` |
| `bun check` 1.4.3-canary.1+bd599f5af | `✓ No type errors` |

`c[name]` is `((data: "a") => void) | ((data: "b") => void)` in `tsc` and `(data: "a" | "b") => void` in `bun check`. Without `{ db: K } &` they agree.

```sh
bun check
bunx -p typescript@7.0.2 tsc -p .
```
