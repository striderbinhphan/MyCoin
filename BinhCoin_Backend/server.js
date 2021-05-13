const WebSocket = require("ws");
const { BlockChain,Transaction, Wallets } = require("./src/blockchain");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const morgan  = require('morgan');
const _ = require("lodash");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const MessageType =  {
    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN:2,
    QUERY_PENDING_TRANSACTIONS:3,
    RESPONSE_PENDING_TRANSACTIONS:4
};
//Init Blockchain system
const wallets = new Wallets();
const binhcoin = new BlockChain();
const nodes = [];

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



    const tx3 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx3.signTransaction(myKey);
    binhcoin.addTransaction(tx3);

    binhcoin.minePendingTransactions(minerAdress);



    const tx4 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx4.signTransaction(myKey);
    binhcoin.addTransaction(tx4);

    binhcoin.minePendingTransactions(minerAdress);

    

    
    const tx5 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx5.signTransaction(myKey);
    binhcoin.addTransaction(tx5);


    binhcoin.minePendingTransactions(minerAdress);

 



    const tx6 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx6.signTransaction(myKey);
    binhcoin.addTransaction(tx6);


    binhcoin.minePendingTransactions(minerAdress);

    

    const tx7 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx7.signTransaction(myKey);
    binhcoin.addTransaction(tx7);


    binhcoin.minePendingTransactions(minerAdress);

    

   
    const tx8 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx8.signTransaction(myKey);
    binhcoin.addTransaction(tx8);

    binhcoin.minePendingTransactions(minerAdress);

    

   
    const tx9 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx9.signTransaction(myKey);
    binhcoin.addTransaction(tx9);


    binhcoin.minePendingTransactions(minerAdress);

    


    
    const tx10 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx10.signTransaction(myKey);
    binhcoin.addTransaction(tx10);


    binhcoin.minePendingTransactions(minerAdress);

    


   
    const tx11 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx11.signTransaction(myKey);
    binhcoin.addTransaction(tx11);


    binhcoin.minePendingTransactions(minerAdress);

    

    const tx12 = new Transaction(myAddress,othersAddress,10,currentTimestamp);
    tx12.signTransaction(myKey);
    binhcoin.addTransaction(tx12);

    const tx14 = new Transaction(othersAddress,myAddress,10,currentTimestamp);
    tx14.signTransaction(myKey);
    binhcoin.addTransaction(tx14);
    const tx15 = new Transaction(othersAddress,myAddress,10,currentTimestamp);
    tx15.signTransaction(myKey);
    binhcoin.addTransaction(tx15);
    const tx16 = new Transaction(othersAddress,myAddress,10,currentTimestamp);
    tx16.signTransaction(myKey);
    binhcoin.addTransaction(tx16);

    // const tx13 = new Transaction(myAddress,othersAddress,10);
    // tx13.signTransaction(myKey);
    // binhcoin.addTransaction(tx13);
    // binhcoin.minePendingTransactions(minerAdress);

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
            res.send("Your reward Address does not exist").end();
        }
        else{
            if(binhcoin.minePendingTransactions(rewardAddress)){
                res.send("New block is mined").end();
                broadcastMinedNewBlock();
            }else{
                res.send("No block wasn't mined").end();
            }
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
        console.log(binhcoin.getPendingTransactions().filter(x=>x.timestamp>ts).map(x=>x.timestamp) + "ts:" +ts);//get latest time after timestamp query
        res.send({
            returnTimestamp: Math.round(new Date().getTime()/1000),
            totalPendingTransactions: binhcoin.getPendingTransactions().length,
            pendingTransactions: binhcoin.getPendingTransactions().filter(x=>x.timestamp>ts)

        });
    })
    app.post('/transactions',(req,res)=>{
        const publicKey = req.body.publicKey;
        const privateKey  = req.body.privateKey;
        const toAddress  = req.body.toAddress;
        const amount  = +req.body.amount;
        const key = ec.keyFromPrivate(privateKey);
        if(publicKey != key.getPublic('hex')){
            res.send("Use matched PrivateKEY");
        }else if(!wallets.isValidPrivateKey(privateKey)){
            res.send("Your Private Key does not exist");
        }else if(!wallets.isValidAddress(toAddress)){
            res.send("Your Receiver Address does not exist");
        }else{
            const newTx = new Transaction(publicKey,toAddress,amount,Math.round(new Date().getTime()/1000));
            newTx.signTransaction(key);
            res.send(binhcoin.addTransaction(newTx));
            broadCastNewTransaction();
        }
       
        // if(publicKey==key.getPublic('hex') && wallets.isValidPrivateKey(privateKey) && wallets.isValidAddress(toAddress)){
            // const newTx = new Transaction(publicKey,toAddress,amount,Math.round(new Date().getTime()/1000));
            // newTx.signTransaction(key);
            // res.send(binhcoin.addTransaction(newTx));
        // }else{
        //     res.send({ error: "Something Wrong like: Your private Key, your Received address is not exist!"})
        // }
    })

    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + `http://localhost:${myHttpPort}`);
    });
};

const initP2PServer = (p2pPort) => {
    const server = new WebSocket.Server({ port: p2pPort });
    server.on('connection', (ws) => {

        nodes.push(ws);


        ws.on('message', (data) => {
            try {
                const message = JSONToObject(data);
                if (message === null) {
                    console.log('could not parse received JSON message: ' + data);
                    return;
                }
                console.log('Received message: %s', JSON.stringify(message));
                switch (message.type) {
                    case MessageType.QUERY_LATEST:
                        write(ws, responseLatestMsg());
                        break;
                    case MessageType.QUERY_ALL:
                        write(ws, responseChainMsg());
                        break;
                    case MessageType.RESPONSE_BLOCKCHAIN:
                        const receivedBlocks = JSONToObject(message.data);
                        if (receivedBlocks === null) {
                            console.log('invalid blocks received: %s', JSON.stringify(message.data));
                            break;
                        }
                        handleBlockchainResponse(receivedBlocks);
                        break;
                    case MessageType.QUERY_PENDING_TRANSACTIONS:
                        //console.log("OKE??testing");
                        write(ws, responsePendingTransactionsMsg());
                        break;
                    case MessageType.RESPONSE_PENDING_TRANSACTIONS:
                        const receivedTransactions = JSONToObject(message.data);
                        if (receivedTransactions === null) {
                            console.log('invalid transaction received: %s', JSON.stringify(message.data));
                            break;
                        }
                        receivedTransactions.forEach((transaction) => {
                            try {
                                binhcoin.handleReceivedTransaction(transaction);
                                // if no error is thrown, transaction was indeed added to the pool
                                // let's broadcast transaction pool
                                broadCastPendingTransactions();
                            }
                            catch (e) {
                                console.log(e.message);
                            }
                        });
                        break;
                }
            }
            catch (e) {
                console.log(e);
            }
        });


        const closeConnection = (myWs) => {
            console.log('connection failed to peer: ' + myWs.url);
            nodes.splice(nodes.indexOf(myWs), 1);
        };
        ws.on('close', () => closeConnection(ws));
        ws.on('error', () => closeConnection(ws));
    });
    console.log('listening websocket p2p port on: ' + `http://localhost:${p2pPort}`);
};

const JSONToObject = (data) => {
    try {
        return JSON.parse(data);
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

const write = (ws, message) => ws.send(JSON.stringify(message));
const broadcast = (message) => nodes.forEach((node) => write(node, message));
const queryChainLengthMsg = () => ({ 'type': MessageType.QUERY_LATEST, 'data': null });
const queryAllMsg = () => ({ 'type': MessageType.QUERY_ALL, 'data': null });
const responseChainMsg = () => ({
    'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(binhcoin.getBlockChain())
});
const responseLatestMsg = () => ({
    'type': MessageType.RESPONSE_BLOCKCHAIN,
    'data': JSON.stringify([binhcoin.getLatestBlock()])
});
const queryPendingTransactionsMsg = 
() => ({
    'type': MessageType.QUERY_PENDING_TRANSACTIONS,
    'data': null
});
const responsePendingTransactionsMsg = () => ({
    'type': MessageType.RESPONSE_PENDING_TRANSACTIONS,
    'data': JSON.stringify(binhcoin.getPendingTransactions())
});

const handleBlockchainResponse = (receivedBlocks) => {
    if (receivedBlocks.length === 0) {
        console.log('received block chain size of 0');
        return;
    }
    const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    // if (!binhcoin.isValidBlockStructure(latestBlockReceived)) {
    //     console.log('block structuture not valid');
    //     return;
    // }
    const latestBlockHeld = binhcoin.getLatestBlock();
    if (latestBlockReceived.index > latestBlockHeld.index) {
        console.log('blockchain possibly behind. We got: '
            + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
        if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
            if (binhcoin.addBlockToChain(latestBlockReceived)) {
                broadcast(responseLatestMsg());
            }
        }
        else if (receivedBlocks.length === 1) {
            console.log('We have to query the chain from our peer');
            broadcast(queryAllMsg());
        }
        else {
            console.log('Received blockchain is longer than current blockchain');
            binhcoin.replaceChain(receivedBlocks);
            broadcastLatest();
        }
    }
    else {
        console.log('received blockchain is not longer than received blockchain. Do nothing');
    }
};
const broadcastLatest = () => {
    broadcast(responseLatestMsg());
};
const broadCastPendingTransactions = () => {
    broadcast(responsePendingTransactionsMsg());
};
const broadcastMinedNewBlock = () =>{
    broadcast({
        'type': MessageType.RESPONSE_BLOCKCHAIN,
        'data': "New Block is mined",
    })
}
const broadCastNewTransaction =() =>{
    broadcast({
        'type': MessageType.RESPONSE_BLOCKCHAIN,
        'data': "Added Transactions",
    })
}


exports.initP2PServer = initP2PServer;
exports.broadcastLatest = broadcastLatest;
exports.broadCastPendingTransactions = broadCastPendingTransactions;





initVirtualBlockChainData();
initHttpServer(httpPort);
initP2PServer(p2pPort);