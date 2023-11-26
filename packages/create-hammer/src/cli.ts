#!/usr/bin/env node

import { create } from "create-create-app";
import { resolve } from "path";

const templateRoot = resolve(__dirname, "..", "templates");

const caveat = `
Your Hammer project is ready to rock! 🚀
`;

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.

create("create-hammer", {
	templateRoot,
	defaultDescription: "A simple Hammer app",
	defaultTemplate: "bot",
	promptForTemplate: true,
	promptForAuthor: false,
	promptForEmail: false,
	promptForLicense: false,
	after: ({ answers }) =>
		console.log(
			`Creating your Hammer project with ${answers.template} template...`,
		),
	caveat,
});
