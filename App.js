import React from 'react';
import { View, Text } from 'react-native';
import {
  AppLoading,
  Asset,
  Font,
} from 'expo';
import fonts from 'app/src/fonts';
import images from 'app/src/images';


export default class App extends React.Component {
  static defaultProps = {
    skipLoadingScreen: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
    };
  }

  /*
  画像とフォントをロード
   */
  loadResourcesAsync = async () => {
    // ローカルフォルダから画像をロード
    await Asset.loadAsync(Object.keys(images).mam(key => images[key]));
    // ローカルフォルダからフォントをロード
    await Font.loadAsync(fonts);

    return true;
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    // Resourceのロードが終了するまでは、AppLoadingをrender
    // Splash画面の表示処理
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          // 非同期でResourceをロード
          startAsync={this.loadResourcesAsync}
          onError={error => console.warn(error)}

          // Resourceのロードが終了したとき、ロードを終了
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }
    // Resourceのロード終了後
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello World</Text>
      </View>
    );
  }
}
