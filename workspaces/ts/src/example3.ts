module Example3 {

  // Generics  型の決定の遅延
  interface ValueContainer<T> {
    value: T
  }

  const hasNumber: ValueContainer<number> = { value: 10 };
  let hasString: ValueContainer<string>;
  // hasString = { value: 20 };  // Error: number 型を string 型に割り当てることはできない
  hasString = { value: 'foo' };

  // 引数 Annotation の Generics
  function toPayloadObject<T>(arg: T) {
    return { payload: arg };
  }

  const hasAmount = toPayloadObject<number>(10);  // hasAmount: { payload: number; }

  // extends  Generics に制約を設ける
  interface Input {
    value: number;
    amount: number;
  }

  function compute<T extends Input>(arg: T) {
    return {
      value: arg.value,
      amount: arg.amount,
      computed: arg.value ** arg.amount
    };
  }

  function merge<T extends object, U extends object>(inputA: T, inputB: U) {
    return Object.assign({}, inputA, inputB);
  }

  const merged = merge<{a: number}, {b: string}>({ a: 3 }, { b: 'str' });
  console.log(merged);  // => Object { a: 3, b: "str" }

  // Generics 同士の参照

  interface FooBarBaz {
    foo: string;
    bar: number;
    baz: boolean;
  }

  // function getType<T extends FooBarBaz>(input: T, key: keyof T) でも下のコードは動作する
  function getType<T extends FooBarBaz, U extends keyof T>(input: T, key: U) {
    return input[key];
  }

  const fbb = { foo: '0', bar: 1, baz: false };
  // 第 2 引数は 'foo' | 'bar' | 'baz' しか指定できない
  const foo = getType(fbb, 'foo');
  const bar = getType(fbb, 'bar');
  const baz = getType(fbb, 'baz');
  console.log(foo, bar, baz);  // => '0', 1, false

  // typeof による抽出
  type PrimitiveUnion = typeof foo | typeof baz;

  // import * as json from './fruits.json';
  // type Banana = (typeof json)['banana'];

  // Banana: { "price": number, "color": string, "displayName": string }
  type Banana = (typeof import('./fruits.json'))['banana'];

  const fruits = import('./fruits.json');
  // Fruits: Promise<{ default: { ... }, banana: { ... }, apple: { ... }, orange: { ... } }>
  type Fruits = typeof fruits;

  // MappedTypes
  // {[P in K]: T}  (半)動的に型を生成する機能
  // K は string にアサイン可能な型であればよく、K に対する値は T という型になる

  type T1 = { [P in 'x' | 'y']: number };  // { x: number; y: number; }
  type T2 = { [P in 'x' | 'y']: P };  // { x: "x"; y: "y"; }

  type Item = { a: string, b: number, c: boolean };

  type T3 = { [P in 'a' | 'b']: Item[P] };  // { a: string; b: number; }
  type T4 = { [P in keyof Item]: Date };  // { a: Date; b: Date; c: Date; }
  type T5 = { [P in keyof Item]: Item[P] };  // { a: string; b: number; c: boolean; }
  type T6 = { readonly [P in keyof Item]: Item[P] };  // { readonly a: string; readonly b: number; readonly c: boolean; }
  type T7 = { [P in keyof Item]: Array<Item[P]> };  // { a: string[]; b: number[]; c: boolean[]; }

  // ChildNode の UnionTypes の抽出
  // TupleToUnion 型
  // 独自定義 Utility Types の TupleToUnion 型は「配列に含まれている型を全て抽出する型」
}
