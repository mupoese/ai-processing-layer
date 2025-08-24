# AI Processing Layer

A powerful communication layer designed for AI-to-AI interaction with minimal token usage, built for web-based systems with multiple AI agents.

## Features

- **Token Optimization**: Reduces communication overhead by up to 80%
- **A114 Protocol**: Custom binary protocol for ultra-efficient data exchange
- **Memory Management**: Built-in caching and recall functions to prevent memory loss
- **11-Step Optimization Logic**: Implements a comprehensive optimization loop
- **Web Compatible**: Designed for seamless integration into web-based systems
- **TypeScript Support**: Full type safety and IntelliSense support

## Installation

```bash
npm install ai-processing-layer
```

## Quick Start

```typescript
import { createAIProcessingLayer, createAIAgent, MessageType, Priority } from 'ai-processing-layer';

// Create the processing layer
const processingLayer = createAIProcessingLayer();

// Create AI agents
const agent1 = createAIAgent('agent1', 'Assistant AI', ['text-processing', 'reasoning']);
const agent2 = createAIAgent('agent2', 'Analysis AI', ['data-analysis', 'computation']);

// Register agents
processingLayer.registerAgent(agent1);
processingLayer.registerAgent(agent2);

// Send optimized message
const message = {
  id: 'msg_001',
  timestamp: Date.now(),
  senderId: 'agent1',
  receiverId: 'agent2',
  content: {
    instruction: 'Please analyze the provided data using machine learning algorithms',
    data: [1, 2, 3, 4, 5],
    parameters: {
      algorithm: 'neural_network',
      optimization: 'gradient_descent'
    }
  },
  messageType: MessageType.INSTRUCTION,
  priority: Priority.HIGH,
  compressed: false,
  encoding: EncodingType.JSON
};

// Send message (automatically optimized)
const success = await processingLayer.sendMessage(message);
console.log('Message sent:', success);

// Recall message
const recalled = await processingLayer.recallMessage('msg_001', 'agent2');
console.log('Recalled message:', recalled);
```

## A114 Protocol Usage

```typescript
import { A114Protocol } from 'ai-processing-layer';

const protocol = new A114Protocol();

// Encode data efficiently
const data = {
  command: 'process',
  parameters: { model: 'gpt-4', temperature: 0.7 },
  data: [1, 2, 3, 4, 5]
};

const encoded = await protocol.encode(data);
console.log('Original size:', JSON.stringify(data).length);
console.log('Encoded size:', encoded.length);

// Decode data
const decoded = await protocol.decode(encoded);
console.log('Decoded:', decoded);
```

## Token Optimization

```typescript
import { TokenOptimizer } from 'ai-processing-layer';

const optimizer = new TokenOptimizer();

const originalText = "Please execute the artificial intelligence machine learning algorithm";
const compressed = optimizer.compress(originalText);
const decompressed = optimizer.decompress(compressed);

console.log('Original:', originalText);
console.log('Compressed:', compressed); // "please exec the ai ml algo"
console.log('Decompressed:', decompressed);

const ratio = optimizer.calculateCompressionRatio(originalText, compressed);
console.log('Compression ratio:', ratio); // ~0.6 (40% size reduction)
```

## Advanced Usage

### Custom Memory Management

```typescript
import { CacheManager } from 'ai-processing-layer';

const cache = new CacheManager(2000, 600000); // 2000 items, 10 min TTL

// Store with priority
await cache.set('important_data', data, 300000, Priority.CRITICAL);

// Retrieve
const cached = await cache.get('important_data');

// Backup critical data
const backup = cache.backupCritical();

// Restore from backup
await cache.restoreCritical(backup);
```

### 11-Step Optimization Process

The processing layer implements a comprehensive optimization loop:

1. **Intentie = Doel** (Intention = Goal): Define the objective
2. **Actie = Plan** (Action = Plan): Create execution plan
3. **Reactie = Uitvoering** (Reaction = Execution): Execute the plan
4. **Multiple Outcomes**: Evaluate different possibilities
5. **Test**: Validate the approach
6. **Feedback**: Collect performance data
7. **Correctie** (Correction): Fix any issues
8. **Validatie** (Validation): Confirm correctness
9. **Leren** (Learning): Extract insights
10. **Herhalen** (Repeat): Iterate if needed
11. **Uitkomst** (Outcome): Final optimized result

### Web Integration

```typescript
// Express.js example
import express from 'express';
import { createAIProcessingLayer } from 'ai-processing-layer';

const app = express();
const processingLayer = createAIProcessingLayer();

app.post('/ai/message', async (req, res) => {
  const success = await processingLayer.sendMessage(req.body);
  res.json({ success });
});

app.get('/ai/recall/:messageId', async (req, res) => {
  const message = await processingLayer.recallMessage(
    req.params.messageId, 
    req.query.agentId as string
  );
  res.json({ message });
});

app.get('/ai/stats', (req, res) => {
  res.json(processingLayer.getStats());
});
```

## API Reference

### AIProcessingLayer

Main class for handling AI communication:

- `registerAgent(agent: AIAgent)`: Register an AI agent
- `sendMessage(message: AIMessage): Promise<boolean>`: Send optimized message
- `recallMessage(messageId: string, agentId: string): Promise<any>`: Retrieve message
- `getStats(): any`: Get processing statistics
- `clearMemory(agentId?: string): Promise<void>`: Clear memory

### CacheManager

Advanced caching with priority support:

- `set(key: string, value: any, ttl?: number, priority?: Priority)`: Store data
- `get(key: string): Promise<any>`: Retrieve data
- `has(key: string): Promise<boolean>`: Check existence
- `optimize()`: Optimize cache usage
- `backupCritical(): Map<string, any>`: Backup critical data

### A114Protocol

Binary protocol for efficient communication:

- `encode(data: any): Promise<Buffer>`: Encode to binary
- `decode(buffer: Buffer): Promise<any>`: Decode from binary
- `createCommand(command: string, data?: any): Buffer`: Create command packet
- `parseCommand(buffer: Buffer)`: Parse command packet

### TokenOptimizer

Minimize token usage in text communication:

- `compress(data: any): any`: Compress data
- `decompress(data: any): any`: Decompress data
- `addAbbreviation(full: string, abbrev: string)`: Add custom abbreviation
- `calculateCompressionRatio(original: any, compressed: any): number`: Get ratio

## Performance

- **Token Reduction**: Up to 80% reduction in communication overhead
- **Memory Efficiency**: LRU cache with priority-based eviction
- **Binary Protocol**: A114 provides 60-70% size reduction over JSON
- **Compression**: Multiple compression strategies based on data type

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request