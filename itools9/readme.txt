keytool -genkey -v -keystore itools-release.keystore -alias itools -keyalg RSA -validity 4000
密码：kzitools
姓名：kz
组织单位：itools
组织名称：itools
城市：gz
省/市：gz
国家：cn

cordova build --release android
itools-release.keystore和\android\app\build\outputs\apk\release\app-release-unsigned.apk同文件夹，再apk文件夹中运行：

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore itools-release.keystore app-release-unsigned.apk itools

