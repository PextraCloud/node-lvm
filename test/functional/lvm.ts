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

import lvm from '../../lib';
import {LVMBlockDevice} from '../../lib/types/common';
import {getuid} from 'process';
import {ExecException} from 'child_process';

if (!getuid) {
	throw new Error('These tests can only be run on Linux.');
} else {
	if (getuid() !== 0) {
		throw new Error('You must be root to run these tests.');
	}
}

describe('lvm functional tests', async () => {
	const loopDevice: LVMBlockDevice = process.env
		.LVM2_TEST_DEVICE as LVMBlockDevice;

	if (!loopDevice) {
		throw new Error('LVM2_TEST_DEVICE must be set to a block device.');
	}
	console.log(`Using block device: ${loopDevice}.`);

	describe('lvm functional tests', () => {
		it('should create a physical volume', done => {
			lvm.pv
				.Create(loopDevice, {})
				.then(() => {
					lvm.pv
						.Get(loopDevice, {})
						.then(pvData => {
							const pv = pvData.data[0];
							expect(pv).to.be.an('object');
							expect(pv).to.have.property('pv_name');
							expect(pv.pv_name).to.equal(loopDevice);
							expect(pv).to.not.have.property('pv_uuid');

							expect(pvData.data).to.have.length(1);
							done();
						})
						.catch(err => done(err));
				})
				.catch(err => done(err));
		});

		const vgName = `lvm2test-vg-${Date.now()}`;
		it('should create a volume group', done => {
			lvm.vg
				.Create(vgName, '4M', loopDevice, {})
				.then(() => {
					lvm.vg
						.Get(vgName, {})
						.then(vgData => {
							const vg = vgData.data[0];

							expect(vg).to.be.an('object');
							expect(vg).to.have.property('vg_name');
							expect(vg.vg_name).to.equal(vgName);
							expect(vg).to.not.have.property('vg_uuid');

							done();
						})
						.catch(err => done(err));
				})
				.catch(err => done(err));
		});

		const lvName = `lvm2test-lv-${Date.now()}`;
		it('should create a logical volume', done => {
			lvm.lv
				.Create(
					lvName,
					{
						size: '4M',
					},
					vgName,
					{}
				)
				.then(() => {
					lvm.lv
						.Get(vgName, {})
						.then(lvData => {
							const lv = lvData.data[0];

							expect(lv).to.be.an('object');
							expect(lv).to.have.property('lv_name');
							expect(lv.lv_name).to.equal(lvName);
							expect(lv).to.not.have.property('lv_uuid');

							done();
						})
						.catch(err => done(err));
				})
				.catch(err => done(err));
		});

		it('should remove a logical volume', done => {
			lvm.lv
				.Remove(vgName, lvName, {})
				.then(() => {
					lvm.lv
						.Get(vgName, {})
						.then(lvData => {
							expect(lvData.data).to.have.length(0);
							done();
						})
						.catch(err => done(err));
				})
				.catch(err => done(err));
		});

		it('should remove a volume group', done => {
			lvm.vg
				.Remove(vgName, {})
				.then(() => {
					lvm.vg.Get(vgName, {}).catch((err: ExecException) => {
						if (
							err.message.includes(`${vgName}`) &&
							err.message.includes('not found')
						) {
							done();
						} else {
							done(err);
						}
					});
				})
				.catch(err => done(err));
		});

		it('should remove a physical volume', done => {
			lvm.pv
				.Remove(loopDevice, {})
				.then(() => {
					lvm.pv.GetAll({}).then(pvData => {
						pvData.data.forEach(pv => {
							expect(pv).to.be.an('object');
							expect(pv).to.have.property('pv_name');
							expect(pv)
								.property('pv_name')
								.to.not.equal(loopDevice);
						});

						done();
					});
				})
				.catch(err => done(err));
		});
	});
});
