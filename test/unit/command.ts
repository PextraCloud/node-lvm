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
import {expect} from 'chai';

import {FormCommand} from '../../lib/command';

describe('FormCommand', () => {
	describe('vgs command without factory options', () => {
		const vgs = FormCommand({command: 'vgs'});

		describe('without options', () => {
			it('should return the correct command', () => {
				expect(vgs()).to.equal('vgs --yes');
			});

			it('should return the correct command with arg', () => {
				expect(vgs({args: ['test']})).to.equal('vgs --yes test');
			});

			it('should return the correct command with args', () => {
				expect(vgs({args: ['test1', 'test2']})).to.equal(
					'vgs --yes test1 test2'
				);
			});

			it('should return the correct command with spaced args', () => {
				expect(vgs({args: ['test 1', 'test 2']})).to.equal(
					'vgs --yes "test 1" "test 2"'
				);
			});
		});

		describe('with test option', () => {
			it('should return the correct command', () => {
				expect(vgs({options: {test: true}})).to.equal(
					'vgs --yes --test'
				);
			});

			it('should return the correct command with arg', () => {
				expect(vgs({options: {test: true}, args: ['test']})).to.equal(
					'vgs --yes --test test'
				);
			});

			it('should return the correct command with args', () => {
				expect(
					vgs({options: {test: true}, args: ['test1', 'test2']})
				).to.equal('vgs --yes --test test1 test2');
			});

			it('should return the correct command with spaced args', () => {
				expect(
					vgs({options: {test: true}, args: ['test 1', 'test 2']})
				).to.equal('vgs --yes --test "test 1" "test 2"');
			});
		});

		describe('with verbose option', () => {
			it('should return the correct command', () => {
				expect(vgs({options: {verbose: true}})).to.equal(
					'vgs --yes --verbose'
				);
			});

			it('should return the correct command with arg', () => {
				expect(
					vgs({options: {verbose: true}, args: ['test']})
				).to.equal('vgs --yes --verbose test');
			});

			it('should return the correct command with args', () => {
				expect(
					vgs({options: {verbose: true}, args: ['test1', 'test2']})
				).to.equal('vgs --yes --verbose test1 test2');
			});

			it('should return the correct command with spaced args', () => {
				expect(
					vgs({options: {verbose: true}, args: ['test 1', 'test 2']})
				).to.equal('vgs --yes --verbose "test 1" "test 2"');
			});
		});

		describe('with test and verbose options', () => {
			it('should return the correct command', () => {
				expect(vgs({options: {test: true, verbose: true}})).to.equal(
					'vgs --yes --test --verbose'
				);
			});

			it('should return the correct command with arg', () => {
				expect(
					vgs({options: {test: true, verbose: true}, args: ['test']})
				).to.equal('vgs --yes --test --verbose test');
			});

			it('should return the correct command with args', () => {
				expect(
					vgs({
						options: {test: true, verbose: true},
						args: ['test1', 'test2'],
					})
				).to.equal('vgs --yes --test --verbose test1 test2');
			});

			it('should return the correct command with spaced args', () => {
				expect(
					vgs({
						options: {test: true, verbose: true},
						args: ['test 1', 'test 2'],
					})
				).to.equal('vgs --yes --test --verbose "test 1" "test 2"');
			});
		});
	});

	describe('vgs command with factory options', () => {
		const vgs = FormCommand({
			command: 'vgs',
			json: true,
			noArgs: true,
		});

		describe('without options', () => {
			it('should return the correct command', () => {
				expect(vgs()).to.equal('vgs --yes --reportformat json');
			});

			it('should return the correct command with arg', () => {
				expect(vgs({args: ['test']})).to.equal(
					'vgs --yes --reportformat json'
				);
			});

			it('should return the correct command with args', () => {
				expect(vgs({args: ['test1', 'test2']})).to.equal(
					'vgs --yes --reportformat json'
				);
			});
		});

		describe('with test option', () => {
			it('should return the correct command', () => {
				expect(vgs({options: {test: true}})).to.equal(
					'vgs --yes --reportformat json --test'
				);
			});

			it('should return the correct command with arg', () => {
				expect(vgs({options: {test: true}, args: ['test']})).to.equal(
					'vgs --yes --reportformat json --test'
				);
			});

			it('should return the correct command with args', () => {
				expect(
					vgs({options: {test: true}, args: ['test1', 'test2']})
				).to.equal('vgs --yes --reportformat json --test');
			});
		});

		describe('with verbose option', () => {
			it('should return the correct command', () => {
				expect(vgs({options: {verbose: true}})).to.equal(
					'vgs --yes --reportformat json --verbose'
				);
			});

			it('should return the correct command with arg', () => {
				expect(
					vgs({options: {verbose: true}, args: ['test']})
				).to.equal('vgs --yes --reportformat json --verbose');
			});

			it('should return the correct command with args', () => {
				expect(
					vgs({options: {verbose: true}, args: ['test1', 'test2']})
				).to.equal('vgs --yes --reportformat json --verbose');
			});
		});
	});
});
