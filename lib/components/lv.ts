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
import {FormCommand, ExecuteCommand} from '../command';
import {CommandOptions} from '../types/command';
import {LVMSize, LVMSizeExtents} from '../types/common';
import {LVMLogicalVolume} from '../types/lv';
import {
	ValidateLVMVolumeGroupName,
	ValidateLVMLogicalVolumeName,
} from '../names';

const GetLogicalVolumesCommand = FormCommand({
	command: 'lvs',
	json: true,
	noArgs: true,
});

const GetLogicalVolumeCommand = FormCommand({
	command: 'lvs',
	json: true,
});

const CreateLogicalVolumeCommand = FormCommand({
	command: 'lvcreate',
	json: true,
});

const RenameLogicalVolumeCommand = FormCommand({
	command: 'lvrename',
	json: true,
});

const RemoveLogicalVolumeCommand = FormCommand({
	command: 'lvremove',
	json: true,
});

const ExtendLogicalVolumeCommand = FormCommand({
	command: 'lvextend',
	json: true,
});

const ReduceLogicalVolumeCommand = FormCommand({
	command: 'lvreduce',
	json: true,
});

/**
 * Retrieves information about all LVM logical volumes.
 */
const GetAll = (options: CommandOptions) => {
	return ExecuteCommand<Array<LVMLogicalVolume<typeof options.verbose>>>(
		GetLogicalVolumesCommand({options})
	);
};

/**
 * Retrieves information about all LVM logical volumes in a specific LVM volume group.
 *
 * NOTE: This returns an array of logical volumes, but there will only be one item.
 * This is due to how LVM returns data.
 */
const Get = (volumeGroup: string, options: CommandOptions) => {
	return ExecuteCommand<Array<LVMLogicalVolume<typeof options.verbose>>>(
		GetLogicalVolumeCommand({
			args: [volumeGroup],
			options,
		}),
		true,
		() => ValidateLVMVolumeGroupName(volumeGroup)
	);
};

/**
 * Creates a new LVM logical volume.
 */
const Create = (
	name: string,
	size: {
		size?: LVMSize;
		extent?: LVMSizeExtents;
	},
	volumeGroup: string,
	options: CommandOptions
) => {
	const args = ['-n', name];

	if (size.size && size.extent) {
		throw new Error('Cannot specify both size and extent.');
	}

	if (size.size) {
		args.push('-L', size.size);
	} else if (size.extent) {
		args.push('-l', size.extent.toString());
	} else {
		throw new Error('Must specify either size or extent.');
	}

	args.push(volumeGroup);
	return ExecuteCommand<{}>(
		CreateLogicalVolumeCommand({
			args,
			options,
		}),
		false,
		() =>
			ValidateLVMLogicalVolumeName(name) &&
			ValidateLVMLogicalVolumeName(volumeGroup)
	);
};

/**
 * Renames an existing LVM logical volume.
 */
const Rename = (
	volumeGroup: string,
	name: string,
	newName: string,
	options: CommandOptions
) => {
	return ExecuteCommand<{}>(
		RenameLogicalVolumeCommand({
			args: [`${volumeGroup}/${name}`, newName],
			options,
		}),
		false,
		() =>
			ValidateLVMLogicalVolumeName(name) &&
			ValidateLVMLogicalVolumeName(newName) &&
			ValidateLVMLogicalVolumeName(volumeGroup)
	);
};

/**
 * Removes an existing LVM logical volume.
 */
const Remove = (volumeGroup: string, name: string, options: CommandOptions) => {
	return ExecuteCommand<{}>(
		RemoveLogicalVolumeCommand({
			args: [`${volumeGroup}/${name}`],
			options,
		}),
		false,
		() =>
			ValidateLVMLogicalVolumeName(name) &&
			ValidateLVMLogicalVolumeName(volumeGroup)
	);
};

/**
 * Adds space to an existing LVM logical volume.
 */
const Extend = (
	volumeGroup: string,
	name: string,
	size: {
		size?: LVMSize;
		extent?: LVMSizeExtents;
	},
	options: CommandOptions
) => {
	const args = [`${volumeGroup}/${name}`];

	if (size.size && size.extent) {
		throw new Error('Cannot specify both size and extent.');
	}

	if (size.size) {
		args.push('-L', size.size);
	} else if (size.extent) {
		args.push('-l', size.extent.toString());
	} else {
		throw new Error('Must specify either size or extent.');
	}

	return ExecuteCommand<{}>(
		ExtendLogicalVolumeCommand({
			args,
			options,
		}),
		false,
		() =>
			ValidateLVMLogicalVolumeName(name) &&
			ValidateLVMLogicalVolumeName(volumeGroup)
	);
};

/**
 * Removes space from an existing LVM logical volume.
 */
const Reduce = (
	volumeGroup: string,
	name: string,
	size: {
		size?: LVMSize;
		extent?: LVMSizeExtents;
	},
	options: CommandOptions
) => {
	const args = [`${volumeGroup}/${name}`];

	if (size.size && size.extent) {
		throw new Error('Cannot specify both size and extent.');
	}

	if (size.size) {
		args.push('-L', size.size);
	} else if (size.extent) {
		args.push('-l', size.extent.toString());
	} else {
		throw new Error('Must specify either size or extent.');
	}

	return ExecuteCommand<{}>(
		ReduceLogicalVolumeCommand({
			args,
			options,
		}),
		false,
		() =>
			ValidateLVMLogicalVolumeName(name) &&
			ValidateLVMLogicalVolumeName(volumeGroup)
	);
};

export {GetAll, Get, Create, Rename, Remove, Extend, Reduce};
