var SHA256 = require("crypto-js/sha256");
class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.createHash()
    }
    createHash(){
        return SHA256(this.index+JSON.stringify(this.data)+this.timestamp+this.previousHash).toString()
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.genesisBlock()]
    }
    genesisBlock(){
        return new Block(0,'08/10/23','Genesis Block','previousHash')
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(block){
        let latestBlock = this.getLatestBlock()
        block.previousHash = latestBlock.hash
        block.hash = block.createHash()
        this.chain.push(block)
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            let currentBlock = this.chain[i]
            let previousBlock = this.chain[i-1]
            if(currentBlock.hash !== currentBlock.createHash()) {
                console.log('Yooooooooo')
                console.log(currentBlock.hash,'  ......  ',currentBlock.createHash())
                return false
            }
            if(currentBlock.previousHash !== previousBlock.hash) return false
        }
        return true
    }
}
const arslanCoin = new Blockchain()
arslanCoin.addBlock(new Block(1,'08/10/23',{data:"This is the data"}))
arslanCoin.addBlock(new Block(2,'09/10/23',{data:"This is the data"}))
arslanCoin.addBlock(new Block(3,'10/10/23',{data:"This is the data"}))
arslanCoin.addBlock(new Block(4,'08/10/23',{data:"This is modified"}))

console.log(JSON.stringify(arslanCoin))
console.log(arslanCoin.isChainValid())

// arslanCoin.chain[3].data = 'modified data'
console.log(arslanCoin.isChainValid())
