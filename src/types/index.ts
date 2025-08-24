/**
 * Core types for the AI Processing Layer
 */

export interface AIMessage {
  id: string;
  timestamp: number;
  senderId: string;
  receiverId: string;
  content: any;
  messageType: MessageType;
  priority: Priority;
  compressed: boolean;
  encoding: EncodingType;
}

export interface CompactMessage {
  i: string; // id
  t: number; // timestamp
  s: string; // senderId
  r: string; // receiverId
  c: any;    // content
  mt: number; // messageType (numeric)
  p: number;  // priority (numeric)
  cp: boolean; // compressed
  e: number;  // encoding (numeric)
}

export enum MessageType {
  INSTRUCTION = 0,
  QUERY = 1,
  RESPONSE = 2,
  DATA_TRANSFER = 3,
  SYSTEM_COMMAND = 4,
  MEMORY_SYNC = 5,
  A114_PROTOCOL = 6
}

export enum Priority {
  LOW = 0,
  NORMAL = 1,
  HIGH = 2,
  CRITICAL = 3
}

export enum EncodingType {
  JSON = 0,
  BINARY = 1,
  A114 = 2,
  COMPRESSED_JSON = 3
}

export interface ProcessingStep {
  step: number;
  name: string;
  description: string;
  status: StepStatus;
  result?: any;
  error?: string;
}

export enum StepStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface OptimizationContext {
  intention: string;      // Step 1: Intentie = Doel
  action: string;         // Step 2: Actie = Plan
  reaction?: any;         // Step 3: Reactie = Uitvoering
  outcomes?: any[];       // Step 4: Multiple Outcomes
  testResults?: any[];    // Step 5: Test
  feedback?: string;      // Step 6: Feedback
  correction?: string;    // Step 7: Correctie
  validation?: boolean;   // Step 8: Validatie
  learning?: string;      // Step 9: Leren
  repeat?: boolean;       // Step 10: Herhalen
  finalOutcome?: any;     // Step 11: Uitkomst
}

export interface CacheEntry {
  key: string;
  value: any;
  timestamp: number;
  ttl: number;
  accessCount: number;
  priority: Priority;
}

export interface MemorySnapshot {
  id: string;
  timestamp: number;
  context: string;
  data: any;
  importance: number;
}

export interface AIAgent {
  id: string;
  name: string;
  capabilities: string[];
  memoryContext: Map<string, any>;
  lastActive: number;
}