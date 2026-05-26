/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  stack?: string;
}

type LogListener = (entry: LogEntry) => void;

class LoggerService {
  private listeners: Set<LogListener> = new Set();
  private logs: LogEntry[] = [];
  private maxLogs = 200;

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private createEntry(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): LogEntry {
    return {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      stack: error?.stack,
    };
  }

  private emit(entry: LogEntry) {
    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    
    // Console log with style
    const colors = {
      debug: 'color: #718096; font-weight: bold;',
      info: 'color: #3182ce; font-weight: bold;',
      warn: 'color: #dd6b20; font-weight: bold;',
      error: 'color: #e53e3e; font-weight: bold;'
    };
    
    console.log(
      `%c[${entry.timestamp}] [${entry.level.toUpperCase()}] %c${entry.message}`,
      colors[entry.level],
      'color: inherit',
      entry.context ? entry.context : ''
    );

    this.listeners.forEach(listener => {
      try {
        listener(entry);
      } catch (e) {
        console.error('Error in logger listener', e);
      }
    });
  }

  public subscribe(listener: LogListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public clear() {
    this.logs = [];
    this.emit(this.createEntry('info', 'Журнал логов очищен'));
  }

  public debug(message: string, context?: Record<string, any>) {
    this.emit(this.createEntry('debug', message, context));
  }

  public info(message: string, context?: Record<string, any>) {
    this.emit(this.createEntry('info', message, context));
  }

  public warn(message: string, context?: Record<string, any>) {
    this.emit(this.createEntry('warn', message, context));
  }

  public error(message: string, error?: Error | any, context?: Record<string, any>) {
    const errObj = error instanceof Error ? error : new Error(String(error));
    this.emit(this.createEntry('error', message, context, errObj));
  }
}

export const logger = new LoggerService();
