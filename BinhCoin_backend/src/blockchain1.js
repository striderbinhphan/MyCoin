const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
class Transaction {
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress +this.amount).toString();
    }
    signTransaction(signingKey){
        if(signingKey === null)return this.signature = "system";
        if(signingKey.getPublic('hex') != this.fromAddress){
            throw new Error('You cannot sign transaction with another wallets!');
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
            throw new Error('No signature in this transaction');
        }
        const publicKey  = ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.calculateHash(),this.signature);
    }
    ///MYcoding fixing
    // isValidTransaction(){
    //     if(!this.signature || this.signature.length ===0){
    //         throw new Error('No signature in this transaction');
    //     }
    //     const publicKey  = ec.keyFromPublic(this.fromAddress,'hex');
    //     return publicKey.verify(this.calculateHash(),this.signature);
    // }
}
class Block{
    constructor( timestamp,transactions,previousHash = '')
    {
        this.timestamp  =timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.previousHash + this.timestamp +JSON.stringify(this.transactions) + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!= Array(difficulty+1).join("0")){
            this.nonce ++;
            this.hash = this.calculateHash();
        }
        console.log("block mined " + this.hash);
    }
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
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward  = 100;
    }
    createGenesisBlock(){
        return new Block(Date.parse('2017-01-01'), [], '0');
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }
    minePendingTransactions(miningRewardAdress){
        const miningRewardTx = new Transaction(null,miningRewardAdress,this.miningReward);
        miningRewardTx.signTransaction(null);
        this.pendingTransactions.push(miningRewardTx);
        let block = new Block(Date.now(),this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        console.log("Block is mined",block.hash);
        this.chain.push(block);
        this.pendingTransactions = [
            //new Transaction(null,miningRewardAdress,this.miningReward)
        ];
    }
    // addTransaction(transaction){
    //     if(!transaction.fromAddress || !transaction.toAddress){
    //         throw  new Error('Transaction must be have from and to address');
    //     }
    //     if(!transaction.isValidTransaction()){
    //         throw new Error('Cannot add invalid transaction to block');
    //     }
    //     if(this.getBalanceOfAddress(transaction.fromAddress)<transaction.amount){
    //         throw new Error("You don't have enougn money to make its transaction!!!!!");
    //     }
        
        
        
    //     if (transaction.amount <= 0) {
    //         throw new Error('Transaction amount should be higher than 0');
    //       }
    //     this.pendingTransactions.push(transaction);
        
    // }
    //MYcoding fixing
    addTransaction(transaction){
        if(transaction.fromAddress  === null)//mining reward from our blockchain coin system
        {
            if(!transaction.toAddress){
                throw  new Error('Transaction must be have from and to address');
            }
            
            if(!transaction.isValidTransaction()){
                throw new Error('Cannot add invalid transaction to block');
            }
            this.pendingTransactions.push(transaction);
        }else{
            if(!transaction.fromAddress || !transaction.toAddress){
                throw  new Error('Transaction must be have from and to address');
            }
            if(this.getBalanceOfAddress(transaction.fromAddress)<transaction.amount){
                throw new Error("You don't have enougn money to make its transaction!!!!!");
            }
            
            
            if(!transaction.isValidTransaction()){
                throw new Error('Cannot add invalid transaction to block');
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
}
module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;
