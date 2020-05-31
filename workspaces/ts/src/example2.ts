module Example2 {

    // 初期化時に絞り込む
    const variable2: boolean | number | string = 'foo';
    console.log(variable2);  // string

    let variable3: boolean | number | string = 'bar';
    console.log(variable3);  // string

    // if 文で型を絞り込む
    function nullableToString(arg: string | null): string {
        if (arg === null) return '';
        return arg;
    }

    function numericToString(arg: string | number): string {
        if (typeof arg === 'number') return String(arg);
        return arg;
    }

    // [ 判別共用体 ]  共用体 = Union Type

    // タグ付き Union Types
    interface User {
        tag: 'other'
        id: string
    }

    interface AppUser {
        tag: 'app'
        appId: string
    }

    interface ServiceUser {
        tag: 'service'
        serviceId: string
    }

    function getUserIDBySwitch(user: User | AppUser | ServiceUser) {
        switch (user.tag) {
            case 'app':
                return user.appId;
            case 'service':
                return user.serviceId;
            default:
                return user.id;
        }
    }

    // in 演算子
    function getUserID(user: User | AppUser | ServiceUser) {
        if ('appId' in user) return user.appId;
        if ('serviceId' in user) return user.serviceId;
        return user.id;
    }

    // 独自定義 Type Guard
    // 引数型が期待型と互換性があるかどうかの真偽値を返しつつ、型を絞り込む手法
    // hasFoo, hasBar 関数の戻り値は真偽型であり、利用する分岐先において宣言された型の振る舞いが担保される
    type Foo = { foo: string, value: 'foo' };
    type Bar = { bar: string, value: 'bar' };

    function hasFoo(arg: any): arg is Foo {
        return arg.value === 'foo';
    }

    function hasBar(arg: any): arg is Bar {
        return arg.value === 'bar';
    }

    function fooBarBaz(arg: any) {
        if (hasFoo(arg)) return arg.value;
        if (hasBar(arg)) return arg.value;
        return 'baz';
    }
}
