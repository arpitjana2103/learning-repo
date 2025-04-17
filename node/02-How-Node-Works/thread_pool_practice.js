const crypto = require("crypto");
const OS = require("os");

let start = Date.now();
console.log("CPU LENGTH : ", OS.cpus().length);

crypto.pbkdf2("password123", "salt", 10000, 1024, "sha512", function () {
  console.log(Date.now() - start, "Password Encripted.");
  //   start = Date.now();
});
crypto.pbkdf2("password123", "salt", 10000, 1024, "sha512", function () {
  console.log(Date.now() - start, "Password Encripted.");
  //   start = Date.now();
});
crypto.pbkdf2("password123", "salt", 10000, 1024, "sha512", function () {
  console.log(Date.now() - start, "Password Encripted.");
  //   start = Date.now();
});
crypto.pbkdf2("password123", "salt", 10000, 1024, "sha512", function () {
  console.log(Date.now() - start, "Password Encripted.");
  //   start = Date.now();
});
crypto.pbkdf2("password123", "salt", 10000, 1024, "sha512", function () {
  console.log(Date.now() - start, "Password Encripted.");
  //   start = Date.now();
});
crypto.pbkdf2("password123", "salt", 10000, 1024, "sha512", function () {
  console.log(Date.now() - start, "Password Encripted.");
  //   start = Date.now();
});

/*
$ UV_THREADPOOL_SIZE=1 node thread_pool_practice.js 
373 Password Encripted.
745 Password Encripted.
1119 Password Encripted.
1497 Password Encripted.
1862 Password Encripted.
2225 Password Encripted.

$ UV_THREADPOOL_SIZE=4 node thread_pool_practice.js 
643 Password Encripted.
663 Password Encripted.
664 Password Encripted.
664 Password Encripted.
1169 Password Encripted.
1175 Password Encripted.

$ UV_THREADPOOL_SIZE=8 node thread_pool_practice.js 
733 Password Encripted.
757 Password Encripted.
758 Password Encripted.
758 Password Encripted.
762 Password Encripted.
763 Password Encripted.
*/
