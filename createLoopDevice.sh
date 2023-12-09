#!/bin/bash
# Copyright (c) 2023 Pextra Inc.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of
# this software and associated documentation files (the "Software"), to deal in
# the Software without restriction, including without limitation the rights to
# use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
# the Software, and to permit persons to whom the Software is furnished to do so,
# subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
# FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
# COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
# IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
check_root () {
    [ "$(id -u)" -eq 0 ]
}

readonly TEST_IMAGE_PATH="/tmp/node-lvm_test.img"

if [ $# -eq 0 ]; then
	echo -e "Usage:\n\t$0 create\n\t$0 delete <loop device>\n"
	exit 1
fi

create () {
	dd if=/dev/zero of=$TEST_IMAGE_PATH bs=1M count=10 2>/dev/null
	losetup -f $TEST_IMAGE_PATH --show
}

delete () {
	LOOP_DEVICE=$2
	echo "Deleting loop device $LOOP_DEVICE..."
	losetup -d $LOOP_DEVICE
	dmsetup remove_all
	echo "Loop device deleted."

	echo "Deleting test image $TEST_IMAGE_PATH..."
	rm -f $TEST_IMAGE_PATH 2>/dev/null
	echo "Test image deleted."
}

check_root || { echo "You must be root to run this script."; exit 1; }

if [ "$1" == "create" ]; then
	create
elif [ "$1" == "delete" ]; then
	if [ $# -ne 2 ]; then
		echo "Usage: $0 delete <loop device>"
		exit 1
	fi

	delete $@
else
	echo "Invalid argument: $1"
	exit 1
fi
