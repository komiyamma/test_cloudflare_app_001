# React Demo Site

React v19とTypeScriptを使用した日本語のデモサイトです。

## 技術スタック

- **Frontend Framework**: React v19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules + CSS Variables
- **State Management**: React Built-in Hooks

## プロジェクト構造

```
react-demo-site/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Features/
│   │   ├── Contact/
│   │   └── Footer/
│   ├── hooks/
│   ├── types/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

### リント

```bash
npm run lint
```

## 機能

- React v19の最新機能を活用
- TypeScriptによる型安全な開発
- CSS Modulesによるスコープ化されたスタイリング
- レスポンシブデザイン
- 日本語コンテンツ対応
- インタラクティブなUI要素

## 開発

このプロジェクトは、モダンなReactの機能を学習し、実際のプロジェクトで活用するためのデモサイトです。各コンポーネントは独立して開発され、再利用可能な設計になっています。