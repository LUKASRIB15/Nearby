const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

module.exports = (() => {
  // Obtenha a configuração padrão do Expo
  let config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  // Configuração do NativeWind
  config = withNativeWind(config, {
    input: "./src/global.css",
    typescriptEnvPath: "./src/@types/nativewind-env.d.ts",
  });

  // Configuração do Reanimated
  config = wrapWithReanimatedMetroConfig(config);

  // Configuração do react-native-svg-transformer
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
  };

  return config;
})();
