#!/usr/bin/env node

import { execSync } from "child_process";
import { create } from "create-create-app";
import { resolve } from "path";

const templateRoot = resolve(__dirname, "..", "templates");

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.

const caveat = `
	Your Hammer project is ready to rock! 🚀

	Don't forget to regularly update your dependencies by running \`npm run update\` in your project directory!
`;

create("create-hammer", {
	templateRoot,
	defaultDescription: "A simple Hammer app",
	defaultTemplate: "bot",
	promptForTemplate: true,
	promptForAuthor: false,
	promptForEmail: false,
	promptForLicense: false,
	after: ({ template }) => {
		console.log(
			`Creating your Hammer project with ${template} template...`,
		);
	},
	caveat: ({ packageDir }) => {
		console.log("Updating dependencies...");

		execSync("npm run update", {
			cwd: packageDir,
			stdio: "inherit",
		});

		return caveat;
	},
});
