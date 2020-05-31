import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const development = !!process.env.ROLLUP_WATCH;

export default {
    input: './src/bootstrap.ts',
    output: {
        format: 'cjs',
        dir: 'dist',
        sourcemap: 'true',
    },
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        typescript(),
        development &&
            serve({
                open: true,
                openPage: '/',
                verbose: true,
                contentBase: '.',
                host: 'localhost',
                port: 1234,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }),
        !development && terser(),
    ],
};
