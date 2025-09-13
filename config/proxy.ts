export default {
  dev: {
    '/api': {
      target: 'https://mais-service-1002606543988.europe-west1.run.app',
      changeOrigin: true,
      secure: true,
    },
  },
  // test/prod ortamları için istersen benzer bloklar ekleyebilirsin
};
