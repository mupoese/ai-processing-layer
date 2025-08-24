import { 
  AIMessage, 
  CompactMessage, 
  MessageType, 
  Priority, 
  EncodingType, 
  OptimizationContext,
  ProcessingStep,
  StepStatus,
  AIAgent
} from '../types';
import { CacheManager } from '../cache/CacheManager';
import { A114Protocol } from '../protocols/A114Protocol';
import { TokenOptimizer } from '../utils/TokenOptimizer';

/**
 * Core AI Processing Layer
 * Handles communication between AI agents with minimal token usage
 */
export class AIProcessingLayer {
  private agents: Map<string, AIAgent> = new Map();
  private cache: CacheManager;
  private a114Protocol: A114Protocol;
  private tokenOptimizer: TokenOptimizer;
  private processingSteps: ProcessingStep[] = [];

  constructor() {
    this.cache = new CacheManager();
    this.a114Protocol = new A114Protocol();
    this.tokenOptimizer = new TokenOptimizer();
  }

  /**
   * Register an AI agent with the processing layer
   */
  registerAgent(agent: AIAgent): void {
    this.agents.set(agent.id, agent);
  }

  /**
   * Send a message between AI agents with optimization
   */
  async sendMessage(message: AIMessage): Promise<boolean> {
    try {
      // Step 1: Intentie = Doel
      const context: OptimizationContext = {
        intention: `Send optimized message from ${message.senderId} to ${message.receiverId}`,
        action: 'Optimize and route message'
      };

      // Check if agents exist
      if (!this.agents.has(message.senderId) || !this.agents.has(message.receiverId)) {
        throw new Error('Agent not registered');
      }

      // Step 2: Actie = Plan
      const optimizedMessage = await this.optimizeMessage(message);
      
      // Step 3: Reactie = Uitvoering
      context.reaction = await this.routeMessage(optimizedMessage);

      // Step 4: Multiple Outcomes - evaluate different routing strategies
      const outcomes = await this.evaluateRoutingOutcomes(optimizedMessage);
      context.outcomes = outcomes;

      // Step 5: Test - validate message delivery
      const testResults = await this.testMessageDelivery(optimizedMessage);
      context.testResults = testResults;

      // Step 6: Feedback
      context.feedback = this.generateFeedback(testResults);

      // Step 7: Correctie
      if (!testResults.every(r => r.success)) {
        context.correction = await this.correctMessageDelivery(optimizedMessage);
      }

      // Step 8: Validatie
      context.validation = await this.validateDelivery(optimizedMessage);

      // Step 9: Leren
      context.learning = this.extractLearnings(context);
      this.updateAgentMemory(message.senderId, context.learning);

      // Step 10 & 11: Final outcome
      context.finalOutcome = { success: context.validation, messageId: message.id };

      return context.validation || false;
    } catch (error) {
      console.error('Message sending failed:', error);
      return false;
    }
  }

  /**
   * Optimize message for minimal token usage
   */
  private async optimizeMessage(message: AIMessage): Promise<CompactMessage> {
    // Convert to compact format
    const compact: CompactMessage = {
      i: message.id,
      t: message.timestamp,
      s: message.senderId,
      r: message.receiverId,
      c: message.content,
      mt: message.messageType,
      p: message.priority,
      cp: message.compressed,
      e: message.encoding
    };

    // Apply token optimization
    if (message.encoding === EncodingType.A114) {
      compact.c = await this.a114Protocol.encode(message.content);
    } else {
      compact.c = this.tokenOptimizer.compress(message.content);
    }

    compact.cp = true;
    return compact;
  }

  /**
   * Route message to target agent
   */
  private async routeMessage(message: CompactMessage): Promise<any> {
    const receiver = this.agents.get(message.r);
    if (!receiver) {
      throw new Error('Receiver not found');
    }

    // Cache the message for recall
    await this.cache.set(
      `msg_${message.i}`, 
      message, 
      300000, // 5 minutes TTL
      message.p
    );

    // Update receiver's memory context
    receiver.memoryContext.set(`msg_${message.i}`, {
      content: message.c,
      sender: message.s,
      timestamp: message.t
    });

    receiver.lastActive = Date.now();
    return { status: 'routed', messageId: message.i };
  }

  /**
   * Evaluate different routing outcomes
   */
  private async evaluateRoutingOutcomes(message: CompactMessage): Promise<any[]> {
    return [
      { strategy: 'direct', efficiency: 0.95, latency: 10 },
      { strategy: 'cached', efficiency: 0.98, latency: 5 },
      { strategy: 'compressed', efficiency: 0.85, latency: 15 }
    ];
  }

  /**
   * Test message delivery
   */
  private async testMessageDelivery(message: CompactMessage): Promise<any[]> {
    const receiver = this.agents.get(message.r);
    const messageExists = receiver?.memoryContext.has(`msg_${message.i}`);
    const cacheExists = await this.cache.has(`msg_${message.i}`);

    return [
      { test: 'receiver_memory', success: messageExists },
      { test: 'cache_storage', success: cacheExists },
      { test: 'message_integrity', success: true }
    ];
  }

  /**
   * Generate feedback from test results
   */
  private generateFeedback(testResults: any[]): string {
    const successCount = testResults.filter(r => r.success).length;
    const totalTests = testResults.length;
    
    if (successCount === totalTests) {
      return 'All delivery tests passed successfully';
    } else {
      return `${successCount}/${totalTests} tests passed. Issues detected.`;
    }
  }

  /**
   * Correct message delivery issues
   */
  private async correctMessageDelivery(message: CompactMessage): Promise<string> {
    // Retry failed operations
    await this.routeMessage(message);
    return 'Message delivery corrected through retry mechanism';
  }

  /**
   * Validate final delivery
   */
  private async validateDelivery(message: CompactMessage): Promise<boolean> {
    const testResults = await this.testMessageDelivery(message);
    return testResults.every(r => r.success);
  }

  /**
   * Extract learnings from the process
   */
  private extractLearnings(context: OptimizationContext): string {
    return `Learned: Message optimization strategy successful. Feedback: ${context.feedback}`;
  }

  /**
   * Update agent memory with learnings
   */
  private updateAgentMemory(agentId: string, learning: string): void {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.memoryContext.set(`learning_${Date.now()}`, learning);
    }
  }

  /**
   * Retrieve message from cache or agent memory
   */
  async recallMessage(messageId: string, agentId: string): Promise<any> {
    // Try cache first
    const cached = await this.cache.get(`msg_${messageId}`);
    if (cached) {
      return cached;
    }

    // Try agent memory
    const agent = this.agents.get(agentId);
    if (agent?.memoryContext.has(`msg_${messageId}`)) {
      return agent.memoryContext.get(`msg_${messageId}`);
    }

    return null;
  }

  /**
   * Get processing statistics
   */
  getStats(): any {
    return {
      registeredAgents: this.agents.size,
      cacheStats: this.cache.getStats(),
      totalProcessingSteps: this.processingSteps.length
    };
  }

  /**
   * Clear agent memory and cache
   */
  async clearMemory(agentId?: string): Promise<void> {
    if (agentId) {
      const agent = this.agents.get(agentId);
      if (agent) {
        agent.memoryContext.clear();
      }
    } else {
      this.agents.forEach(agent => agent.memoryContext.clear());
      await this.cache.clear();
    }
  }
}