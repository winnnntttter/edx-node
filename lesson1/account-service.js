const sum = require('./utility.js');

let checkAccountBalance = 20;
let savingAccountBalance = 100;
let retirementAccountBalance = 200;

let totalBalance=sum([checkAccountBalance,savingAccountBalance,retirementAccountBalance]);
console.log(totalBalance);