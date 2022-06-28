import { getExportsStatic } from 'pkg-exports'

const exports = await getExportsStatic('vue')
console.log(exports) // ['ref', 'computed', ...]
