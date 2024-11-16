const LoggerV2 = require('../index');

const fs = require('fs');

jest.mock('readline');
jest.mock('fs');

const readline = require('readline');

describe('LoggerV2', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('logs data with correct options', () => {
    const spy = jest.spyOn(console, 'dir');
    const data = { key: 'value' };

    LoggerV2.log(data, { depth: 2, colors: true });

    expect(spy).toHaveBeenCalledWith(data, { depth: 2, colors: true });
    spy.mockRestore();
  });

  test('pause resolves with "skip" when user inputs "s"', async () => {
    readline.createInterface.mockReturnValue({
      question: (message, cb) => cb('s'),
      close: jest.fn(),
    });

    const result = await LoggerV2.pause('Test Message');
    expect(result).toBe('skip');
  });

  test('pause rejects with an error when user inputs "q"', async () => {
    readline.createInterface.mockReturnValue({
      question: (message, cb) => cb('q'),
      close: jest.fn(),
    });

    await expect(LoggerV2.pause('Test Message')).rejects.toThrow('User quit the process.');
  });

  test('pause resolves with "json_saved" and writes to file when user inputs "j"', async () => {
    readline.createInterface.mockReturnValue({
      question: (message, cb) => cb('j'),
      close: jest.fn(),
    });

    const data = { id: 1, name: 'Test' };
    const spy = jest.spyOn(fs, 'writeFileSync');

    const result = await LoggerV2.pause('Test Message', data);
    expect(result).toBe('json_saved');
    expect(spy).toHaveBeenCalledWith(
      expect.stringMatching(/log-output-\d+\.json/),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  });

  test('pause resolves with no action when user presses Enter', async () => {
    readline.createInterface.mockReturnValue({
      question: (message, cb) => cb(''),
      close: jest.fn(),
    });

    const result = await LoggerV2.pause('Test Message');
    expect(result).toBeUndefined();
  });
});