[![NPM Version](https://badge.fury.io/js/ts-tuple-hacks.svg?style=flat)](https://www.npmjs.com/package/ts-tuple-hacks)

# ts-tuple-hacks

Implementation of some utility types for tuples.

Beautified version of [typepark](https://github.com/kgtkr/typepark) with `TypeByPath` & `PathOf` implemented.  
Checkout [Variadic Kinds thread](https://github.com/Microsoft/TypeScript/issues/5453).

Check also:
* [pathof](https://github.com/Morglod/ts-pathof) keyword implementation
* [arguments types](https://github.com/Morglod/ts-args)

## Install

```
npm i ts-tuple-hacks --save-exact
```

## Methods

Pick head of tuple

```ts
type head = Head<[string, boolean, number]>;

head -> string
```

Pick tail of tuple

```ts
type tail = Tail<[string, boolean, number]>;

tail -> [boolean, number]
```

Push type in front of tuple

```ts
type tuple = Shift<string, [boolean, number]>;

tuple -> [string, boolean, number]
```

Push type at the end of tuple

```ts
type tuple = Push<string, [boolean, number]>;

tuple -> [boolean, number, string]
```

Pick last type of tuple

```ts
type last = Last<[boolean, number, string]>;

last -> string
```

Reverse tuple

```ts
type reversed = Reverse<[boolean, number, string]>;

reversed -> [string, number, boolean]
```

Compose (join) two tuples

```ts
type composed = Compose<[boolean, string], [number]>;

composed -> [boolean, string, number]
```

Pick type by path in object

```ts
const o = {x: { y: 10 }};

type xy = TypeByPath<typeof o, ['x', 'y']>;
xy -> number

type xyz = TypeByPath<typeof o, ['x', 'y', 'z']>;
xyz -> never
```

Pick path in object if it is valid  
check also [pathof](https://github.com/Morglod/ts-pathof).

```ts
const o = {x: { y: 10 }};

type xy = PathOf<typeof o, ['x', 'y']>;
xy -> ['x', 'y']

type xyz = PathOf<typeof o, ['x', 'y', 'z']>;
xyz -> never
```

Make pipe function type  
Tuple represents results of each pipe's step

```ts
type MyPipe = PipeFunc<['a', 'b', 'c'], (a: number) => boolean>;

const pipe: MyPipe = undefined!;

const result = pipe(
    (x: (a: number) => boolean) => 'a',
    (x: 'a') => 'b',
    (x: 'b') => 'c',
);

result -> 'c'
```