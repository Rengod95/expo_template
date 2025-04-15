import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {useState} from 'react';
import {ImageService} from './adapter';
import {ImageLoadingStatus, ImageSource} from './types';
import {requestTrackingPermissionsAsync} from 'expo-tracking-transparency';

interface UseImagePickerServiceProps {
  status?: ImageLoadingStatus;
  setStatus?: (status: ImageLoadingStatus) => void;
  onSingleImageSelected?: (image: ImagePicker.ImagePickerAsset | null) => void;
  onMultipleImageSelected?: (images: ImagePicker.ImagePickerAsset[] | null) => void;
}

export const useImagePickerService = (props?: UseImagePickerServiceProps) => {
  const [localStatus, setLocalStatus] = useState<ImageLoadingStatus>('init');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  // ImageService 인스턴스를 가져옵니다.

  const status = props?.status ?? localStatus;
  const setStatus = props?.setStatus ?? setLocalStatus;

  // 통합된 이미지 선택 함수
  const selectImageSingle = async (source: ImageSource, options?: ImagePicker.ImagePickerOptions) => {
    setStatus('loading');
    try {
      const result = await ImageService.pickImageFromMedia(source, options);

      if (!result) {
        setStatus('failed');
        props?.onSingleImageSelected?.(null);
        return;
      }

      if (!result.canceled) {
        setImage(result.assets[0]);
        props?.onSingleImageSelected?.(result.assets[0]);
        setStatus('success');
      } else {
        setStatus('canceled');
        props?.onSingleImageSelected?.(null);
      }
    } catch (e) {
      setStatus('failed');
      console.error(`Image selection failed from ${source}:`, e); // 에러 로그에 소스 정보 추가
      props?.onSingleImageSelected?.(null);
    }
  };

  const selectImageMultiple = async (source: ImageSource, options?: ImagePicker.ImagePickerOptions) => {
    setStatus('loading');
    try {
      const result = await ImageService.pickImageFromMedia(source, options);

      if (!result) {
        setStatus('failed');
        props?.onMultipleImageSelected?.(null);
        return;
      }

      if (!result.canceled) {
        setImages(result.assets);
        props?.onMultipleImageSelected?.(result.assets);
        setStatus('success');
      } else {
        setStatus('canceled');
        props?.onMultipleImageSelected?.(null);
      }
    } catch (e) {
      setStatus('failed');
      console.error(`Image selection failed from ${source}:`, e); // 에러 로그에 소스 정보 추가
      props?.onMultipleImageSelected?.(null);
    }
  };

  return {
    image,
    images,
    status,
    selectImageSingle,
    selectImageMultiple,
  };
};
