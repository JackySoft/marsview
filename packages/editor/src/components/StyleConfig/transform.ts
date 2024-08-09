import cssParser from 'css';
/**
 * css 转换为 object
 * .marsview { font-size: 12px } 生成：{ marsview:{ fontSize: '12px' } }
 * @param rules
 * @param result
 */

// Transform implementation or originally thanks to
// https://github.com/raphamorim/native-css

function transformRules(rules: any, result: any) {
  rules.forEach(function (rule: any) {
    const obj: any = {};
    if (rule.type === 'media') {
      const name = mediaNameGenerator(rule.media);
      const media = (result[name] = result[name] || {
        __expression__: rule.media,
      });
      transformRules(rule.rules, media);
    } else if (rule.type === 'rule') {
      rule.declarations.forEach(function (declaration: any) {
        if (declaration.type === 'declaration') {
          const cleanProperty = cleanPropertyName(declaration.property);
          obj[cleanProperty] = declaration.value;
        }
      });
      rule.selectors.forEach(function (selector: any) {
        const name = nameGenerator(selector.trim());
        result[name] = obj;
      });
    }
  });
}

const cleanPropertyName = function (name: string) {
  // turn things like 'align-items' into 'alignItems'
  name = name.replace(/(-.)/g, function (v) {
    return v[1].toUpperCase();
  });

  return name;
};

const mediaNameGenerator = function (name: string) {
  return '@media ' + name;
};

const nameGenerator = function (name: string) {
  name = name.replace(/\s\s+/g, ' ');
  name = name.replace(/[^a-zA-Z0-9]/g, '_');
  name = name.replace(/^_+/g, '');
  name = name.replace(/_+$/g, '');

  return name;
};

export function transform(inputCssText: string) {
  if (!inputCssText) {
    throw new Error('missing css text to transform');
  }

  // If the input "css" doesn't wrap it with a css class (raw styles)
  // we need to wrap it with a style so the css parser doesn't choke.
  let bootstrapWithCssClass = false;
  if (inputCssText.indexOf('{') === -1) {
    bootstrapWithCssClass = true;
    inputCssText = `.marsview { ${inputCssText} }`;
  }
  const css = cssParser.parse(inputCssText);
  let result: any = {};
  transformRules(css.stylesheet.rules, result);

  // Don't expose the implementation detail of our wrapped css class.
  if (bootstrapWithCssClass) {
    result = result.marsview;
  }

  return result;
}
