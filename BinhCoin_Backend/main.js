const { BlockChain,Transaction, Wallets } = require("./blockchain");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const morgan  = require('morgan');
const _ = require("lodash");
const p2p_1 = require("./p2p");
const { json } = require("body-parser");
const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
//const wallet_1 = require("./wallet");
const wallets = new Wallets();
const binhcoin = new BlockChain();
const httpPort =  3001;
const p2pPort =  6001;

const initVirtualBlockChainData = () => {
    const myKey = ec.keyFromPrivate('cae6159e7d7910da218cc41a6cd1088b426d7f7b081f8c7de49f2a41aba218eb','hex');
    wallets.addAddress('04909f76e30a00afaa226e6ab51f3b8137b876b347676c8b8f09600d3c9b085df436da5514018eb14d6d36eaf6a85b07a4fcca5b78892f2b2a802767aa5f43c7ae');
    const myAddress = myKey.getPublic('hex');

    const othersKey = ec.keyFromPrivate('ec3c7512f98491ae5d0fa930e6c61b28ca5bc01f6fb1e61b41bd82d5dee7f389','hex');
    wallets.addAddress('04cdaf09c749de64ba199b8e77ea36740166d0e3d9a6849b74dd70697d88aad9ccb582c142f664a91c2322cdf78a50f389de59a14b095d12fea11a535f18d355f0');
    const othersAddress = othersKey.getPublic('hex');
    
    const minerKey = ec.keyFromPrivate('a72f9a69d20ef15629ea2a33196536b25995d64ada0c9ffe9056651c36eade74','hex');
    wallets.addAddress('04c7f6b1df6fc05ff150586bb45273f117eb6b45e3f7621991f10c4cf5341be2f509e10cd5bee4825936f30c39f3b8bd2d4fe9608f51a9237e5d0587302877c18c');
    const minerAdress = minerKey.getPublic('hex');
    
    const currentTimestamp = Math.round(new Date().getTime()/1000);
         
    const tx1 = new Transaction(null,myAddress,100,currentTimestamp);
    tx1.signTransaction(null);
    binhcoin.addTransaction(tx1);
    const tx2 = new Transaction(null,othersAddress,100,currentTimestamp);
    tx2.signTransaction(null);

    binhcoin.addTransaction(tx2);


    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))



    const tx3 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx3.signTransaction(myKey);
    binhcoin.addTransaction(tx3);

    //console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))


    const tx4 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx4.signTransaction(myKey);
    binhcoin.addTransaction(tx4);

    //console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))


    
    const tx5 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx5.signTransaction(myKey);
    binhcoin.addTransaction(tx5);


    //console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))



    const tx6 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx6.signTransaction(myKey);
    binhcoin.addTransaction(tx6);


    //console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))


    const tx7 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx7.signTransaction(myKey);
    binhcoin.addTransaction(tx7);


    console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))


   
    const tx8 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx8.signTransaction(myKey);
    binhcoin.addTransaction(tx8);

    console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))


   
    const tx9 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx9.signTransaction(myKey);
    binhcoin.addTransaction(tx9);


    console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))


    
    const tx10 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx10.signTransaction(myKey);
    binhcoin.addTransaction(tx10);


    console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))


   
    const tx11 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx11.signTransaction(myKey);
    binhcoin.addTransaction(tx11);


    console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))

    const tx12 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx12.signTransaction(myKey);
    binhcoin.addTransaction(tx12);

    //console.log(binhcoin.getBlockPendingTransactions());
    
    console.log('Miner is mining');
    binhcoin.minePendingTransactions(minerAdress);

    const tx13 = new Transaction(myAddress,othersAddress,10);
    tx13.signTransaction(myKey);
    binhcoin.addTransaction(tx13);
    binhcoin.minePendingTransactions(minerAdress);

    // //console.log(binhcoin);
    // console.log('Miner Balance',binhcoin.getBalanceOfAddress(minerAdress))
    // console.log('My Balance',binhcoin.getBalanceOfAddress(myAddress))
    // console.log('Others Balance',binhcoin.getBalanceOfAddress(othersAddress))

};

const initHttpServer = (myHttpPort) => {
    const app = express();
    app.use(morgan("dev"));
    app.use(cors());
    app.use(bodyParser.json());
    app.use((err, req, res, next) => {
        if (err) {
            res.status(400).send(err.message);
        }
    });
    //mine new block api
    app.post('/blocks',function (req,res) {
        const rewardAddress = req.body.rewardAddress;
        console.log(rewardAddress);
        console.log(wallets.isValidAddress(rewardAddress));
        if(!wallets.isValidAddress(rewardAddress)){
            res.send("Your reward Address does not exist");
        }
        else{
            binhcoin.minePendingTransactions(rewardAddress);
            res.send("New block is mined");
        }
    })
    app.get('/blocks', (req, res) => {
        res.send(binhcoin.getBlockChain());
    });
    app.get('/blocks/:hash', (req, res) => {
        const block = _.find(binhcoin.getBlockChain(), { 'hash': req.params.hash });
        res.send(block);
    });
    app.post('/create-wallet',(req,res)=>{
        res.send(wallets.generateKeyPair());
    })
    app.post('/access-wallet',(req,res)=>{
        const privateKey = req.body.privateKey;
        const key = ec.keyFromPrivate(privateKey);
        const publicKey = key.getPublic('hex');
        res.send({auth:wallets.isValidPrivateKey(privateKey),
            address: publicKey
        });
    })
    app.get('/wallets',(req,res)=>{
        //console.log(wallets.walletArray);
        res.send(wallets.walletArray);
    })
    app.get('/balance/:address', (req, res) => {
        const address = req.params.address;
        const balance = binhcoin.getBalanceOfAddress(address);
        res.send({ 'balance': balance });
    });
    
    
    
    app.get('/transactions', (req, res) => {
        res.send(binhcoin.getAllTransactions());
    });
    app.get('/transactions/:address', (req, res) => {
        const address = req.params.address;
        const sendingTxs = binhcoin.getSendingTransactionsOfAddress(address);
        const receivingTxs = binhcoin.getReceivingTransactionsOfAddress(address);
        res.send({
             'sendingTxs': sendingTxs,
             'receivingTxs':receivingTxs
        });
    });
    app.get('/pendingTransactions',(req,res)=>{
        let ts = +req.query.ts || 0;
        console.log(binhcoin.getBlockPendingTransactions().filter(x=>x.timestamp>ts).map(x=>x.timestamp) + "ts:" +ts);//get latest time after timestamp query
        res.send({
            returnTimestamp: Math.round(new Date().getTime()/1000),
            totalPendingTransactions: binhcoin.getBlockPendingTransactions().length,
            pendingTransactions: binhcoin.getBlockPendingTransactions().filter(x=>x.timestamp>ts)

        });
    })
    app.post('/transactions',(req,res)=>{
        const publicKey = req.body.publicKey;
        const privateKey  = req.body.privateKey;
        const toAddress  = req.body.toAddress;
        const amount  = +req.body.amount;
        const key = ec.keyFromPrivate(privateKey);
        if(publicKey != key.getPublic('hex')){
            res.send({error:"Use matched PrivateKEY"});
        }else if(!wallets.isValidPrivateKey(privateKey)){
            res.send({error:"Your Private Key does not exist"});
        }else if(!wallets.isValidAddress(toAddress)){
            res.send({error:"Your Receiver Address does not exist"});
        }else{
            const newTx = new Transaction(publicKey,toAddress,amount,Math.round(new Date().getTime()/1000));
            newTx.signTransaction(key);
            res.send(binhcoin.addTransaction(newTx));
        }
       
        // if(publicKey==key.getPublic('hex') && wallets.isValidPrivateKey(privateKey) && wallets.isValidAddress(toAddress)){
            // const newTx = new Transaction(publicKey,toAddress,amount,Math.round(new Date().getTime()/1000));
            // newTx.signTransaction(key);
            // res.send(binhcoin.addTransaction(newTx));
        // }else{
        //     res.send({ error: "Something Wrong like: Your private Key, your Received address is not exist!"})
        // }
    })
   
    // app.get('/transaction/:id', (req, res) => {
    //     const tx = _(blockchain_1.getBlockchain())
    //         .map((blocks) => blocks.data)
    //         .flatten()
    //         .find({ 'id': req.params.id });
    //     res.send(tx);
    // });
    // app.get('/address/:address', (req, res) => {
    //     const unspentTxOuts = _.filter(blockchain_1.getUnspentTxOuts(), (uTxO) => uTxO.address === req.params.address);
    //     res.send({ 'unspentTxOuts': unspentTxOuts });
    // });
    // app.get('/unspentTransactionOutputs', (req, res) => {
    //     res.send(blockchain_1.getUnspentTxOuts());
    // });
    // app.get('/myUnspentTransactionOutputs', (req, res) => {
    //     res.send(blockchain_1.getMyUnspentTransactionOutputs());
    // });
    // app.post('/mineRawBlock', (req, res) => {
    //     if (req.body.data == null) {
    //         res.send('data parameter is missing');
    //         return;
    //     }
    //     const newBlock = blockchain_1.generateRawNextBlock(req.body.data);
    //     if (newBlock === null) {
    //         res.status(400).send('could not generate block');
    //     }
    //     else {
    //         res.send(newBlock);
    //     }
    // });
    // app.post('/mineBlock', (req, res) => {
    //     const newBlock = blockchain_1.generateNextBlock();
    //     if (newBlock === null) {
    //         res.status(400).send('could not generate block');
    //     }
    //     else {
    //         res.send(newBlock);
    //     }
    // });
  
    // app.get('/address', (req, res) => {
    //     const address = wallet_1.getPublicFromWallet();
    //     res.send({ 'address': address });
    // });
    // app.post('/mineTransaction', (req, res) => {
    //     const address = req.body.address;
    //     const amount = req.body.amount;
    //     try {
    //         const resp = blockchain_1.generatenextBlockWithTransaction(address, amount);
    //         res.send(resp);
    //     }
    //     catch (e) {
    //         console.log(e.message);
    //         res.status(400).send(e.message);
    //     }
    // });
    // app.post('/sendTransaction', (req, res) => {
    //     try {
    //         const address = req.body.address;
    //         const amount = req.body.amount;
    //         if (address === undefined || amount === undefined) {
    //             throw Error('invalid address or amount');
    //         }
    //         const resp = blockchain_1.sendTransaction(address, amount);
    //         res.send(resp);
    //     }
    //     catch (e) {
    //         console.log(e.message);
    //         res.status(400).send(e.message);
    //     }
    // });
    // app.get('/transactionPool', (req, res) => {
    //     res.send(transactionPool_1.getTransactionPool());
    // });
    app.get('/peers', (req, res) => {
        res.send(p2p_1.getSockets().map((s) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    // app.post('/addPeer', (req, res) => {
    //     p2p_1.connectToPeers(req.body.peer);
    //     res.send();
    // });
    // app.post('/stop', (req, res) => {
    //     res.send({ 'msg': 'stopping server' });
    //     process.exit();
    // });
    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};
initVirtualBlockChainData();
initHttpServer(httpPort);
p2p_1.initP2PServer(p2pPort);