/*
 Copyright (c) 2023 Pextra Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {exec} from 'child_process';
import {
	CommandFactoryOptions,
	CommandFactoryCallbackOptions,
} from './types/command';

/**
 * Forms an LVM command string.
 */
const FormCommand = (factoryOptions: CommandFactoryOptions) => {
	// Add --yes to all commands to avoid interactive prompts.
	let commandString = `${factoryOptions.command} --yes`;

	if (factoryOptions.json) {
		commandString += ' --reportformat json';
	}

	return (data?: CommandFactoryCallbackOptions) => {
		let newCommandString = commandString;

		if (data && data.options) {
			if (data.options.test) {
				newCommandString += ' --test';
			}
			if (data.options.verbose) {
				newCommandString += ' --verbose';
			}
		}

		if (!factoryOptions.noArgs && data && data.args) {
			newCommandString += ` ${data.args
				.map(arg => {
					return arg.includes(' ') ? `"${arg}"` : arg;
				})
				.join(' ')}`;
		}

		return newCommandString;
	};
};

/**
 * Executes a command and returns a Promise.
 */
const ExecuteCommand = <T>(
	command: string,
	parseJson = true,
	validator?: () => boolean | Error
) => {
	return new Promise<{
		stdout: string;
		stderr: string;
		data: T;
	}>((resolve, reject) => {
		if (validator) {
			try {
				validator();
			} catch (e) {
				return reject(e);
			}
		}

		exec(command, (err, stdout, stderr) => {
			if (err) {
				return reject(err);
			}

			let data;
			if (parseJson) {
				try {
					data = JSON.parse(stdout);
				} catch (e) {
					// TODO handle this better
					console.log('Error parsing JSON.');
					console.error(stdout);
				}

				if (data && data.report && data.report[0]) {
					data = data.report[0];

					const keys = Object.keys(data);
					if (keys.length === 1) {
						data = data[keys[0]];
					}
				}
			} else {
				data = stdout as T;
			}

			resolve({
				stdout,
				stderr,
				data,
			});
		});
	});
};

export {FormCommand, ExecuteCommand};
