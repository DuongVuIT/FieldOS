# FieldOS Level 0 — React Native Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap and verify the smallest bare React Native 0.87.x TypeScript app that renders the FieldOS learning screen and exposes the real native startup path.

**Architecture:** Keep the official Community CLI native scaffold and one `App` component. Add only one neutral `screenName` constants module so the requested `export const` and `@/*` alias are exercised without introducing application architecture.

**Tech Stack:** React Native 0.87.x, React, TypeScript strict mode, Hermes as generated/configured by the template, React Native New Architecture as generated/configured by the template, Yarn, Metro, Babel, Jest, Xcode, CocoaPods, Gradle, Android emulator.

**Spec:** `docs/superpowers/specs/2026-09-06-fieldos-level-0-react-native-foundation-design.md`

## Global Constraints

- Use Yarn for dependency installation and project scripts.
- Keep the app bare; do not add Expo, React Navigation, API calls, authentication, persistence, state libraries, repositories, use cases, domain layers, sync engines, telemetry, background work, or native modules.
- Keep `index.js` as the JavaScript entry point unless the generated template requires a minimal import adjustment for the chosen export style.
- Use TypeScript strict mode and do not introduce `any` or error suppressions.
- Use `export const screenName = { title: 'FieldOS', subtitle: 'Mobile Engineering Lab' } as const` in `src/constants/screenName.ts`.
- Resolve the `@/*` alias in both TypeScript and Metro/Babel runtime configuration.
- Change only starter UI/test copy needed for this milestone.
- Verify claims with command output; separate successful checks from environment-blocked checks.

---

### Task 1: Bootstrap the bare React Native project

**Files:**
- Create: generated React Native project files in the repository root, including `package.json`, `yarn.lock`, `App.tsx`, `index.js`, `babel.config.js`, `metro.config.js`, `tsconfig.json`, `android/`, and `ios/`.
- Preserve: existing Git metadata, `README.md`, and the committed Level 0 design/spec files.

**Interfaces:**
- Produces: a runnable React Native 0.87.x project named `FieldOS`, with generated Yarn-compatible scripts and native targets.

- [ ] **Step 1: Confirm the repository is safe to scaffold into**

Run:

```bash
git status --short --branch
test -f README.md
test ! -e package.json
test ! -e App.tsx
```

Expected: the current branch is reported, `README.md` exists, and no generated app files exist yet.

- [ ] **Step 2: Resolve the available Yarn version without using npm for project dependencies**

Run:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn --version
```

Expected: Yarn prints a version. If Corepack needs network access, obtain approval for the command and retry in the approved environment.

- [ ] **Step 3: Generate the app in the existing repository root**

Run the Community CLI through Yarn, selecting the current stable release and the existing directory:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn dlx @react-native-community/cli@latest init FieldOS --version latest --directory . --skip-git-init --skip-install
```

Expected: the official template creates the native and JavaScript project files directly in `/Users/vudaiduong/H.workspace/FieldOS` without creating a nested `FieldOS/` directory or a second Git repository.

- [ ] **Step 4: Install the generated dependency graph with Yarn**

Run:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn install
```

Expected: `yarn.lock` is created or updated and dependencies install without npm modifying the project.

- [ ] **Step 5: Verify the scaffold boundary**

Run:

```bash
test -f package.json
test -f App.tsx
test -f index.js
test -d ios
test -d android
test ! -d FieldOS
```

Expected: the project exists at the repository root and no nested application directory was created.

### Task 2: Add the minimal constants module and working alias

**Files:**
- Create: `src/constants/screenName.ts`
- Modify: `tsconfig.json`
- Modify: `babel.config.js`
- Modify: `package.json` and `yarn.lock` through Yarn only

**Interfaces:**
- Consumes: generated TypeScript and Babel configurations.
- Produces: `screenName.title` and `screenName.subtitle`, importable as `@/constants/screenName` by TypeScript and Metro.

- [ ] **Step 1: Install the runtime alias resolver with Yarn**

Run:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn add --dev babel-plugin-module-resolver
```

Expected: the plugin is recorded in `devDependencies` and `yarn.lock` changes through Yarn.

- [ ] **Step 2: Create the single constants module**

Create `src/constants/screenName.ts` with:

```ts
export const screenName = {
  title: 'FieldOS',
  subtitle: 'Mobile Engineering Lab',
} as const;
```

Expected: the module has one named export and no default export.

- [ ] **Step 3: Add the TypeScript path mapping while preserving the generated strict base config**

Extend the generated `tsconfig.json` with the equivalent of:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Expected: existing generated `extends` and strict settings remain intact.

- [ ] **Step 4: Add the matching Babel resolver configuration**

Preserve the generated React Native Babel preset and add the equivalent plugin configuration:

```js
[
  'module-resolver',
  {
    root: ['./src'],
    alias: {'@': './src'},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
]
```

Expected: Metro can resolve `@/constants/screenName` at runtime, not only during TypeScript analysis.

- [ ] **Step 5: Verify alias resolution before changing the screen**

Run:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn tsc --noEmit
```

Expected: TypeScript resolves the new alias and reports no new errors.

### Task 3: Replace the starter screen with the Level 0 UI

**Files:**
- Modify: `App.tsx`

**Interfaces:**
- Consumes: `{screenName}` from `@/constants/screenName`.
- Produces: one root view with exactly two visible text values: `FieldOS` and `Mobile Engineering Lab`.

- [ ] **Step 1: Replace starter copy and imports with the smallest functional screen**

Keep the generated component/export shape compatible with `index.js`, and implement the screen using React Native primitives already available in the generated app:

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {screenName} from '@/constants/screenName';

const App = (): React.JSX.Element => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>{screenName.title}</Text>
      <Text style={styles.subtitle}>{screenName.subtitle}</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  title: {fontSize: 32, fontWeight: '700'},
  subtitle: {fontSize: 18, marginTop: 8},
});

export default App;
```

The generated template may use a slightly different `React.JSX` or style type spelling; preserve its compatible strict TypeScript form without adding abstractions.

- [ ] **Step 2: Run the focused TypeScript check**

Run:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn tsc --noEmit
```

Expected: PASS with the alias import and new JSX.

- [ ] **Step 3: Review the changed JavaScript surface**

Run:

```bash
git diff -- App.tsx src/constants/screenName.ts tsconfig.json babel.config.js package.json
```

Expected: only the requested two strings, the named constants object, and the alias configuration are present; no future architecture appears.

### Task 4: Align the generated test with the new screen

**Files:**
- Modify: generated starter test, normally `__tests__/App.test.tsx`

**Interfaces:**
- Consumes: `App` and `screenName` through the same module resolution used by the app.
- Produces: a test proving both required text values render.

- [ ] **Step 1: Read the generated test harness and preserve its testing library**

Run:

```bash
sed -n '1,220p' __tests__/App.test.tsx
```

Expected: identify the existing renderer/assertion style before editing it.

- [ ] **Step 2: Replace only the starter expectation**

Update the generated test so its assertion is equivalent to:

```tsx
expect(getByText('FieldOS')).toBeTruthy();
expect(getByText('Mobile Engineering Lab')).toBeTruthy();
```

Keep the generated test setup and imports unless the generated file uses a different equivalent API.

- [ ] **Step 3: Run the focused test**

Run:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn test __tests__/App.test.tsx --runInBand
```

Expected: PASS for the changed screen test.

### Task 5: Verify native configuration and run available platforms

**Files:**
- Read only: `package.json`, `android/gradle.properties`, `android/build.gradle`, `android/app/build.gradle`, `ios/Podfile`, `ios/FieldOS/AppDelegate.*`, generated native entry files.
- Modify only if required by a generated build error directly caused by the requested screen or alias setup.

**Interfaces:**
- Consumes: the completed bare project.
- Produces: evidence for selected React Native version, Hermes configuration, New Architecture configuration, lint, tests, native build, and runtime availability.

- [ ] **Step 1: Inspect the actual engine and architecture settings**

Run targeted searches:

```bash
rg -n "react-native|hermes|newArchEnabled|RCT_NEW_ARCH_ENABLED|fabric|bridgeless" package.json android ios
```

Expected: record the actual generated values and file locations; do not infer them from defaults.

- [ ] **Step 2: Run lint and the complete generated Jest suite**

Run:

```bash
COREPACK_HOME=/private/tmp/fieldos-corepack yarn lint
COREPACK_HOME=/private/tmp/fieldos-corepack yarn test --runInBand
```

Expected: PASS, or a clearly isolated baseline/template/environment failure is reported separately from the changed test.

- [ ] **Step 3: Attempt Android build/runtime**

First inspect devices, then run the generated Android script with an available emulator:

```bash
adb devices
COREPACK_HOME=/private/tmp/fieldos-corepack yarn android
```

Expected: the app installs and displays the two requested strings, or the command output identifies an environment blocker such as the ADB daemon or emulator service.

- [ ] **Step 4: Attempt iOS build/runtime when the simulator service is available**

Run:

```bash
xcrun simctl list devices available
COREPACK_HOME=/private/tmp/fieldos-corepack yarn ios
```

Expected: the app builds/launches on an available simulator, or the CoreSimulatorService limitation is recorded verbatim with no claim of runtime success.

- [ ] **Step 5: Run final diff and repository checks**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors, and the final change set contains only Level 0 app files plus the previously committed design/plan documentation.

### Task 6: Deliver the Level 0 learning explanation

**Files:**
- No source changes.

**Interfaces:**
- Consumes: verified generated project files and command results.
- Produces: final Level 0 explanation covering project structure, startup path, iOS/Android differences, important changes, verification evidence, and five understanding questions.

- [ ] **Step 1: Map the actual project structure**

Explain the responsibility and direct caller/dependencies of `index.js`, `App.tsx`, `package.json`, `tsconfig.json`, `babel.config.js`, `metro.config.js`, `ios/`, and `android/`.

- [ ] **Step 2: Trace the actual startup path**

Tie each stage to generated files:

```text
OS launch → native target → React Native initialization → Hermes/runtime → index.js → App render → native UI
```

Explain which parts differ between iOS and Android.

- [ ] **Step 3: End the level with the required learning checkpoint**

The final response must contain exactly these learning sections:

```text
### Completed
### Learned
### Important files
### Verify yourself
```

Include five questions in `### Verify yourself` and do not begin Level 1.
