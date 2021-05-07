const {BlockChain,Transaction} = require('./src/blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
let BinhCoin  = new BlockChain();
// BinhCoin.addBlock(new Block(1,"6/5/2021",{amount:4}));
// BinhCoin.addBlock(new Block(2,"6/5/2021",{amount:10}));
// console.log(BinhCoin);
// console.log('is valide chain Bih coin:'+BinhCoin.isChainValid());
// BinhCoin.chain[1].data.amount =5;
// BinhCoin.chain[1].hash = BinhCoin.chain[1].calculateHash();

// console.log('is valide chain Bih coin:'+BinhCoin.isChainValid());
// BinhCoin.createTransaction(new Transaction('frAddress1','toAddress2',50));
// BinhCoin.createTransaction(new Transaction('frAddress1','toAddress2',50));
// BinhCoin.minePendingTransactions("SuccessAddress");
// console.log("blance of BNNN",BinhCoin.getBalanceOfAddress("SuccessAddress"));
// BinhCoin.minePendingTransactions("SuccessAddress");
// console.log("blance of BNNN",BinhCoin.getBalanceOfAddress("SuccessAddress"));
const myKey = ec.keyFromPrivate('cae6159e7d7910da218cc41a6cd1088b426d7f7b081f8c7de49f2a41aba218eb');
const myWalletAddress  = myKey.getPublic('hex');

const myWife  = ec.keyFromPrivate('04cdaf09c749de64ba199b8e77ea36740166d0e3d9a6849b74dd70697d88aad9ccb582c142f664a91c2322cdf78a50f389de59a14b095d12fea11a535f18d355f0');
const myWifeWalletAddress = myWife.getPublic('hex');

const miner  = ec.keyFromPrivate('04c7f6b1df6fc05ff150586bb45273f117eb6b45e3f7621991f10c4cf5341be2f509e10cd5bee4825936f30c39f3b8bd2d4fe9608f51a9237e5d0587302877c18c');
const minerWalletAddress = miner.getPublic('hex');

const tx1 = new Transaction(null,myWalletAddress,100);
tx1.signTransaction(null);
BinhCoin.addTransaction(tx1);
const tx2 = new Transaction(null,myWifeWalletAddress,200);
tx2.signTransaction(null);

BinhCoin.addTransaction(tx2);


BinhCoin.minePendingTransactions(minerWalletAddress);

//console.log(BinhCoin);
console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))



const tx3 = new Transaction(myWalletAddress,myWifeWalletAddress,10);
tx3.signTransaction(myKey);
BinhCoin.addTransaction(tx3);

//console.log('Miner is mining');
BinhCoin.minePendingTransactions(minerWalletAddress);

//console.log(BinhCoin);
console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))


const tx4 = new Transaction(minerWalletAddress,myWifeWalletAddress,10);
tx4.signTransaction(miner);
BinhCoin.addTransaction(tx4);

//console.log('Miner is mining');
BinhCoin.minePendingTransactions(minerWalletAddress);

//console.log(BinhCoin);
console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))


const tx5 = new Transaction(minerWalletAddress,myWifeWalletAddress,10);
tx5.signTransaction(miner);
BinhCoin.addTransaction(tx5);

//console.log('Miner is mining');
BinhCoin.minePendingTransactions(minerWalletAddress);

//console.log(BinhCoin);
console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))



const tx6 = new Transaction(minerWalletAddress,myWifeWalletAddress,10);
tx6.signTransaction(miner);
BinhCoin.addTransaction(tx6);

//console.log('Miner is mining');
BinhCoin.minePendingTransactions(minerWalletAddress);

//console.log(BinhCoin);
console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))


// const tx7 = new Transaction(minerWalletAddress,myWifeWalletAddress,10);
// tx7.signTransaction(miner);
// BinhCoin.addTransaction(tx7);

// console.log('Miner is mining');
// BinhCoin.minePendingTransactions(minerWalletAddress);

// //console.log(BinhCoin);
// console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
// console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
// console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))


// const tx8 = new Transaction(minerWalletAddress,myWifeWalletAddress,10);
// tx8.signTransaction(miner);
// BinhCoin.addTransaction(tx8);

// console.log('Miner is mining');
// BinhCoin.minePendingTransactions(minerWalletAddress);

// //console.log(BinhCoin);
// console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
// console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
// console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))


// const tx9 = new Transaction(minerWalletAddress,myWifeWalletAddress,10);
// tx9.signTransaction(miner);
// BinhCoin.addTransaction(tx9);

// console.log('Miner is mining');
// BinhCoin.minePendingTransactions(minerWalletAddress);

// //console.log(BinhCoin);
// console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
// console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
// console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))


// const tx10 = new Transaction(minerWalletAddress,myWifeWalletAddress,10);
// tx10.signTransaction(miner);
// BinhCoin.addTransaction(tx10);

// console.log('Miner is mining');
// BinhCoin.minePendingTransactions(minerWalletAddress);

// //console.log(BinhCoin);
// console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
// console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
// console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))


// const tx11 = new Transaction(minerWalletAddress,myWifeWalletAddress,10);
// tx11.signTransaction(miner);
// BinhCoin.addTransaction(tx11);

// console.log('Miner is mining');
// BinhCoin.minePendingTransactions(minerWalletAddress);

// //console.log(BinhCoin);
// console.log('Miner Balance',BinhCoin.getBalanceOfAddress(minerWalletAddress))
// console.log('My Balance',BinhCoin.getBalanceOfAddress(myWalletAddress))
// console.log('Mywife Balance',BinhCoin.getBalanceOfAddress(myWifeWalletAddress))



// BinhCoin.chain[1].transactions[0].amount =2;
// console.log('Ivalid chain',BinhCoin.isChainValid());
// console.log(BinhCoin.chain[1].transactions);
console.log(BinhCoin);
//console.log(BinhCoin.chain[1].hash)