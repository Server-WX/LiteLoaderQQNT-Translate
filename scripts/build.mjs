import spawn from 'cross-spawn';
import { resolve } from 'path';
import fs from 'fs';

const __dirname = resolve((import.meta.dirname || ''), '../'); // Workaround

const SpawnConfig = {
  shell: true,
  stdio: 'inherit',
  cwd: __dirname,
};

// Build `index.js`
spawn.sync('npx', [
  'electron-vite', 'build'
], SpawnConfig);

// Rename `index.js` to `main.js`
fs.renameSync(resolve(__dirname, './LLTranslate/index.js'), resolve(__dirname, './LLTranslate/main.js'));

// Generate `manifest.json`
const PackageInfo = JSON.parse(fs.readFileSync(resolve(__dirname, './package.json'), 'utf8'));
const { liteloader_manifest: PackageManifest } = PackageInfo;

const PluginManifest = {
  manifest_version: 4,

  type: PackageManifest.type,
  name: PackageManifest.name,
  slug: PackageManifest.slug,
  description: PackageInfo.description,
  version: PackageInfo.version,
  icon: PackageManifest.icon,
  authors: [],

  platform: PackageManifest.platform,
  injects: PackageManifest.injects,

  repository: PackageManifest.repository,
};

PluginManifest.authors.push({
  name: typeof PackageInfo.author === 'object' ? PackageInfo.author.name : PackageInfo.author,
  link: typeof PackageInfo.author === 'object' ? PackageInfo.author.url : 'https://github.com/ghost',
});

if (!!PackageInfo.contributors && PackageInfo.contributors.length > 0) {
  for (const contributor of PackageInfo.contributors) {
    PluginManifest.authors.push({
      name: typeof contributor === 'object' ? contributor.name : contributor,
      link: typeof contributor === 'object' ? contributor.url : 'https://github.com/ghost',
    })
  }
}

if (!!PluginManifest.repository.release) {
  PluginManifest.repository.release.tag = PackageInfo.version;
}

fs.writeFileSync(resolve(__dirname, './LLTranslate/manifest.json'), JSON.stringify(PluginManifest, null, 2), { encoding: 'utf8' });
