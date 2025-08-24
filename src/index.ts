/**
 * AI Processing Layer - Main Entry Point
 * A communication layer for AI-to-AI interaction with minimal token usage
 */

// Core exports
export { AIProcessingLayer } from './core/AIProcessingLayer';
export { CacheManager } from './cache/CacheManager';
export { A114Protocol } from './protocols/A114Protocol';
export { TokenOptimizer } from './utils/TokenOptimizer';

// Type exports
export * from './types';

// Import for internal use
import { AIProcessingLayer } from './core/AIProcessingLayer';
import { CacheManager } from './cache/CacheManager';
import { A114Protocol } from './protocols/A114Protocol';
import { TokenOptimizer } from './utils/TokenOptimizer';

// Factory function for quick setup
export function createAIProcessingLayer() {
  return new AIProcessingLayer();
}

// Utility function to create a basic AI agent
export function createAIAgent(id: string, name: string, capabilities: string[] = []) {
  return {
    id,
    name,
    capabilities,
    memoryContext: new Map<string, any>(),
    lastActive: Date.now()
  };
}

// Default export
export default {
  AIProcessingLayer,
  CacheManager,
  A114Protocol,
  TokenOptimizer,
  createAIProcessingLayer,
  createAIAgent
};