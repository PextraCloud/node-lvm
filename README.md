# node-lvm

>A NodeJS wrapper for LVM (logical volume manager) written in TypeScript.

<br>

[![Downloads](https://badgen.net/npm/dt/@pextra/node-lvm)](https://www.npmjs.com/package/@pextra/node-lvm)
[![npm dependents](https://badgen.net/npm/dependents/@pextra/node-lvm)](https://www.npmjs.com/package/@pextra/node-lvm?activeTab=dependents)
[![Version](https://badgen.net/npm/v/@pextra/node-lvm)](https://www.npmjs.com/package/@pextra/node-lvm)
[![License](https://badgen.net/npm/license/@pextra/node-lvm)](https://opensource.org/license/mit/)

## NOTICE

**This package is still in development and *is not* yet ready for production use. There *will* be breaking changes before the package is stable.**

Most commands are implemented, but a few are not yet. Not many of the command options are implemented yet, but the most common ones are.

**Please open an issue if you would like a specific option implemented.**

## Install

```sh
npm install @pextra/node-lvm
```

## Usage

There is one default exported object with three properties: `pv`, `vg`, and `lv`. Each of these properties is an object containing methods for the respective LVM command.

Each command returns an object with three properties: `stdout`, `stderr`, and `data`. `stdout` and `stderr` are the raw output from the command. `data` is the parsed JSON output from the command, if any.

Any command can be run with the `verbose` option, which will make LVM output more information about what it is doing.
Any command can be run with the `test` option, which will not make any changes to the system.

Due to LVM's output format, the `data` property will be an empty object for all non-retrieval commands.
An error will be thrown if the command fails (i.e. returns a non-zero exit code).

Example:

```ts
import lvm from '@pextra/node-lvm';

const result = await lvm.pv.Create('/dev/loop0', {verbose: true});

/*
	Formed command:
		pvcreate --yes --reportformat json --verbose /dev/loop0

	Result:
	{
		"stdout": "  Wiping signatures on new PV /dev/loop0.\n  Set up physical volume for \"/dev/loop0\" with 20480 available sectors.\n  Zeroing start of device /dev/loop0.\n  Writing physical volume data to disk "\/dev/loop0\".\n  Physical volume \"/dev/loop0\" successfully created.",
		"stderr": "",
		"data": {}
	}
*/
```

TODO

## Support/Contact

For enterprise licensing, support, and consulting, please visit [our website](https://pextra.cloud/enterprise). Alternatively, you can contact us at [enterprise@pextra.cloud](mailto:support@pextra.cloud).

If you have any questions, please feel free open an issue or a discussion. You can also contact us at [support@pextra.cloud](mailto:support@pextra.cloud).

## Contributions

We welcome contributions! If you find any bugs, have feature requests, or would like to contribute enhancements, please feel free to open issues or submit pull requests.

We use [gts](https://github.com/google/gts) for linting and formatting.

## License

node-lvm is licensed under the [MIT License](./LICENSE).
