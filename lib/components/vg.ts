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
import {LVMSize, LVMBlockDevice} from '../types/common';
import {LVMVolumeGroup} from '../types/vg';

const GetVolumeGroupsCommand = FormCommand({
	command: 'vgs',
	json: true,
	noArgs: true,
});

const GetVolumeGroupCommand = FormCommand({
	command: 'vgs',
	json: true,
});

const CreateVolumeGroupCommand = FormCommand({
	command: 'vgcreate',
	json: true,
});

const RenameVolumeGroupCommand = FormCommand({
	command: 'vgrename',
	json: true,
});

const RemoveVolumeGroupCommand = FormCommand({
	command: 'vgremove',
	json: true,
});

const ExtendVolumeGroupCommand = FormCommand({
	command: 'vgextend',
	json: true,
});

const ReduceVolumeGroupCommand = FormCommand({
	command: 'vgreduce',
	json: true,
});

/**
 * Retrieves information about all LVM volume groups.
 */
const GetAll = (options: CommandOptions) => {
	return ExecuteCommand<Array<LVMVolumeGroup<typeof options.verbose>>>(
		GetVolumeGroupsCommand({options})
	);
};

/**
 * Retrieves information about a specific LVM volume group.
 *
 * NOTE: This returns an array of volume groups, but there will only be one item.
 * This is due to how LVM returns data.
 */
const Get = (name: string, options: CommandOptions) => {
	return ExecuteCommand<Array<LVMVolumeGroup<typeof options.verbose>>>(
		GetVolumeGroupCommand({
			options,
			args: [name],
		})
	);
};

/**
 * Creates a new LVM volume group.
 */
const Create = (
	name: string,
	peSize: LVMSize = '4M',
	physicalVolumes: Array<LVMBlockDevice> | LVMBlockDevice,
	options: CommandOptions
) => {
	const args = [name];

	if (peSize) {
		args.push('-s', peSize);
	}

	if (physicalVolumes instanceof Array) {
		args.push(...physicalVolumes);
	} else {
		args.push(physicalVolumes);
	}

	return ExecuteCommand<{}>(
		CreateVolumeGroupCommand({
			options,
			args,
		}),
		false
	);
};

/**
 * Renames an existing LVM volume group.
 */
const Rename = (oldName: string, newName: string, options?: CommandOptions) => {
	return ExecuteCommand<{}>(
		RenameVolumeGroupCommand({
			// TODO validate names
			args: [oldName, newName],
			options,
		}),
		false
	);
};

/**
 * Removes an existing LVM volume group.
 */
const Remove = (name: string, options?: CommandOptions) => {
	return ExecuteCommand<{}>(
		RemoveVolumeGroupCommand({
			args: [name],
			options,
		}),
		false
	);
};

/**
 * Adds a physical volume to an existing LVM volume group.
 */
const Extend = (
	// TODO add support for multiple block devices
	name: string,
	blockDevice: LVMBlockDevice,
	options?: CommandOptions
) => {
	return ExecuteCommand<{}>(
		ExtendVolumeGroupCommand({
			args: [name, blockDevice],
			options,
		}),
		false
	);
};

/**
 * Removes a physical volume from an existing LVM volume group.
 */
const Reduce = (
	// TODO add support for multiple block devices
	name: string,
	blockDevice: LVMBlockDevice,
	options?: CommandOptions
) => {
	return ExecuteCommand<{}>(
		ReduceVolumeGroupCommand({
			args: [name, blockDevice],
			options,
		}),
		false
	);
};

export {GetAll, Get, Create, Rename, Remove, Extend, Reduce};
