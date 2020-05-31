namespace Example4 {
    const arr = []; // arr: any[]
    arr.push(3);
    console.log(arr); // arr: number[]
    arr.push('3');
    console.log(arr); // arr: (string | number)[]
    arr.push(['4']);
    console.log(arr); // arr: (string | number | string[])[]

    const arr2: number[] = [1, 2, 3];
    arr2.push(4);
    // arr2.push('5'); // Error

    let tupleA: [string, number] = ['abc', 7];
    // tupleA = ['def', '8'] // Error

    /*
    function tuple<T1, T2>(t1: T1, t2: T2): [T1, T2];
    function tuple<T1, T2, T3>(t1: T1, t2: T2, t3: T3): [T1, T2, T3];
    function tuple(...args: any[]) {
            return args;
    }
    */

    function tuple<T extends any[]>(...args: T) {
        return args;
    }

    const tupleB = tuple('abc', 7); // tupleB: [string, number]
    const tupleC = tuple('def', 8, false); // tupleC: [string, number, boolean]
    const tupleD = tuple('ghi', tuple(1, 2), 10); // tupleD: [string, [number, number], number]

    enum Direction {
        Up, Down, Left, Right
    }

    console.log(
        [Direction.Up, Direction.Down, Direction.Left, Direction.Right]
    ); // => [0, 1, 2, 3]

    enum ABC {
        A = 3,
        B = 5,
        C
    }

    console.log(
        [ABC.A, ABC.B, ABC.C]
    ); // => [3, 5, 6]
}
