let s = "relevel";

// r -- 0 -- 6
// e -- 1 -- 5
// l -- 2 -- 4
// e -- 3 -- 3
// v -- 4 -- 2
// e -- 5 -- 1
// l -- 6 -- 0

console.log(s.indexOf("e")); // 1
console.log(s.lastIndexOf("e")); // 5

console.log(s.slice(4));
// First Index = 4
// Last Index = 7
console.log(s.slice(1, 4));
// First Index = 1
// Last Index = 4
console.log(s.toLocaleLowerCase());
console.log(s.toUpperCase());

let s2 = "Arpit  ";
console.log(s2.trim());
console.log(s2.replace("A", "a"));
console.log(s2.includes("A"));
console.log(s2.includes("a"));
console.log(s2.startsWith("A"));
console.log(s2.endsWith("l"));
console.log(s2.split("i"));
console.log(s2.padStart(10, "-"));
console.log(s2.trim().padEnd(15, "-"));
console.log(s2.repeat(2));
