"use strict";
const chalk = require("chalk");
const yosay = require("yosay");
const underscoreString = require("underscore.string");
const Generator = require("yeoman-generator");
const setupPlaygorund = require("./playground");

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the " + chalk.red("Angular Library") + " generator!"
    ));
  }

  prompting() {
    const prompts = [
      {
        type: "input",
        name: "authorName",
        message: "Your full name:",
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return "Please enter your full name";
        },
        default: this.user.git.name
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Your email address:",
        validate: function (input) {
          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
            return true;
          }
          return "Please enter a valid email address";
        },
        default: this.user.git.email
      },
      {
        type: "input",
        name: "libraryName",
        message: "Your library name (kebab-case)",
        default: underscoreString.slugify(this.appname),
        filter: function (x) {
          return underscoreString.slugify(x);
        }
      },
      {
        type: "input",
        name: "scope",
        message: "Your library scope (eg: @angular) leave blank for none",
        default: "",
        validate: function (x) {
          return !x || x.indexOf("@") === 0;
        },
        filter: function (x) {
          return x ? x + "/" : "";
        }
      },
      {
        type: "input",
        name: "gitRepositoryUrl",
        message: "Git repository url",
        default: "https://github.com/username/repo",
        store: true
      },
      {
        type: "list",
        name: "testFramework",
        message: "Test framework",
        choices: [
          "karma + jasmine",
          "jest"
        ]
      }
    ];

    return this.prompt(prompts).then(props => {

      this.props = {

        author: {
          name: props.authorName,
          email: props.authorEmail
        },

        libraryName: {
          original: props.libraryName,
          kebabCase: props.libraryName
        },

        gitRepositoryUrl: props.gitRepositoryUrl,

        testFramework: props.testFramework,

        scope: props.scope
      };

    });
  }

  writing() {

    // Copy .gitignore
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );

    // Copy .npmignore
    this.fs.copy(
      this.templatePath("npmignore"),
      this.destinationPath(".npmignore")
    );

    // Copy .travis.yml
    this.fs.copy(
      this.templatePath("travis.yml"),
      this.destinationPath(".travis.yml")
    );

    // Copy tsconfig.json
    this.fs.copyTpl(
      this.templatePath("_tsconfig.json"),
      this.destinationPath("tsconfig.json"),
      {
        props: this.props
      }
    );

    // Copy tslint.json
    this.fs.copyTpl(
      this.templatePath("_tslint.json"),
      this.destinationPath("tslint.json"),
      {
        props: this.props
      }
    );

    // Copy package.json
    if (this.props.testFramework === "jest") {
      this.fs.copyTpl(
      this.templatePath("_package_jest.json"),
        this.destinationPath("package.json"),
        {
          props: this.props
        }
      );

      this.fs.copyTpl(
        this.templatePath("_jest.ts"),
        this.destinationPath("src/jest.ts")
      );

      this.fs.copyTpl(
        this.templatePath("_jest-global-mocks.ts"),
        this.destinationPath("src/jest-global-mocks.ts")
      );
    } else {
      this.fs.copyTpl(
      this.templatePath("_package.json"),
        this.destinationPath("package.json"),
        {
          props: this.props
        }
      );
    }

    // Copy README
    this.fs.copyTpl(
      this.templatePath("README.MD"),
      this.destinationPath("README.MD"),
      {
        props: this.props
      }
    );

    // Copy tools directory
    this.fs.copyTpl(
      this.templatePath("tools/**/*"),
      this.destinationPath("tools")
    );

    // Copy gulpfile.js
    this.fs.copyTpl(
      this.templatePath("gulpfile.js"),
      this.destinationPath("gulpfile.js"),
      {
        props: this.props
      }
    );

    // Copy src folder
    this.fs.copy(
      this.templatePath("src/**/*.ts"),
      this.destinationPath("src")
    );

    // Copy src/package.json
    this.fs.copyTpl(
      this.templatePath("src/_package.json"),
      this.destinationPath("src/package.json"),
      {
        props: this.props
      }
    );

    // Copy src/tsconfig.es5.json
    this.fs.copyTpl(
      this.templatePath("src/_tsconfig.es5.json"),
      this.destinationPath("src/tsconfig.es5.json"),
      {
        props: this.props
      }
    );

    // Copy src/tsconfig.spec.json
    this.fs.copyTpl(
      this.templatePath("src/_tsconfig.spec.json"),
      this.destinationPath("src/tsconfig.spec.json")
    );

    setupPlaygorund(this);
  }

  install() {
    this.installDependencies({bower: false});
  }
};
