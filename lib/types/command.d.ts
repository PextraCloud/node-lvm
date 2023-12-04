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
export type LVMDisplayCommands = 'vgdisplay' | 'lvdisplay' | 'pvdisplay';
export type LVMSummaryCommands = 'vgs' | 'lvs' | 'pvs';
export type LVMCreateCommands = 'vgcreate' | 'lvcreate' | 'pvcreate';
export type LVMRemoveCommands = 'vgremove' | 'lvremove' | 'pvremove';
export type LVMExtendCommands = 'vgextend' | 'lvextend';
export type LVMReduceCommands = 'vgreduce' | 'lvreduce';
export type LVMRenameCommands = 'vgrename' | 'lvrename';
export type LVMResizeCommands = 'lvresize' | 'pvresize';
export type LVMCommand =
	| LVMDisplayCommands
	| LVMSummaryCommands
	| LVMCreateCommands
	| LVMRemoveCommands
	| LVMExtendCommands
	| LVMReduceCommands
	| LVMRenameCommands
	| LVMResizeCommands;

export type CommandFactoryOptions = {
	/**
	 * The LVM command to execute.
	 */
	command: LVMCommand;

	/**
	 * Whether to output in JSON format.
	 */
	json?: boolean;

	/**
	 * Whether the command takes no arguments.
	 */
	noArgs?: boolean;
};

export type CommandOptions = {
	/**
	 * Whether to run the command in test mode.
	 */
	test?: boolean;

	/**
	 * Whether to output in verbose format.
	 */
	verbose?: boolean;
};

export type CommandFactoryCallbackOptions = {
	/**
	 * The command options to pass.
	 */
	options?: CommandOptions;

	/**
	 * The arguments to pass.
	 */
	args?: Array<string>;
};
