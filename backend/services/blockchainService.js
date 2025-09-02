const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BlockchainService {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.miningReward = 100;
    this.difficulty = 2;
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesisBlock = new Block(0, Date.now(), [], '0');
    genesisBlock.hash = genesisBlock.calculateHash();
    this.chain.push(genesisBlock);
  }

  // Smart contract for project milestones
  async createMilestoneContract(projectId, milestones) {
    const contract = {
      id: this.generateId(),
      projectId,
      type: 'MILESTONE_CONTRACT',
      milestones: milestones.map(m => ({
        ...m,
        status: 'PENDING',
        completedAt: null,
        verifiedBy: null
      })),
      totalValue: milestones.reduce((sum, m) => sum + m.value, 0),
      createdAt: new Date(),
      status: 'ACTIVE'
    };

    await this.addTransaction({
      type: 'CREATE_CONTRACT',
      data: contract,
      timestamp: Date.now()
    });

    return contract;
  }

  // Complete milestone and trigger payment
  async completeMilestone(contractId, milestoneId, verificationData) {
    const contract = await this.getContract(contractId);
    if (!contract) throw new Error('Contract not found');

    const milestone = contract.milestones.find(m => m.id === milestoneId);
    if (!milestone) throw new Error('Milestone not found');

    // Verify milestone completion
    const verification = await this.verifyMilestone(milestone, verificationData);
    if (!verification.valid) throw new Error('Milestone verification failed');

    milestone.status = 'COMPLETED';
    milestone.completedAt = new Date();
    milestone.verifiedBy = verificationData.verifierId;

    // Trigger automatic payment
    await this.triggerPayment(contract, milestone);

    await this.addTransaction({
      type: 'COMPLETE_MILESTONE',
      data: { contractId, milestoneId, verification },
      timestamp: Date.now()
    });

    return { success: true, milestone, payment: milestone.value };
  }

  // Immutable compliance records
  async recordCompliance(projectId, complianceData) {
    const record = {
      id: this.generateId(),
      projectId,
      type: 'COMPLIANCE_RECORD',
      standard: complianceData.standard,
      checkDate: new Date(),
      inspector: complianceData.inspector,
      results: complianceData.results,
      documents: complianceData.documents,
      hash: this.hashData(complianceData)
    };

    await this.addTransaction({
      type: 'COMPLIANCE_RECORD',
      data: record,
      timestamp: Date.now()
    });

    return record;
  }

  // Decentralized project verification
  async verifyProject(projectId, verifiers) {
    const verificationProcess = {
      id: this.generateId(),
      projectId,
      verifiers: verifiers.map(v => ({
        id: v.id,
        role: v.role,
        status: 'PENDING',
        signature: null,
        timestamp: null
      })),
      requiredSignatures: Math.ceil(verifiers.length * 0.6), // 60% consensus
      status: 'IN_PROGRESS',
      createdAt: new Date()
    };

    await this.addTransaction({
      type: 'START_VERIFICATION',
      data: verificationProcess,
      timestamp: Date.now()
    });

    return verificationProcess;
  }

  // Add verifier signature
  async addVerifierSignature(verificationId, verifierId, signature, decision) {
    const verification = await this.getVerification(verificationId);
    if (!verification) throw new Error('Verification not found');

    const verifier = verification.verifiers.find(v => v.id === verifierId);
    if (!verifier) throw new Error('Verifier not found');

    verifier.status = decision ? 'APPROVED' : 'REJECTED';
    verifier.signature = signature;
    verifier.timestamp = new Date();

    // Check if consensus reached
    const approvals = verification.verifiers.filter(v => v.status === 'APPROVED').length;
    if (approvals >= verification.requiredSignatures) {
      verification.status = 'VERIFIED';
      await this.finalizeProjectVerification(verification);
    }

    await this.addTransaction({
      type: 'VERIFIER_SIGNATURE',
      data: { verificationId, verifierId, decision },
      timestamp: Date.now()
    });

    return verification;
  }

  // Cryptocurrency payment integration
  async processPayment(paymentData) {
    const payment = {
      id: this.generateId(),
      from: paymentData.from,
      to: paymentData.to,
      amount: paymentData.amount,
      currency: paymentData.currency || 'MYR',
      type: paymentData.type,
      projectId: paymentData.projectId,
      contractId: paymentData.contractId,
      status: 'PENDING',
      timestamp: Date.now()
    };

    // Simulate payment processing
    const processed = await this.executePayment(payment);
    
    await this.addTransaction({
      type: 'PAYMENT',
      data: processed,
      timestamp: Date.now()
    });

    return processed;
  }

  // Blockchain transaction methods
  async addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
    
    // Auto-mine if enough transactions
    if (this.pendingTransactions.length >= 5) {
      await this.minePendingTransactions();
    }
  }

  async minePendingTransactions() {
    const block = new Block(
      this.chain.length,
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [];

    return block;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  // Helper methods
  async verifyMilestone(milestone, verificationData) {
    // Simulate milestone verification
    const checks = [
      verificationData.photosProvided,
      verificationData.documentsComplete,
      verificationData.qualityApproved
    ];

    return {
      valid: checks.every(check => check === true),
      score: checks.filter(check => check).length / checks.length,
      details: verificationData
    };
  }

  async triggerPayment(contract, milestone) {
    return await this.processPayment({
      from: contract.clientId,
      to: contract.contractorId,
      amount: milestone.value,
      type: 'MILESTONE_PAYMENT',
      projectId: contract.projectId,
      contractId: contract.id
    });
  }

  async executePayment(payment) {
    // Simulate payment execution
    payment.status = 'COMPLETED';
    payment.transactionHash = this.generateHash();
    payment.processedAt = new Date();
    
    return payment;
  }

  async getContract(contractId) {
    // Search blockchain for contract
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.type === 'CREATE_CONTRACT' && transaction.data.id === contractId) {
          return transaction.data;
        }
      }
    }
    return null;
  }

  async getVerification(verificationId) {
    // Search blockchain for verification
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.type === 'START_VERIFICATION' && transaction.data.id === verificationId) {
          return transaction.data;
        }
      }
    }
    return null;
  }

  async finalizeProjectVerification(verification) {
    await prisma.project.update({
      where: { id: verification.projectId },
      data: { 
        verified: true,
        verificationHash: this.hashData(verification)
      }
    });
  }

  generateId() {
    return crypto.randomBytes(16).toString('hex');
  }

  generateHash() {
    return crypto.randomBytes(32).toString('hex');
  }

  hashData(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  // Get blockchain analytics
  getBlockchainStats() {
    const transactions = this.chain.reduce((total, block) => total + block.transactions.length, 0);
    const contracts = this.chain.reduce((count, block) => {
      return count + block.transactions.filter(t => t.type === 'CREATE_CONTRACT').length;
    }, 0);

    return {
      blocks: this.chain.length,
      transactions,
      contracts,
      isValid: this.isChainValid(),
      lastBlock: this.getLatestBlock().timestamp
    };
  }
}

// Block class for blockchain
class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto.createHash('sha256')
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
      .digest('hex');
  }

  mineBlock(difficulty) {
    const target = Array(difficulty + 1).join('0');
    
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

module.exports = new BlockchainService();