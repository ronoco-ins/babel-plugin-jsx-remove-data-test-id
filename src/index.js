const getPrefixIdentifiers = options => {
  if(!options || typeof(options.prefixes) === 'undefined') return ['data-test-'];

  if(Array.isArray(options.prefixes)) {
    if(options.prefixes.length === 0) {
      throw new Error('option prefixes must be an array with at least one element');
    }

    if(options.prefixes.length !== options.prefixes.filter(attr=> attr && typeof(attr) === 'string').length) {
      throw new Error('all items in the option prefixes must be non empty strings');
    }

    return options.prefixes;
  }

  if(!options.prefixes || typeof(options.prefixes) !== 'string') {
    throw new Error('option prefixes must be a non empty string or an array with non empty strings');
  }

  return [options.prefixes];
}

const RemoveDataTestIds = ({ types: t }) => {
  const visitor = {
    JSXOpeningElement: (path, state) => {
      if (path.node.hasStripped) {
        return;
      }

      const prefixIdentifiers = getPrefixIdentifiers(state.opts);

      const validTestIdAttributes = attr => {
        const isIdent = prefixIdentifiers.find(
          attribute => {
            const r = new RegExp(attribute);
            return t.isJSXIdentifier(attr.name) && r.test(attr.name.name);
          }
        );
        return t.isJSXAttribute(attr) && isIdent;
      };

      const replaceClassNameValues = attr => {
        const matchingAttrs = currentAttr => {
          if (attr !== currentAttr) {
            return currentAttr;
          }
        };

        const isDefined = value => typeof value !== 'undefined';

        const attrs = (
          path.node.attributes
            .map(matchingAttrs)
            .filter(isDefined)
        );

        const node = t.jSXOpeningElement(
          path.node.name,
          attrs,
          path.node.selfClosing
        );
        node.hasStripped = true;
        path.replaceWith(node);
      };

      path.node.attributes
        .filter(validTestIdAttributes)
        .forEach(replaceClassNameValues);
    }
  };

  return {
    visitor
  };
};

export default RemoveDataTestIds;
