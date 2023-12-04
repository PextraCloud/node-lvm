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
import {LVMSize} from './common';

type LVMLogicalVolumeBase = {
	lv_name: string;
	vg_name: string;
	lv_attr: string;
	lv_size: LVMSize;
	pool_lv: string;
	origin: string;
	data_percent: string;
	metadata_percent: string;
	move_pv: string;
	mirror_log: string;
	copy_percent: string;
	convert_lv: string;
};

export type LVMLogicalVolume<T extends boolean | undefined> = T extends true
	? LVMLogicalVolumeBase & {
			seg_count: string;
			lv_major: string;
			lv_minor: string;
			lv_kernel_major: string;
			lv_kernel_minor: string;
			lv_uuid: string;
			lv_profile: string;
	  }
	: LVMLogicalVolumeBase;
