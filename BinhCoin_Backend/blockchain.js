const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
//const util = require('./util')
class Transaction {
    constructor(fromAddress,toAddress,amount,timestamp){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = timestamp;
    }
    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress +this.amount +this.timestamp).toString();
    }
    signTransaction(signingKey){
        if(signingKey === null)return this.signature = "system";
        if(signingKey.getPublic('hex') != this.fromAddress){
            return 'You cannot sign transaction with another wallets!';
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx,'base64');
        this.signature  = sig.toDER('hex');
    }
    isValidTransaction(){
        if(this.fromAddress  === null){
            return true
        };
        if(!this.signature || this.signature.length ===0){
            return 'No signature in this transaction';
        }
        const publicKey  = ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.calculateHash(),this.signature);
    }
    ///MYcoding fixing
    // isValidTransaction(){
    //     if(!this.signature || this.signature.length ===0){
    //         return 'No signature in this transaction');
    //     }
    //     const publicKey  = ec.keyFromPublic(this.fromAddress,'hex');
    //     return publicKey.verify(this.calculateHash(),this.signature);
    // }
}
class Block{
    constructor(index,timestamp, transactions, previousHash, difficulty, nonce, hash)
    {
        this.index = index;
        this.timestamp = timestamp
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.difficulty = difficulty;
        this.nonce = nonce;
        this.hash = hash;
    }
    
    // mineBlock(){
    //     while(this.hash.substring(0,this.difficulty)!= Array(this.difficulty+1).join("0")){
    //         this.nonce ++;
    //         this.hash = this.calculateHash();
    //     }
    //     console.log("block mined " + this.hash);
    // }
    hasValidTransactions(){
        for (const tx of this.transactions) {
            if(!tx.isValidTransaction()){
                return false;
            }
        }
        return true;
    }
}
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        //this.difficulty = 2;
        // in seconds_10minutes in BTC
        this.BLOCK_GENERATION_INTERVAL = 5;
        // in blocks_2016blocks in BTC
        this.DIFFICULTY_ADJUSTMENT_INTERVAL = 5;  
        this.pendingTransactions = [];
        this.miningReward  = 100;
    }
    createGenesisBlock(){
        return new Block(0,Date.parse('2021-05-05')/1000, [],'0',0,0,'genesisHash');
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    //chain[5], index =5
    // }0 1 2 3 4 5
    //(6)
    getDifficulty = () => {
        const latestBlock = this.getLatestBlock();
        if ((latestBlock.index) % this.DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
            return this.getAdjustedDifficulty();
        }
        else {
            return latestBlock.difficulty;
        }
    };
    getCurrentTimestamp = () => Math.round(new Date().getTime()/1000);
    getAdjustedDifficulty = () => {
        const prevAdjustmentBlock = this.chain[this.chain.length - this.DIFFICULTY_ADJUSTMENT_INTERVAL];//chain[1]
        const timeExpected = this.BLOCK_GENERATION_INTERVAL * this.DIFFICULTY_ADJUSTMENT_INTERVAL;//25s
        const timeTaken = this.getLatestBlock().timestamp - prevAdjustmentBlock.timestamp;//chain[5]
        console.log("============================");
        console.log("index change",this.chain.length);
        console.log("timeExpected:",timeExpected);
        console.log("timetaken:",timeTaken);
        console.log("this.DIFFICULTY_ADJUSTMENT_INTERVAL:",this.DIFFICULTY_ADJUSTMENT_INTERVAL);
        console.log("this.chain.length - this.DIFFICULTY_ADJUSTMENT_INTERVAL:",this.chain.length - this.DIFFICULTY_ADJUSTMENT_INTERVAL);

        console.log("previous index adjustmendblock difficulty:",prevAdjustmentBlock.difficulty);
        
        console.log("if else:",timeTaken < (timeExpected / 2));

        
        if (timeTaken < (timeExpected / 2)) {
            console.log("next difficulty:",prevAdjustmentBlock.difficulty+1);
            console.log("============================");

            return prevAdjustmentBlock.difficulty + 1;
        }
        else if (timeTaken > (timeExpected * 2)) {
            console.log("next difficulty:",prevAdjustmentBlock.difficulty-1);
            console.log("============================");

            return prevAdjustmentBlock.difficulty - 1;
        }
        else {
            console.log("next difficulty:",prevAdjustmentBlock.difficulty);
            console.log("============================");

            return prevAdjustmentBlock.difficulty;
        }

    };
    minePendingTransactions(miningRewardAdress){
        console.log('Miner is mining');
        let latestBlock = this.getLatestBlock();
        let index = latestBlock.index + 1;
        let difficulty = this.getDifficulty();
        let timestamp = this.getCurrentTimestamp();
        const miningRewardTx = new Transaction(null,miningRewardAdress,this.miningReward,Math.round(new Date().getTime()/1000));
        miningRewardTx.signTransaction(null);
        this.pendingTransactions.push(miningRewardTx);
        //difficulty changing?
        //let nextBlock = new Block(index,timestamp,this.pendingTransactions, this.getLatestBlock().hash,difficulty);
        //console.log(`index:${index}+latestblock${latestBlock.hash}+${timestamp}+${this.pendingTransactions}+${difficulty}`)
        let newBlock = this.findBlock(index,latestBlock.hash,timestamp,this.pendingTransactions,difficulty);
        if (this.addBlockToChain(newBlock)) {
            //p2p_1.broadcastLatest();
            console.log("broadcast others node here@@");
        }
        
        
    }
    calculateHash = (index,previousHash,timestamp,transactions,nonce,difficulty)=>{
        return SHA256(index+previousHash+timestamp+JSON.stringify(transactions)+nonce+difficulty).toString();
    }
    findBlock = (index, previousHash, timestamp, transactions, difficulty) => {
        let nonce = 0;
        while (true) {
            let hash = this.calculateHash(index,previousHash,timestamp,transactions,nonce,difficulty);
            // if (hash.substring(0,difficulty)== Array(difficulty+1).join("0")) {
            //     return new Block(index,timestamp,transactions,previousHash,difficulty,nonce, hash);
            // }
            if(this.hashMatchesDifficulty(hash,difficulty)){
                return new Block(index,timestamp,transactions,previousHash,difficulty,nonce,hash);
            };
            nonce++;
        }
    };
    hashMatchesDifficulty = (hash,difficulty) =>{
        const requiredPrefix  = Array(difficulty+1).join("0");
        const falsePrefix = Array(difficulty+2).join("0");
        if(hash.startsWith(requiredPrefix)&&(!hash.startsWith(falsePrefix))){
            return true;
        }
        return false;
    }
    // hashMatchesDifficulty = (hash, difficulty) => {
    //     const hashInBinary = util.hexToBinary(hash);
    //     const requiredPrefix = '0'.repeat(difficulty);
    //     return hashInBinary.startsWith(requiredPrefix);
    // };
    // isValidBlockStructure = (block) => {
    //     return typeof block.index === 'number'
    //         && typeof block.hash === 'string'
    //         && typeof block.previousHash === 'string'
    //         && typeof block.timestamp === 'number'
    //         && typeof block.data === 'object';
    // };
    // isValidTimestamp = (newBlock, previousBlock) => {
    //     return (previousBlock.timestamp - 60 < newBlock.timestamp)
    //         && newBlock.timestamp - 60 < this.getCurrentTimestamp();
    // };
    hasValidHash = (block) => {
        if (!this.hashMatchesDifficulty(block.hash,block.difficulty)) {
            console.log('block difficulty not satisfied. Expected: ' + block.difficulty + 'got: ' + block.hash);
            return false;
        }
        else{return true;}
    };
    isValidNewBlock = (newBlock, previousBlock) => {
        // if (!this.isValidBlockStructure(newBlock)) {
        //     console.log('invalid block structure: %s', JSON.stringify(newBlock));
        //     return false;
        // }
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log('invalid index');
            return false;
        }
        else if (previousBlock.hash !== newBlock.previousHash) {
            console.log('invalid previoushash');
            return false;
        }
        // else if (!this.isValidTimestamp(newBlock, previousBlock)) {
        //     console.log('invalid timestamp');
        //     return false;
        // }
        else if (!this.hasValidHash(newBlock)) {
            return false;
        }
        return true;
    };
    addBlockToChain = (newBlock) => {
        
        if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
            if (!newBlock.hasValidTransactions()) {
                console.log('block is not valid in terms of transactions');
                return false;
            }
            else {
                this.chain.push(newBlock);
                this.pendingTransactions = [
                    //new Transaction(null,miningRewardAdress,this.miningReward)
                ];
                return true;
            }
        }
        return false;
    };
    
    //MYcoding fixing
    addTransaction(transaction){
        if(transaction.fromAddress  === null)//mining reward from our blockchain coin system
        {
            if(transaction.amount==0){
                return 'Amount must be greater than 0';
            }
            if(!transaction.toAddress){
                return 'Transaction must be have from and to address';
            }
            
            if(!transaction.isValidTransaction()){
                return 'Cannot add invalid transaction to block';
            }
            this.pendingTransactions.push(transaction);
        }else{
            if(transaction.amount==0){
                return 'Amount must be greater than 0';
            }
            if(!transaction.fromAddress || !transaction.toAddress){
                return 'Transaction must be have from and to address';
            }
            if(this.getBalanceOfAddress(transaction.fromAddress)<transaction.amount){
                return "You don't have enougn money to make its transaction!!!!!";
            }
            
            
            if(!transaction.isValidTransaction()){
                return 'Cannot add invalid transaction to block';
            }

            this.pendingTransactions.push(transaction);
        }
        
    }
    getBalanceOfAddress(address){
        let balance = 0;
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if(transaction.fromAddress  === address){
                    balance -= transaction.amount;
                }
                if(transaction.toAddress === address){
                    balance += transaction.amount;
                }
            }
        }
        for (const transaction of this.pendingTransactions) {
            if(transaction.fromAddress  === address){
                balance -= transaction.amount;
            }
            if(transaction.toAddress === address){
                balance += transaction.amount;
            }
        }
        return balance;
    }
    isChainValid(){
        for(let i = 1; i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(!currentBlock.hasValidTransactions()){
                return false;
            }
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }
    getBlockChain(){
        return this.chain;
    }
    getAllTransactions(){
        const transactions = this.chain.map(txs=>txs.transactions).reduce((txArr,ele)=>txArr.concat(ele));
        return transactions.concat(this.pendingTransactions);
    }
    getBlockPendingTransactions(){
        return this.pendingTransactions;
    }
    getSendingTransactionsOfAddress(address){
        let sendingTransactions =[];
        const transactions = this.chain.map(txs=>txs.transactions).reduce((txArr,ele)=>txArr.concat(ele));
        for (const trans of transactions) {
            if(trans.fromAddress === address)
            {
                sendingTransactions.push(trans);
            }
        }
        return sendingTransactions;
    }
    getReceivingTransactionsOfAddress(address){
        let receivingTransactions =[];
        const transactions = this.chain.map(txs=>txs.transactions).reduce((txArr,ele)=>txArr.concat(ele));
        for (const trans of transactions) {
            if(trans.toAddress === address)
            {
                receivingTransactions.push(trans);
            }
        }
        return receivingTransactions;
    }
}

class Wallets{
    constructor(){
        this.walletArray = [];
    }
    generateKeyPair(){
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');
        this.walletArray.push(publicKey);
        return JSON.stringify({
            publicKey: publicKey,
            privateKey: privateKey
        })
    }
    //publicKey == address
    isValidPrivateKey(inputPrivateKey){
        const key = ec.keyFromPrivate(inputPrivateKey);
        const address = key.getPublic('hex');
        if(this.isValidAddress(address)){
            return true;
        }
        console.log("This wallet isn't created");
        return false;
    }
    isValidAddress(address){
        return this.walletArray.includes(address);
    }
    addAddress(address){
        if(!this.isValidAddress(address)){
            this.walletArray.push(address)
        }else{
            console.log("This wallet is existing");
        }
    }
}
module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;
module.exports.Block = Block;
module.exports.Wallets = Wallets;