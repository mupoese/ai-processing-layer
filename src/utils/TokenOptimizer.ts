import * as zlib from 'zlib';

/**
 * Token optimizer for minimizing communication overhead
 */
export class TokenOptimizer {
  private compressionThreshold = 100; // bytes
  private abbreviations: Map<string, string> = new Map();
  private reverseAbbreviations: Map<string, string> = new Map();

  constructor() {
    this.initializeAbbreviations();
  }

  /**
   * Initialize common abbreviations for AI communication
   */
  private initializeAbbreviations(): void {
    const commonTerms = {
      // AI/ML terms
      'artificial_intelligence': 'ai',
      'machine_learning': 'ml',
      'neural_network': 'nn',
      'deep_learning': 'dl',
      'natural_language_processing': 'nlp',
      'computer_vision': 'cv',
      'reinforcement_learning': 'rl',
      
      // Programming terms
      'function': 'fn',
      'variable': 'var',
      'object': 'obj',
      'array': 'arr',
      'string': 'str',
      'number': 'num',
      'boolean': 'bool',
      'undefined': 'undef',
      'null': 'nil',
      
      // Communication terms
      'message': 'msg',
      'request': 'req',
      'response': 'res',
      'error': 'err',
      'success': 'ok',
      'failed': 'fail',
      'processing': 'proc',
      'optimization': 'opt',
      'configuration': 'cfg',
      'parameter': 'param',
      'argument': 'arg',
      'result': 'res',
      'data': 'dat',
      'information': 'info',
      'content': 'cont',
      'context': 'ctx',
      'memory': 'mem',
      'cache': 'cch',
      'storage': 'stor',
      'timestamp': 'ts',
      'identifier': 'id',
      'priority': 'pri',
      'status': 'stat',
      'type': 'typ',
      'value': 'val',
      'key': 'k',
      'index': 'idx',
      'length': 'len',
      'size': 'sz',
      'count': 'cnt',
      'total': 'tot',
      'maximum': 'max',
      'minimum': 'min',
      'average': 'avg',
      'algorithm': 'algo',
      'protocol': 'proto',
      'interface': 'iface',
      'implementation': 'impl',
      'specification': 'spec',
      'documentation': 'doc',
      'reference': 'ref',
      'version': 'ver',
      'revision': 'rev',
      'iteration': 'iter',
      'execution': 'exec',
      'evaluation': 'eval',
      'validation': 'valid',
      'verification': 'verify',
      'initialization': 'init',
      'termination': 'term',
      'connection': 'conn',
      'session': 'sess',
      'transaction': 'txn',
      'operation': 'op',
      'instruction': 'instr',
      'command': 'cmd',
      'query': 'qry',
      'search': 'srch',
      'filter': 'flt',
      'sort': 'srt',
      'transform': 'xfrm',
      'convert': 'conv',
      'encode': 'enc',
      'decode': 'dec',
      'compress': 'comp',
      'decompress': 'decomp',
      'serialize': 'ser',
      'deserialize': 'deser'
    };

    for (const [full, abbrev] of Object.entries(commonTerms)) {
      this.abbreviations.set(full, abbrev);
      this.reverseAbbreviations.set(abbrev, full);
    }
  }

  /**
   * Compress data using multiple optimization techniques
   */
  compress(data: any): any {
    if (typeof data === 'string') {
      return this.compressString(data);
    } else if (typeof data === 'object') {
      return this.compressObject(data);
    } else if (Array.isArray(data)) {
      return this.compressArray(data);
    }
    
    return data;
  }

  /**
   * Decompress data
   */
  decompress(data: any): any {
    if (typeof data === 'string') {
      return this.decompressString(data);
    } else if (typeof data === 'object' && data !== null) {
      return this.decompressObject(data);
    } else if (Array.isArray(data)) {
      return this.decompressArray(data);
    }
    
    return data;
  }

  /**
   * Compress string using abbreviations and zlib
   */
  private compressString(text: string): string {
    let compressed = text.toLowerCase();
    
    // Apply abbreviations
    for (const [full, abbrev] of this.abbreviations.entries()) {
      const regex = new RegExp(`\\b${full}\\b`, 'gi');
      compressed = compressed.replace(regex, abbrev);
    }

    // Remove redundant whitespace
    compressed = compressed.replace(/\s+/g, ' ').trim();

    // Apply zlib compression if beneficial
    if (compressed.length > this.compressionThreshold) {
      try {
        const buffer = Buffer.from(compressed, 'utf8');
        const deflated = zlib.deflateSync(buffer, { level: 9 });
        
        if (deflated.length < compressed.length * 0.8) {
          return `__ZLIB__${deflated.toString('base64')}`;
        }
      } catch (error) {
        // Fall back to uncompressed version
      }
    }

    return compressed;
  }

  /**
   * Decompress string
   */
  private decompressString(text: string): string {
    let decompressed = text;

    // Handle zlib compression
    if (text.startsWith('__ZLIB__')) {
      try {
        const base64Data = text.slice(8);
        const buffer = Buffer.from(base64Data, 'base64');
        decompressed = zlib.inflateSync(buffer).toString('utf8');
      } catch (error) {
        return text; // Return original if decompression fails
      }
    }

    // Reverse abbreviations
    for (const [abbrev, full] of this.reverseAbbreviations.entries()) {
      const regex = new RegExp(`\\b${abbrev}\\b`, 'gi');
      decompressed = decompressed.replace(regex, full);
    }

    return decompressed;
  }

  /**
   * Compress object by optimizing keys and values
   */
  private compressObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    const compressed: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const compressedKey = this.compressKey(key);
      const compressedValue = this.compress(value);
      compressed[compressedKey] = compressedValue;
    }

    return compressed;
  }

  /**
   * Decompress object
   */
  private decompressObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    const decompressed: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const decompressedKey = this.decompressKey(key);
      const decompressedValue = this.decompress(value);
      decompressed[decompressedKey] = decompressedValue;
    }

    return decompressed;
  }

  /**
   * Compress array elements
   */
  private compressArray(arr: any[]): any[] {
    return arr.map(item => this.compress(item));
  }

  /**
   * Decompress array elements
   */
  private decompressArray(arr: any[]): any[] {
    return arr.map(item => this.decompress(item));
  }

  /**
   * Compress object keys
   */
  private compressKey(key: string): string {
    // Use abbreviations for common keys
    if (this.abbreviations.has(key)) {
      return this.abbreviations.get(key)!;
    }
    
    // Shorten common patterns
    let compressed = key
      .replace(/([a-z])([A-Z])/g, '$1_$2') // camelCase to snake_case
      .toLowerCase()
      .replace(/^get_/, 'g_')
      .replace(/^set_/, 's_')
      .replace(/^is_/, 'i_')
      .replace(/^has_/, 'h_')
      .replace(/_id$/, '_i')
      .replace(/_name$/, '_n')
      .replace(/_type$/, '_t')
      .replace(/_value$/, '_v')
      .replace(/_data$/, '_d')
      .replace(/_info$/, '_inf')
      .replace(/_config$/, '_cfg')
      .replace(/_result$/, '_res');

    return compressed;
  }

  /**
   * Decompress object keys
   */
  private decompressKey(key: string): string {
    // Reverse abbreviations
    if (this.reverseAbbreviations.has(key)) {
      return this.reverseAbbreviations.get(key)!;
    }

    // Reverse common patterns
    let decompressed = key
      .replace(/^g_/, 'get_')
      .replace(/^s_/, 'set_')
      .replace(/^i_/, 'is_')
      .replace(/^h_/, 'has_')
      .replace(/_i$/, '_id')
      .replace(/_n$/, '_name')
      .replace(/_t$/, '_type')
      .replace(/_v$/, '_value')
      .replace(/_d$/, '_data')
      .replace(/_inf$/, '_info')
      .replace(/_cfg$/, '_config')
      .replace(/_res$/, '_result');

    // Convert back to camelCase if needed
    decompressed = decompressed.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

    return decompressed;
  }

  /**
   * Calculate compression ratio
   */
  calculateCompressionRatio(original: any, compressed: any): number {
    const originalSize = JSON.stringify(original).length;
    const compressedSize = JSON.stringify(compressed).length;
    
    return compressedSize / originalSize;
  }

  /**
   * Get optimization statistics
   */
  getStats(): any {
    return {
      abbreviationCount: this.abbreviations.size,
      compressionThreshold: this.compressionThreshold,
      version: '1.0.0'
    };
  }

  /**
   * Add custom abbreviation
   */
  addAbbreviation(full: string, abbrev: string): void {
    this.abbreviations.set(full.toLowerCase(), abbrev.toLowerCase());
    this.reverseAbbreviations.set(abbrev.toLowerCase(), full.toLowerCase());
  }

  /**
   * Remove abbreviation
   */
  removeAbbreviation(full: string): void {
    const abbrev = this.abbreviations.get(full.toLowerCase());
    if (abbrev) {
      this.abbreviations.delete(full.toLowerCase());
      this.reverseAbbreviations.delete(abbrev);
    }
  }
}