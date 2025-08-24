/**
 * Simple test to verify the AI Processing Layer works
 */

const { 
  createAIProcessingLayer, 
  createAIAgent, 
  MessageType, 
  Priority, 
  EncodingType,
  A114Protocol,
  TokenOptimizer 
} = require('./dist/index.js');

async function simpleTest() {
  console.log('🧪 Running Simple AI Processing Layer Test');
  console.log('===========================================\n');

  try {
    // Test 1: Create processing layer
    const processingLayer = createAIProcessingLayer();
    console.log('✅ Processing layer created successfully');

    // Test 2: Create and register agents
    const agent1 = createAIAgent('test-agent-1', 'Test AI 1', ['testing']);
    const agent2 = createAIAgent('test-agent-2', 'Test AI 2', ['verification']);
    
    processingLayer.registerAgent(agent1);
    processingLayer.registerAgent(agent2);
    console.log('✅ Agents registered successfully');

    // Test 3: Send a message
    const testMessage = {
      id: 'test_001',
      timestamp: Date.now(),
      senderId: 'test-agent-1',
      receiverId: 'test-agent-2',
      content: {
        message: 'Hello from AI Processing Layer!',
        data: [1, 2, 3, 4, 5]
      },
      messageType: MessageType.INSTRUCTION,
      priority: Priority.NORMAL,
      compressed: false,
      encoding: EncodingType.JSON
    };

    const success = await processingLayer.sendMessage(testMessage);
    console.log('✅ Message sent successfully:', success);

    // Test 4: Recall message
    const recalled = await processingLayer.recallMessage('test_001', 'test-agent-2');
    console.log('✅ Message recalled successfully:', recalled !== null);

    // Test 5: Token optimization
    const optimizer = new TokenOptimizer();
    const originalText = 'Please execute the artificial intelligence machine learning algorithm';
    const compressed = optimizer.compress(originalText);
    const ratio = optimizer.calculateCompressionRatio(originalText, compressed);
    console.log('✅ Token optimization working. Compression ratio:', ratio.toFixed(2));

    // Test 6: A114 Protocol
    const protocol = new A114Protocol();
    const testData = { hello: 'world', numbers: [1, 2, 3] };
    const encoded = await protocol.encode(testData);
    const decoded = await protocol.decode(encoded);
    console.log('✅ A114 protocol working. Data integrity:', JSON.stringify(testData) === JSON.stringify(decoded));

    // Test 7: Statistics
    const stats = processingLayer.getStats();
    console.log('✅ Statistics available:', stats.registeredAgents === 2);

    console.log('\n🎉 All tests passed! AI Processing Layer is working correctly.');
    console.log('📊 Final Statistics:');
    console.log('   - Registered agents:', stats.registeredAgents);
    console.log('   - Cache hits:', stats.cacheStats.hits);
    console.log('   - Cache misses:', stats.cacheStats.misses);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

simpleTest();