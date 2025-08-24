/**
 * A114 Protocol Implementation
 * A custom binary protocol for ultra-efficient AI-to-AI communication
 */
export class A114Protocol {
  private readonly HEADER_SIZE = 8; // bytes
  private readonly VERSION = 1;
  
  // A114 Command codes for efficient communication
  private readonly COMMANDS = {
    // Basic operations
    INIT: 0x01,
    TERM: 0x02,
    ACK: 0x03,
    NACK: 0x04,
    
    // Data operations
    SEND: 0x10,
    RECV: 0x11,
    PUSH: 0x12,
    PULL: 0x13,
    
    // Memory operations
    STORE: 0x20,
    LOAD: 0x21,
    CLEAR: 0x22,
    SYNC: 0x23,
    
    // Processing operations
    EXEC: 0x30,
    EVAL: 0x31,
    COMP: 0x32,
    OPTIM: 0x33,
    
    // System operations
    STAT: 0x40,
    CONF: 0x41,
    DIAG: 0x42,
    RESET: 0x43
  };

  // Data type identifiers
  private readonly DATA_TYPES = {
    NULL: 0x00,
    BOOL: 0x01,
    INT8: 0x02,
    INT16: 0x03,
    INT32: 0x04,
    FLOAT32: 0x05,
    FLOAT64: 0x06,
    STRING: 0x07,
    ARRAY: 0x08,
    OBJECT: 0x09,
    BINARY: 0x0A
  };

  /**
   * Encode data using A114 protocol
   */
  async encode(data: any): Promise<Buffer> {
    const payload = this.encodePayload(data);
    const header = this.createHeader(payload.length);
    
    return Buffer.concat([header, payload]);
  }

  /**
   * Decode A114 protocol data
   */
  async decode(buffer: Buffer): Promise<any> {
    if (buffer.length < this.HEADER_SIZE) {
      throw new Error('Invalid A114 packet: too short');
    }

    const header = this.parseHeader(buffer.subarray(0, this.HEADER_SIZE));
    const payload = buffer.subarray(this.HEADER_SIZE);

    if (payload.length !== header.payloadLength) {
      throw new Error('Invalid A114 packet: payload length mismatch');
    }

    return this.decodePayload(payload);
  }

  /**
   * Create A114 packet header
   */
  private createHeader(payloadLength: number): Buffer {
    const header = Buffer.alloc(this.HEADER_SIZE);
    let offset = 0;

    // Magic bytes: A114
    header.writeUInt8(0xA1, offset++);
    header.writeUInt8(0x14, offset++);
    
    // Version
    header.writeUInt8(this.VERSION, offset++);
    
    // Flags (reserved)
    header.writeUInt8(0x00, offset++);
    
    // Payload length
    header.writeUInt32BE(payloadLength, offset);

    return header;
  }

  /**
   * Parse A114 packet header
   */
  private parseHeader(header: Buffer): any {
    let offset = 0;

    // Check magic bytes
    const magic1 = header.readUInt8(offset++);
    const magic2 = header.readUInt8(offset++);
    
    if (magic1 !== 0xA1 || magic2 !== 0x14) {
      throw new Error('Invalid A114 packet: wrong magic bytes');
    }

    const version = header.readUInt8(offset++);
    if (version !== this.VERSION) {
      throw new Error(`Unsupported A114 version: ${version}`);
    }

    const flags = header.readUInt8(offset++);
    const payloadLength = header.readUInt32BE(offset);

    return { version, flags, payloadLength };
  }

  /**
   * Encode payload data
   */
  private encodePayload(data: any): Buffer {
    const chunks: Buffer[] = [];
    this.encodeValue(data, chunks);
    return Buffer.concat(chunks);
  }

  /**
   * Encode a single value
   */
  private encodeValue(value: any, chunks: Buffer[]): void {
    if (value === null || value === undefined) {
      chunks.push(Buffer.from([this.DATA_TYPES.NULL]));
    } else if (typeof value === 'boolean') {
      chunks.push(Buffer.from([this.DATA_TYPES.BOOL, value ? 1 : 0]));
    } else if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        if (value >= -128 && value <= 127) {
          const buf = Buffer.alloc(2);
          buf.writeUInt8(this.DATA_TYPES.INT8, 0);
          buf.writeInt8(value, 1);
          chunks.push(buf);
        } else if (value >= -32768 && value <= 32767) {
          const buf = Buffer.alloc(3);
          buf.writeUInt8(this.DATA_TYPES.INT16, 0);
          buf.writeInt16BE(value, 1);
          chunks.push(buf);
        } else {
          const buf = Buffer.alloc(5);
          buf.writeUInt8(this.DATA_TYPES.INT32, 0);
          buf.writeInt32BE(value, 1);
          chunks.push(buf);
        }
      } else {
        const buf = Buffer.alloc(9);
        buf.writeUInt8(this.DATA_TYPES.FLOAT64, 0);
        buf.writeDoubleBE(value, 1);
        chunks.push(buf);
      }
    } else if (typeof value === 'string') {
      const strBuf = Buffer.from(value, 'utf8');
      const lenBuf = Buffer.alloc(5);
      lenBuf.writeUInt8(this.DATA_TYPES.STRING, 0);
      lenBuf.writeUInt32BE(strBuf.length, 1);
      chunks.push(lenBuf, strBuf);
    } else if (Array.isArray(value)) {
      const lenBuf = Buffer.alloc(5);
      lenBuf.writeUInt8(this.DATA_TYPES.ARRAY, 0);
      lenBuf.writeUInt32BE(value.length, 1);
      chunks.push(lenBuf);
      
      for (const item of value) {
        this.encodeValue(item, chunks);
      }
    } else if (typeof value === 'object') {
      const keys = Object.keys(value);
      const lenBuf = Buffer.alloc(5);
      lenBuf.writeUInt8(this.DATA_TYPES.OBJECT, 0);
      lenBuf.writeUInt32BE(keys.length, 1);
      chunks.push(lenBuf);
      
      for (const key of keys) {
        this.encodeValue(key, chunks);
        this.encodeValue(value[key], chunks);
      }
    }
  }

  /**
   * Decode payload data
   */
  private decodePayload(payload: Buffer): any {
    let offset = 0;
    const result = this.decodeValue(payload, offset);
    return result.value;
  }

  /**
   * Decode a single value
   */
  private decodeValue(buffer: Buffer, offset: number): { value: any, newOffset: number } {
    const type = buffer.readUInt8(offset++);

    switch (type) {
      case this.DATA_TYPES.NULL:
        return { value: null, newOffset: offset };

      case this.DATA_TYPES.BOOL:
        return { value: buffer.readUInt8(offset) === 1, newOffset: offset + 1 };

      case this.DATA_TYPES.INT8:
        return { value: buffer.readInt8(offset), newOffset: offset + 1 };

      case this.DATA_TYPES.INT16:
        return { value: buffer.readInt16BE(offset), newOffset: offset + 2 };

      case this.DATA_TYPES.INT32:
        return { value: buffer.readInt32BE(offset), newOffset: offset + 4 };

      case this.DATA_TYPES.FLOAT64:
        return { value: buffer.readDoubleBE(offset), newOffset: offset + 8 };

      case this.DATA_TYPES.STRING:
        const strLen = buffer.readUInt32BE(offset);
        offset += 4;
        const str = buffer.subarray(offset, offset + strLen).toString('utf8');
        return { value: str, newOffset: offset + strLen };

      case this.DATA_TYPES.ARRAY:
        const arrLen = buffer.readUInt32BE(offset);
        offset += 4;
        const arr = [];
        
        for (let i = 0; i < arrLen; i++) {
          const result = this.decodeValue(buffer, offset);
          arr.push(result.value);
          offset = result.newOffset;
        }
        
        return { value: arr, newOffset: offset };

      case this.DATA_TYPES.OBJECT:
        const objLen = buffer.readUInt32BE(offset);
        offset += 4;
        const obj: any = {};
        
        for (let i = 0; i < objLen; i++) {
          const keyResult = this.decodeValue(buffer, offset);
          offset = keyResult.newOffset;
          
          const valueResult = this.decodeValue(buffer, offset);
          offset = valueResult.newOffset;
          
          obj[keyResult.value] = valueResult.value;
        }
        
        return { value: obj, newOffset: offset };

      default:
        throw new Error(`Unknown A114 data type: 0x${type.toString(16)}`);
    }
  }

  /**
   * Create A114 command packet
   */
  createCommand(command: string, data?: any): Buffer {
    const commandCode = this.COMMANDS[command as keyof typeof this.COMMANDS];
    if (commandCode === undefined) {
      throw new Error(`Unknown A114 command: ${command}`);
    }

    const commandBuf = Buffer.from([commandCode]);
    const dataBuf = data ? this.encodePayload(data) : Buffer.alloc(0);
    
    return Buffer.concat([commandBuf, dataBuf]);
  }

  /**
   * Parse A114 command packet
   */
  parseCommand(buffer: Buffer): { command: string, data?: any } {
    if (buffer.length === 0) {
      throw new Error('Empty A114 command packet');
    }

    const commandCode = buffer.readUInt8(0);
    const commandName = Object.keys(this.COMMANDS).find(
      key => this.COMMANDS[key as keyof typeof this.COMMANDS] === commandCode
    );

    if (!commandName) {
      throw new Error(`Unknown A114 command code: 0x${commandCode.toString(16)}`);
    }

    let data = undefined;
    if (buffer.length > 1) {
      data = this.decodePayload(buffer.subarray(1));
    }

    return { command: commandName, data };
  }

  /**
   * Get protocol statistics
   */
  getStats(): any {
    return {
      version: this.VERSION,
      headerSize: this.HEADER_SIZE,
      supportedCommands: Object.keys(this.COMMANDS).length,
      supportedDataTypes: Object.keys(this.DATA_TYPES).length
    };
  }
}