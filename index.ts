type Head<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
type Tail<T extends any[]> = ((...args: T) => void) extends (head: any, ...tail: infer U) => any ? U : never;

type Shift<A, T extends any[]> = ((head: A, ...args: T) => void) extends (...tail: infer U) => any ? U : never;

type Push<A, T extends any[]> = Reverse<Shift<A, Reverse<T>>>;

type Last<L extends any[], D = never> = {
    0: D,
    1: L extends [infer H] ? H : never,
    2: ((...l: L) => any) extends ((h: any, ...t: infer T) => any) ? Last<T> : D,
}[L extends [] ? 0 : L extends [any] ? 1 : 2];

type _Append<T extends any[], H> =
    ((h: H, ...t: T) => any) extends ((...l: infer L) => any) ? L : never;

type Reverse<L extends any[], R extends any[] = []> = {
    0: R,
    1: ((...l: L) => any) extends ((h: infer H, ...t: infer T) => any) ?
        Reverse<T, _Append<R, H>> :
        never,
}[L extends [any, ...any[]] ? 1 : 0];

type Compose<L extends any[], V, R extends any[] = []> = {
    0: R,
    1: ((...l: L) => any) extends ((a: infer H, ...t: infer T) => any) ?
        Compose<T, H, _Append<R, (x: V) => H>>
        : never,
}[L extends [any, ...any[]] ? 1 : 0];

type PipeFunc<T extends any[], V> =
    (...f: Reverse<Compose<T, V>>) => ((x: V) => Last<T, V>);

type IfNotExtends<A, B, True, False> = A extends B ? False : True;
type IfExtends<A, B, True, False> = A extends B ? True : False;

type TypeByPath<
    T extends { [x: string]: any },
    Path extends string[],
    Phead = Head<Path>,
    Ptail = Tail<Path>,
> = {
    0: never,
    1: Phead extends keyof T ? TypeByPath<T[Phead], Tail<Path>> : never,
    2: Phead extends keyof T ? T[Phead] : never,
}[Ptail extends [any] ? 1 : 2];

type PathOf<
    T extends { [x: string]: any },
    Path extends string[],
    FullPath extends string[] = Path,
    Phead = Head<Path>,
    Ptail = Tail<Path>,
> = {
    0: never,
    1: Phead extends keyof T ? PathOf<T[Phead], Tail<Path>, FullPath> : never,
    2: Phead extends keyof T ? FullPath : never,
}[Ptail extends [any] ? 1 : 2];
