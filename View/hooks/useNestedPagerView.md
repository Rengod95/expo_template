# useNestedPagerView 훅 사용 가이드

이 문서는 `useNestedPagerView` 훅의 사용 방법에 대해 설명합니다.

## 개요

`useNestedPagerView` 훅은 PagerView를 사용하는 화면에서 페이지 간 이동 및 진행 상태를 관리하기 위한 커스텀 훅입니다. 첫 페이지에서 뒤로가기 시 이전 화면으로 돌아가고, 그 외에는 이전 페이지로 이동하는 기능을 제공합니다.

## 설치

이 훅을 사용하기 위해서는 `react-native-pager-view` 패키지가 필요합니다:

```bash
npm install react-native-pager-view
# 또는
yarn add react-native-pager-view
```

## 사용 방법

### 기본 사용법

```tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'tamagui';
import {useNestedPagerView} from '@/View/hooks';

const PagerViewExample = () => {
  const {AnimatedPagerView, ref, backToPrev, proceedToNext, progressValue, activePage, pages} = useNestedPagerView({
    pagesAmount: 3, // 페이지 수
  });

  return (
    <View style={styles.container}>
      {/* 진행 상태 표시 */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, {width: `${progressValue}%`}]} />
      </View>

      {/* 페이지 뷰 */}
      <AnimatedPagerView style={styles.pagerView}>
        <View key="1" style={styles.page}>
          <Text style={styles.text}>페이지 1</Text>
        </View>
        <View key="2" style={styles.page}>
          <Text style={styles.text}>페이지 2</Text>
        </View>
        <View key="3" style={styles.page}>
          <Text style={styles.text}>페이지 3</Text>
        </View>
      </AnimatedPagerView>

      {/* 네비게이션 버튼 */}
      <View style={styles.buttonContainer}>
        <Button onPress={backToPrev}>
          <Text>이전</Text>
        </Button>
        <Text>{`${activePage + 1} / ${pages.length}`}</Text>
        {activePage < pages.length - 1 && (
          <Button onPress={proceedToNext}>
            <Text>다음</Text>
          </Button>
        )}
        {activePage === pages.length - 1 && (
          <Button onPress={() => console.log('완료')}>
            <Text>완료</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  progressBar: {
    height: 10,
    backgroundColor: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default PagerViewExample;
```

### 반환값

| 이름                | 설명                                                             |
| ------------------- | ---------------------------------------------------------------- |
| `AnimatedPagerView` | 애니메이션이 적용된 PagerView 컴포넌트                           |
| `ref`               | PagerView의 ref                                                  |
| `backToPrev`        | 이전 페이지로 이동하는 함수 (첫 페이지에서는 이전 화면으로 이동) |
| `proceedToNext`     | 다음 페이지로 이동하는 함수                                      |
| `progressValue`     | 현재 진행 상태 (퍼센트)                                          |
| `activePage`        | 현재 활성화된 페이지 인덱스                                      |
| `pages`             | 페이지 배열                                                      |
| `setPage`           | 특정 페이지로 이동하는 함수                                      |

### 주의사항

- `pagesAmount` 속성은 페이지 수를 지정합니다. 이 값은 PagerView에 표시될 페이지 수와 일치해야 합니다.
- 첫 페이지에서 `backToPrev` 함수를 호출하면 `router.back()`이 실행되어 이전 화면으로 이동합니다.
- 마지막 페이지에서는 완료 버튼을 표시하는 것이 좋습니다.
