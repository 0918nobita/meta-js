module Nullable {
    let a: object | null = either(null, {});
    // a: object | null;
    const cond1 = a || {};              // cond1: object
    const cond2 = a !== null ? a : {};  // cond2: object

    let b: { foo: string } | null = either(null, { foo: 'abc' });
    const foo = b && b.foo;              // foo: string | null
    const bar = b !== null && b.foo;     // bar: string | false
    const baz = b !== null ? b.foo : b;  // baz: string | null

    function either<A, B>(a: A, b: B) {
        return (Math.random() > 0.5) ? a : b;
    }
}

type VNode<Tag extends string, Attributes extends object, Children extends VNode<any, any, any>[]> = {
    tag: Tag;
    attributes: Attributes;
    children: Children;
}

type CommonAttributes = {
    id?: string;
    class?: string;
};

type Original = {
    div: {
        readonly attributes: {};
    };
    input: {
        readonly attributes: { type: 'text' } | { type: 'checkbox' | 'radio', checked?: boolean };
    };
};

type Elements = { [P in keyof Original]: Original[P] & { readonly attributes: CommonAttributes } };

function elem<
    Tag extends keyof Elements,
    Attributes extends Elements[Tag]['attributes'],
    Children extends VNode<any, any, any>[]
>(
    tag: Tag, attributes: Attributes, ...children: Children
): VNode<Tag, Attributes, Children> {
    return { tag, attributes, children };
}

const element = elem('div', {},
    elem('input', { type: 'checkbox', checked: true } as const),
    elem('input', { type: 'text' } as const),
);
