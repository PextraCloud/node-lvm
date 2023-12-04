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
import {LVMBlockDevice} from '../types/common';
import {LVMPhysicalVolume} from '../types/pv';

const GetPhysicalVolumesCommand = FormCommand({
	command: 'pvs',
	json: true,
	noArgs: true,
});

const GetPhysicalVolumeCommand = FormCommand({
	command: 'pvs',
	json: true,
});

const CreatePhysicalVolumeCommand = FormCommand({
	command: 'pvcreate',
	json: true,
});

const RemovePhysicalVolumeCommand = FormCommand({
	command: 'pvremove',
	json: true,
});

/**
 * Retrieves information about all LVM physical volumes.
 */
const GetAll = (options: CommandOptions) => {
	return ExecuteCommand<Array<LVMPhysicalVolume<typeof options.verbose>>>(
		GetPhysicalVolumesCommand({options})
	);
};

/**
 * Retrieves information about all LVM physical volumes in a specific LVM volume group.
 *
 * NOTE: This returns an array of physical volumes, but there will only be one item.
 * This is due to how LVM returns data.
 */
const Get = (volumeGroup: string, options: CommandOptions) => {
	return ExecuteCommand<Array<LVMPhysicalVolume<typeof options.verbose>>>(
		GetPhysicalVolumeCommand({args: [volumeGroup], options})
	);
};

/**
 * Creates a new LVM physical volume.
 */
const Create = (blockDevice: LVMBlockDevice, options: CommandOptions) => {
	return ExecuteCommand<{}>(
		CreatePhysicalVolumeCommand({args: [blockDevice], options}),
		false
	);
};

/**
 * Removes an LVM physical volume.
 */
const Remove = (name: string, options: CommandOptions) => {
	return ExecuteCommand<{}>(
		RemovePhysicalVolumeCommand({args: [name], options}),
		false
	);
};

export {GetAll, Get, Create, Remove};
