# Task 2 Report: Constants Module and Alias

## Scope completed

- Added `src/constants/screenName.ts` with exactly one named `screenName` export:
  - `title: 'FieldOS'`
  - `subtitle: 'Mobile Engineering Lab'`
- Added `babel-plugin-module-resolver` as a Yarn-managed dev dependency (`^5.0.3`) and updated `yarn.lock` through Yarn.
- Added TypeScript `@/*` path mapping from `@/*` to `src/*` while preserving the generated React Native TypeScript config extension, include rules, and exclude rules.
- Added the matching Babel `module-resolver` plugin while preserving `module:@react-native/babel-preset`.
- Did not modify `App.tsx`.

## TypeScript 6 compatibility

The generated project pins TypeScript `6.0.3`. That compiler reports TS5101 for the brief-required `baseUrl` option unless `ignoreDeprecations: "6.0"` is present. The minimal suppression was added inside `compilerOptions`; it does not relax or replace generated strict settings.

## Verification

Command run:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn tsc --noEmit
```

Result: exit code 0 with no TypeScript errors.

## Self-review

- `git diff --check` passed with no whitespace errors.
- Reviewed the diff against every Task 2 requirement: only the constants module, TypeScript/Babel alias configuration, Yarn dependency metadata, lockfile, and this required report changed.

## Concerns

- Yarn reported pre-existing peer-dependency notices and a deprecation notice for transitive `glob@9.3.5` during installation; neither blocked the requested focused TypeScript verification.
