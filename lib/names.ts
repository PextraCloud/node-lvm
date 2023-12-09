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
const invalid = {
	names: ['.', '..', 'snapshot', 'pvmove'],
	strings: ['_mlog', '_mimage'],
};

const nameRegex = /^(?!-)[A-Za-z0-9_.+-]*$/;
const maxLengths = {
	lv: 64,
	vg: 128,
};

const errors = {
	nameLength: (name: string, maxLength: number) => {
		return new Error(
			`Invalid LVM name length: ${name} (max ${maxLength} characters).`
		);
	},
	name: (name: string) => {
		return new Error(`Invalid LVM name: ${name}.`);
	},
};

/**
 * Validates an LVM logical volume name.
 */
const ValidateLVMLogicalVolumeName = (name: string) => {
	if (name.length > maxLengths.lv || name.length < 1) {
		return errors.nameLength(name, maxLengths.lv);
	}

	if (
		invalid.names.includes(name) ||
		invalid.strings.some(str => name.includes(str)) ||
		!nameRegex.test(name)
	) {
		return errors.name(name);
	}

	return true;
};

/**
 * Validates an LVM volume group name.
 */
const ValidateLVMVolumeGroupName = (name: string) => {
	if (name.length > maxLengths.vg || name.length < 1) {
		return errors.nameLength(name, maxLengths.vg);
	}

	if (
		invalid.names.includes(name) ||
		invalid.strings.some(str => name.includes(str)) ||
		!nameRegex.test(name)
	) {
		return errors.name(name);
	}

	return true;
};

export {ValidateLVMLogicalVolumeName, ValidateLVMVolumeGroupName};
