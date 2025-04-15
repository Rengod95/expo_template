import * as MediaLibrary from 'expo-media-library';
import {Alert} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {DownloadResumable} from 'expo-file-system';

import * as ImagePicker from 'expo-image-picker';

import * as Sharing from 'expo-sharing';
import {InitializationSingleTon} from '@/service/lib/shared';
import {VariantService} from '@/service/lib/utils/Invariant/adapter';

export class ImageServiceAdapter extends InitializationSingleTon<ImageServiceAdapter> {
  constructor() {
    super();
  }

  public async pickImageFromMedia(mediaType: 'CAMERA' | 'ALBUM', options?: ImagePicker.ImagePickerOptions) {
    let result = null;

    try {
      if (mediaType === 'ALBUM') {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.status !== 'granted') {
          // @change : 사용자에게 권한 필요 알림 방식 개선 (예: 커스텀 팝업 또는 설정 이동 안내)
          alert('카메라 롤에 접근할 수 있는 권한이 필요합니다.');
          return;
        }

        result = await ImagePicker.launchImageLibraryAsync(options);
      } else if (mediaType === 'CAMERA') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.status !== 'granted') {
          // TODO: 사용자에게 권한 필요 알림 방식 개선
          alert('카메라에 접근할 수 있는 권한이 필요합니다.');
          return;
        }

        result = await ImagePicker.launchCameraAsync();
      } else {
        result = null;
      }

      return result;
    } catch (e: unknown) {}
  }

  // file:// 형식의 이미지 uri를 다운로드 하고 앨범에 저장
  public handleDownloadInternalImageUri = async (fileUri: string): Promise<boolean> => {
    try {
      const hasPermission = await this.requestPermissionPipeline();
      if (!hasPermission) return false;
      const asset = await MediaLibrary.createAssetAsync(fileUri);

      await this.saveAssetToAlbum(asset);

      Alert.alert('이미지를 성공적으로 저장했습니다.');
      return true;
    } catch (e) {
      Alert.alert('이미지 저장에 실패했습니다.');
      return false;
    }
  };

  // 외부 url 이미지를 다운로드 하고 앨범에 저장
  public handleDownloadExternalImageUri = async (externalUrl: string, id: string | number): Promise<boolean> => {
    const instance = this.createDownloadInstance(externalUrl, id);

    try {
      const hasPermission = await this.requestPermissionPipeline();
      if (!hasPermission) return false;

      const result = await instance.downloadAsync();

      VariantService.invariant(!!result, {type: 'error', message: 'downloadedResumable failed on handleDownloadExternalImageUri'});

      // 미디어 라이브러리에 저장
      const asset = await MediaLibrary.createAssetAsync(result?.uri);

      await this.saveAssetToAlbum(asset);

      Alert.alert('이미지를 성공적으로 저장했습니다.');
      return true;
    } catch (e) {
      Alert.alert('이미지 저장에 실패했습니다.');
      return false;
    }
  };

  shareDownloadResumable = async (instance: DownloadResumable) => {
    if (await Sharing.isAvailableAsync()) {
      const result = await instance.downloadAsync();
      if (result?.uri) await Sharing.shareAsync(result?.uri);
    }
  };

  public shareInternalImage = async (uri: string) => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
      return true;
    }
    return false;
  };

  public saveBase64ImageToFile = async (base64String: string) => {
    try {
      // 임시 파일 경로 생성
      const fileUri = FileSystem.cacheDirectory + `image_${Date.now()}.png`;

      // base64 문자열을 파일로 저장
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileUri;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  private createDownloadInstance = (externalUrl: string, id: string | number) => {
    const fileUri = FileSystem.documentDirectory + `${process.env.EXPO_PUBLIC_IN_APP_NAME}_Generation_${id}.png`;
    return FileSystem.createDownloadResumable(externalUrl, fileUri, {cache: true});
  };

  private async requestPermissionPipeline() {
    const {status} = await MediaLibrary.getPermissionsAsync();
    if (status !== 'granted') {
      const {status: newStatus} = await MediaLibrary.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('이미지 다운로드를 위해서는 미디어 라이브러리 접근 권한이 필요합니다.');
        return false;
      }
    }
    return true;
  }

  private async saveAssetToAlbum(asset: MediaLibrary.Asset) {
    // 기본 앨범에 추가하거나 새 앨범 생성
    const albumName = process.env.EXPO_PUBLIC_IN_APP_NAME;
    let album = await MediaLibrary.getAlbumAsync(albumName);

    if (album == null) {
      album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  }
}

export const ImageService = ImageServiceAdapter.getInstance();
