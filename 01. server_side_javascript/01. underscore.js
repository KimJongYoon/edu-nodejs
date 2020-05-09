const _ = require('underscore'); // node module에 있는 패키지를 불러온다.

const arr = [3,6,9,1,12];

// 배열의 첫번째 값
console.log(`arr[0]: ${arr[0]}`); 
console.log(`_.first(arr) : ${_.first(arr)}`);

// 배열의 마지막 값
console.log(`arr[arr.length-1] : ${arr[arr.length-1]}`);
console.log(`_.last(arr) : ${_.last(arr)}`);

//순서대로 정렬
arr.sort();
console.log(arr);