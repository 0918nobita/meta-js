module Example {
    // 変数の推論型
    let a = 3;  // number
    const b = 4;  // Literal Type

    // オブジェクトの推論型
    const c = {
        d: 'foo',
        e: 'bar'
    };
    // c を凍結した (プロパティの追加/値の変更を禁止した) もの
    const f = Object.freeze(c);

    // 関数の推論型
    function func() {  // { foo: number; bar: string; }
        return { foo: 5, bar: 'xxx' }
    }

    function hoge() {  // Union Type (1 | "hage")
        return false ? 1 : 'hage'
    }

    // Type Alias
    type Gender = 'male' | 'female' | 'other'
    interface UserB {
        name: string
        age: number
        gender: Gender
    }

    function getName(user: UserB) {
        return user.name;
    }

    // getName({name: 'Taro', age: 18});  // Error: gender プロパティが不足

    function getAge(user: UserB, payload?: {suffix: string}) {
        // return `${user.age}${payload.suffix}`;  // Error: payload is possibly 'undefined'
        if (payload !== void 0) return `${user.age}${payload.suffix}`;
        else return `#{user.age}`;
    }

    // 戻り型 Annotation
    function createUser(): UserB {
        // if (Math.random() > 0.1) return;  // 推論で得られる型は User | void であるため互換性がない 
        return {
            name: 'Taro',
            age: 30,
            // gender: 'unknown' // Error: 互換性がない
            gender: 'male'
        };
    }

    // Assertion
    // const newUser1 = {};  // age プロパティへの代入がコンパイルエラーになる
    const newUser1 = {} as UserB;  // <User>{} は非推奨
    newUser1.age = 20;

    // Double Assertion  よほどの理由がない限り利用しないほうがよい
    console.log(("2" as any as number) * 3);  // => 6

    // 型 A は型 B より抽象度が低い
    // 型 A は型 B へアップキャスト可能
    function func2(): any {  // boolean は any より抽象度が低い
        return false;
    }

    const variable: string = func2();
    // console.log(variable.split(','));  // 実行時エラー (variable.split is not a function)

    // Assertion を使えばコンパイルエラーを回避できるが、定常開発ではあまり利用しない方がよい
    const newUser2 = {} as UserB;
    console.log(newUser2.name);

    // Union Types の型推論
    type UserA = {
        name: string; age: number; id: string;
    } | {
        name: string; age: number; gender: string;
    };

    let user = {} as UserA;
    user.name = 'Taro';
    user.age = 19;
    // user.id = 'foo';       // id プロパティは Union Type の後者に存在しないためコンパイルエラー
    // user.gender = 'male';  // gender プロパティは Union Type の前者に存在しないためコンパイルエラー

    const user1: UserA = {
        name: 'Taro',
        age: 18,
        id: 'foo'
    };

    const user2: UserA = {
        name: 'Taro',
        age: 20,
        gender : 'male'
    };

    type DeclaredUser = typeof user;  // UserA 型と同じ
    type DeclaredUser1 = typeof user1;  // 後者の型情報が消失
    type DeclaredUser2 = typeof user2;  // 前者の型情報が消失
}
