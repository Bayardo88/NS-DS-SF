// Read-only Figma Plugin API script that snapshots the Design System V2 tokens.
//
// Run it in file JdINnstfRHeLRPZjeEla4U ("Design System V2") through the Figma MCP
// `use_figma` tool (or a dev plugin console). The MCP tool caps a return value at
// 20 KB, so the export is split into parts: set PART, run once per part and save
// each result verbatim:
//
//   PART = 'variables' -> tokens/figma/variables.json
//   PART = 'effects'   -> tokens/figma/effects.json   (effect styles + Gradient/*)
//   PART = 'text'      -> tokens/figma/text-styles.json
//
// If a part is over the limit, narrow it with ONLY and merge the runs, keeping
// Figma's order: collection names for 'variables', style-name prefixes for 'text'.
// A single collection that is still too big can be read in pieces with SLICE.
//
// Then run `node scripts/build-tokens.mjs` to regenerate tokens.json and the CSS.
//
// Value encoding (all parts):
//   color        "#rrggbb", or { "hex": "#rrggbb", "alpha": 0.06 } when alpha < 1
//   alias        "@<Collection>/<variable name>", e.g. "@Primitives/blue/600"
//   float        the raw number, rounded to 3 decimals (Figma stores float32)
//   string       the raw string

const PART = 'variables';
const ONLY = null; // e.g. ['Primitives'] or ['Primary/', 'Secondary/']
const SLICE = null; // e.g. [0, 90] — variable index range within each collection

const round = (n, d = 3) => Math.round(n * 10 ** d) / 10 ** d;
const hex2 = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
const color = (c) => {
  const hex = '#' + hex2(c.r) + hex2(c.g) + hex2(c.b);
  const a = c.a === undefined ? 1 : round(c.a);
  return a < 1 ? { hex, alpha: a } : hex;
};

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const variables = await figma.variables.getLocalVariablesAsync();
const varById = Object.fromEntries(variables.map((v) => [v.id, v]));
const colById = Object.fromEntries(collections.map((c) => [c.id, c]));
const ref = (id) => {
  const v = varById[id];
  return '@' + colById[v.variableCollectionId].name + '/' + v.name;
};
const bound = (obj) => {
  const out = {};
  for (const [k, a] of Object.entries(obj.boundVariables || {})) {
    const alias = Array.isArray(a) ? a[0] : a;
    if (alias && alias.id) out[k] = ref(alias.id);
  }
  return out;
};

if (PART === 'variables') {
  const out = {
    $source: { fileKey: 'JdINnstfRHeLRPZjeEla4U', fileName: 'Design System V2' },
    columns: ['name', 'type', 'codeSyntax.WEB', 'scopes', 'valuesByMode', 'description (when set)'],
    collections: {},
  };
  for (const c of collections) {
    if (ONLY && !ONLY.includes(c.name)) continue;
    out.collections[c.name] = {
      modes: c.modes.map((m) => m.name),
      variables: (SLICE ? c.variableIds.slice(...SLICE) : c.variableIds).map((id) => {
        const v = varById[id];
        const values = c.modes.map((m) => {
          const val = v.valuesByMode[m.modeId];
          if (val && typeof val === 'object' && val.type === 'VARIABLE_ALIAS') return ref(val.id);
          if (v.resolvedType === 'COLOR') return color(val);
          return v.resolvedType === 'FLOAT' ? round(val) : val;
        });
        const row = [v.name, v.resolvedType, v.codeSyntax.WEB || '', v.scopes, values];
        if (v.description) row.push(v.description);
        return row;
      }),
    };
  }
  return out;
}

if (PART === 'effects') {
  const effects = (await figma.getLocalEffectStylesAsync()).map((s) => ({
    name: s.name,
    description: s.description,
    effects: s.effects.map((e) =>
      e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW'
        ? {
            type: e.type,
            color: bound(e).color || color(e.color),
            x: e.offset.x,
            y: e.offset.y,
            blur: e.radius,
            spread: e.spread || 0,
          }
        : { type: e.type, radius: bound(e).radius || e.radius },
    ),
  }));
  const gradients = (await figma.getLocalPaintStylesAsync())
    .filter((s) => s.paints.some((p) => p.type.startsWith('GRADIENT_')))
    .map((s) => {
      const p = s.paints[0];
      return {
        name: s.name,
        description: s.description,
        type: p.type,
        transform: p.gradientTransform,
        stops: p.gradientStops.map((st) => ({
          position: round(st.position),
          color: bound(st).color || color(st.color),
        })),
      };
    });
  return { effects, gradients };
}

if (PART === 'text') {
  return {
    columns: ['name', 'fontFamily', 'fontStyle', 'fontSize', 'lineHeightPx', 'letterSpacingPx', 'boundVariables'],
    textStyles: (await figma.getLocalTextStylesAsync())
      .filter((s) => !ONLY || ONLY.some((prefix) => s.name.startsWith(prefix)))
      .map((s) => [
        s.name,
        s.fontName.family,
        s.fontName.style,
        s.fontSize,
        s.lineHeight.unit === 'PIXELS' ? round(s.lineHeight.value) : null,
        s.letterSpacing.unit === 'PIXELS' ? round(s.letterSpacing.value) : null,
        bound(s),
      ]),
  };
}

throw new Error('Unknown PART: ' + PART);
