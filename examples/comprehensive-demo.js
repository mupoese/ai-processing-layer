"use strict";
/**
 * Comprehensive example demonstrating the AI Processing Layer
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.demonstrateAIProcessingLayer = demonstrateAIProcessingLayer;
const index_1 = require("../src/index");
async function demonstrateAIProcessingLayer() {
    console.log('🤖 AI Processing Layer Demo');
    console.log('============================\n');
    // Create the processing layer
    const processingLayer = (0, index_1.createAIProcessingLayer)();
    console.log('✅ Processing layer created');
    // Create AI agents with different capabilities
    const reasoningAgent = (0, index_1.createAIAgent)('reasoning-ai', 'Reasoning AI', ['logical-reasoning', 'problem-solving', 'decision-making']);
    const dataAgent = (0, index_1.createAIAgent)('data-ai', 'Data Analysis AI', ['data-analysis', 'statistical-computation', 'pattern-recognition']);
    const languageAgent = (0, index_1.createAIAgent)('language-ai', 'Language Processing AI', ['natural-language-processing', 'text-generation', 'translation']);
    // Register agents
    processingLayer.registerAgent(reasoningAgent);
    processingLayer.registerAgent(dataAgent);
    processingLayer.registerAgent(languageAgent);
    console.log('✅ 3 AI agents registered\n');
    // Example 1: Basic optimized communication
    console.log('📨 Example 1: Basic Optimized Communication');
    console.log('--------------------------------------------');
    const basicMessage = {
        id: 'msg_001',
        timestamp: Date.now(),
        senderId: 'reasoning-ai',
        receiverId: 'data-ai',
        content: {
            instruction: 'Please analyze the provided dataset using machine learning algorithms and provide statistical insights',
            data: [
                { user: 'john', age: 25, score: 85 },
                { user: 'jane', age: 30, score: 92 },
                { user: 'bob', age: 35, score: 78 },
                { user: 'alice', age: 28, score: 96 }
            ],
            parameters: {
                algorithm: 'neural_network',
                optimization: 'gradient_descent',
                validation: 'cross_validation'
            }
        },
        messageType: index_1.MessageType.INSTRUCTION,
        priority: index_1.Priority.HIGH,
        compressed: false,
        encoding: index_1.EncodingType.JSON
    };
    console.log('Original message size:', JSON.stringify(basicMessage).length, 'bytes');
    const success1 = await processingLayer.sendMessage(basicMessage);
    console.log('Message sent successfully:', success1);
    // Recall the message
    const recalled1 = await processingLayer.recallMessage('msg_001', 'data-ai');
    console.log('Message recalled successfully:', recalled1 !== null);
    console.log('');
    // Example 2: A114 Protocol demonstration
    console.log('🔧 Example 2: A114 Protocol Demonstration');
    console.log('------------------------------------------');
    const a114Protocol = new index_1.A114Protocol();
    const complexData = {
        models: ['gpt-4', 'claude-3', 'gemini-pro'],
        parameters: {
            temperature: 0.7,
            max_tokens: 2048,
            top_p: 0.9,
            frequency_penalty: 0.1
        },
        conversation_history: [
            { role: 'user', content: 'Explain quantum computing' },
            { role: 'assistant', content: 'Quantum computing is a revolutionary approach...' }
        ],
        metadata: {
            timestamp: Date.now(),
            session_id: 'sess_123',
            user_preferences: {
                language: 'english',
                style: 'technical',
                verbosity: 'detailed'
            }
        }
    };
    const originalSize = JSON.stringify(complexData).length;
    const encoded = await a114Protocol.encode(complexData);
    const decoded = await a114Protocol.decode(encoded);
    console.log('Original data size:', originalSize, 'bytes');
    console.log('A114 encoded size:', encoded.length, 'bytes');
    console.log('Compression ratio:', (encoded.length / originalSize).toFixed(2));
    console.log('Data integrity preserved:', JSON.stringify(complexData) === JSON.stringify(decoded));
    console.log('');
    // Example 3: Token optimization
    console.log('⚡ Example 3: Token Optimization');
    console.log('--------------------------------');
    const optimizer = new index_1.TokenOptimizer();
    const verboseText = `
    The artificial intelligence system should execute machine learning algorithms 
    to process natural language and perform deep learning neural network operations 
    for computer vision tasks while maintaining optimal performance parameters and 
    configuration settings throughout the entire processing pipeline execution.
  `;
    const compressed = optimizer.compress(verboseText.trim());
    const decompressed = optimizer.decompress(compressed);
    console.log('Original text length:', verboseText.trim().length, 'characters');
    console.log('Compressed text length:', compressed.length, 'characters');
    console.log('Compression ratio:', (compressed.length / verboseText.trim().length).toFixed(2));
    console.log('Original:', verboseText.trim());
    console.log('Compressed:', compressed);
    console.log('Decompressed matches:', decompressed.includes('artificial intelligence'));
    console.log('');
    // Example 4: Multi-agent collaboration with memory
    console.log('🤝 Example 4: Multi-Agent Collaboration');
    console.log('---------------------------------------');
    // Language AI asks Data AI for analysis
    const analysisRequest = {
        id: 'msg_002',
        timestamp: Date.now(),
        senderId: 'language-ai',
        receiverId: 'data-ai',
        content: {
            task: 'sentiment_analysis',
            text_samples: [
                'I love this new AI system!',
                'This is frustrating and slow.',
                'Amazing results, very impressed.',
                'Could be better, but acceptable.'
            ],
            required_output: 'statistical_summary'
        },
        messageType: index_1.MessageType.QUERY,
        priority: index_1.Priority.NORMAL,
        compressed: false,
        encoding: index_1.EncodingType.COMPRESSED_JSON
    };
    await processingLayer.sendMessage(analysisRequest);
    // Data AI responds to Language AI
    const analysisResponse = {
        id: 'msg_003',
        timestamp: Date.now(),
        senderId: 'data-ai',
        receiverId: 'language-ai',
        content: {
            sentiment_scores: [0.9, -0.6, 0.85, 0.2],
            summary: {
                positive: 2,
                negative: 1,
                neutral: 1,
                average_sentiment: 0.3375
            },
            confidence: 0.92
        },
        messageType: index_1.MessageType.RESPONSE,
        priority: index_1.Priority.NORMAL,
        compressed: false,
        encoding: index_1.EncodingType.A114
    };
    await processingLayer.sendMessage(analysisResponse);
    // Reasoning AI requests both results for decision making
    const decisionRequest = {
        id: 'msg_004',
        timestamp: Date.now(),
        senderId: 'reasoning-ai',
        receiverId: 'language-ai',
        content: {
            request: 'Please provide the sentiment analysis results for decision making process',
            context: 'user_feedback_evaluation'
        },
        messageType: index_1.MessageType.DATA_TRANSFER,
        priority: index_1.Priority.HIGH,
        compressed: false,
        encoding: index_1.EncodingType.JSON
    };
    await processingLayer.sendMessage(decisionRequest);
    console.log('Multi-agent collaboration messages sent successfully');
    console.log('');
    // Example 5: Memory and cache management
    console.log('💾 Example 5: Memory and Cache Management');
    console.log('------------------------------------------');
    // Recall all messages
    const recalledAnalysisRequest = await processingLayer.recallMessage('msg_002', 'data-ai');
    const recalledAnalysisResponse = await processingLayer.recallMessage('msg_003', 'language-ai');
    const recalledDecisionRequest = await processingLayer.recallMessage('msg_004', 'language-ai');
    console.log('Analysis request recalled:', recalledAnalysisRequest !== null);
    console.log('Analysis response recalled:', recalledAnalysisResponse !== null);
    console.log('Decision request recalled:', recalledDecisionRequest !== null);
    console.log('');
    // Example 6: System statistics and performance
    console.log('📊 Example 6: System Statistics');
    console.log('--------------------------------');
    const stats = processingLayer.getStats();
    console.log('Processing Layer Statistics:');
    console.log('- Registered agents:', stats.registeredAgents);
    console.log('- Cache hit rate:', (stats.cacheStats.hitRate * 100).toFixed(1) + '%');
    console.log('- Cache size:', stats.cacheStats.size);
    console.log('- Total cache hits:', stats.cacheStats.hits);
    console.log('- Total cache misses:', stats.cacheStats.misses);
    console.log('');
    // Example 7: A114 Commands
    console.log('🔌 Example 7: A114 Command System');
    console.log('----------------------------------');
    const commandData = { target: 'memory', action: 'optimize' };
    const command = a114Protocol.createCommand('OPTIM', commandData);
    const parsedCommand = a114Protocol.parseCommand(command);
    console.log('Command created and parsed successfully');
    console.log('Command:', parsedCommand.command);
    console.log('Data:', parsedCommand.data);
    console.log('');
    console.log('🎉 Demo completed successfully!');
    console.log('================================');
    console.log('The AI Processing Layer demonstrated:');
    console.log('✅ Token-optimized communication');
    console.log('✅ A114 binary protocol efficiency');
    console.log('✅ Advanced text compression');
    console.log('✅ Multi-agent collaboration');
    console.log('✅ Memory and cache management');
    console.log('✅ Performance monitoring');
    console.log('✅ Command protocol system');
}
// Run the demonstration
if (require.main === module) {
    demonstrateAIProcessingLayer().catch(console.error);
}
//# sourceMappingURL=comprehensive-demo.js.map