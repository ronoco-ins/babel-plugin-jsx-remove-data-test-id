## babel-plugin-jsx-remove-data-test-prefix

Remove `data-test-` prefixed attributes from your production builds.

##### Based heavily on `babel-plugin-remove-data-test-id`

This babel-plugin is a fork of `babel-plugin-remove-data-test-id` where a regular expression takes the place of the strict string comparison.

Most of the credit for this plugin goes to [Rich Gorman](https://github.com/coderas/).


### Motivation

It's not usually a good idea to couple our test code with DOM element id's or CSS classnames.

- Finding by an `.o-some-class` or `#some-id` selector couples our test to the CSS; making changes can be expensive from a maintainance point of view, whether they are coming from the CSS or the tests
- Finding elements by DOM tag, such as `<span />` or `<p>` can be equally as difficult to maintain; these things move around so if your looking for `.first()` you might get a nasty surprise

We wanted to decouple our tests from these concerns, in a way that would support both unit
level tests and end to end test. Bring in:

`data-test-id="some-test-id"`

or

`data-test-some-arbitrary-attribute="whatever value"`

This package give you the ability to strip these test attributes from production code.

### Install

```bash
npm install ronoco-ins/babel-plugin-jsx-remove-data-test-prefix --save-dev
```

Add this to you babel config plugins

```javascript
plugins: ["babel-plugin-jsx-remove-data-test-prefix"];
```

### How to use

Add some `data-test-any-attribute` to your react components

```javascript
return (
  <div>
    <p data-test-any-attribute="component-text">{someText}</p>
  </div>
);
```

### Peer dependency warnings

This plugin specifies Babel 7 as its peer dependency - while it also works with Babel 6 you might want to install `@babel/core@6.0.0-bridge.1` to get rid of unmet peer dependency warnings.

### Define custom attribute name(s)

By default attributes with the prefix `data-test-` (such as `data-test-id` used in [react-testing-library](https://testing-library.com/react)) will be stripped.
You can also define custom prefix names via plugin options in your babel config:

```javascript
plugins: [
  "babel-plugin-jsx-remove-data-test-id",
  {
    prefixes: "qa-"
  }
];
```

Or if you need to strip off multiple attributes, you can define an attributes array as follows:

```javascript
plugins: [
  "babel-plugin-jsx-remove-data-test-id",
  {
    prefixes: ["data-test-", "selenium-", "qa-"]
  }
];
```

Make sure the plugins are part of your babel config, and build away - that's it. Attributes prefixed with `data-test-` (respectively your custom named prefixes) will be stripped.
