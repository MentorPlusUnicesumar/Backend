module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Isso permite que o Jest entenda o caminho 'src/...' como relativo à raiz do projeto
  },
  // Outras configurações que você já pode ter...
};
