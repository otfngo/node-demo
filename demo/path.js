const { join, resolve, parse } = require('path')

console.log(join('/usr', '//local///', '//src///'));
console.log(resolve('/usr', '//local///', '//src///'));
console.log(parse('/home/user/dir/file.txt'));