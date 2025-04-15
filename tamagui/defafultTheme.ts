export const defaultTheme = {
  base: {
    // 어두운 계열의 색상 그라데이션
    color1: '#121212', // 가장 어두운 그레이 (background1과 동일)
    color2: '#1A1A1A', // 어두운 그레이 (background2와 동일)
    color3: '#212121', // 중간 어두운 그레이 (background3와 동일)
    color4: '#2C2C2E', // 애플 다크모드 배경
    color5: '#3A3A3C', // 애플 다크모드 구분선
    color6: '#48484A', // 미디엄 그레이
    color7: '#636366', // 애플 다크모드 라벨
    color8: '#8E8E93', // 애플 다크모드 보조 라벨
    color9: '#AEAEB2', // 밝은 그레이
    color10: '#D1D1D6', // 더 밝은 그레이
    color11: '#F2F2F7', // 가장 밝은 그레이

    // Background Colors - color1~3과 동일
    background1: '#121212', // color1과 동일
    background2: '#1A1A1A', // color2와 동일
    background3: '#212121', // color3과 동일

    background1Alpha: 'rgba(18, 18, 18, 0.7)', // color1 70% 투명도
    background2Alpha: 'rgba(26, 26, 26, 0.7)', // color2 70% 투명도
    background3Alpha: 'rgba(33, 33, 33, 0.7)', // color3 70% 투명도

    // Base UI Element Colors - 같은 색상의 투명도 조절
    base1: 'rgba(18, 18, 18, 0.6)', // color1 기반
    base2: 'rgba(26, 26, 26, 0.7)', // color2 기반
    base3: 'rgba(33, 33, 33, 0.8)', // color3 기반

    // Accent Colors - 애플 블루 계열 (텍스트 대비 강화)
    accent1: '#0066CC', // 진한 애플 블루 (기준)
    accent2: '#0055AB', // 더 진한 애플 블루 (약간 어두운 버전)
    accent3: '#004488', // 가장 진한 애플 블루 (더 어두운 버전)

    // Secondary Colors - 애플 그린 계열 (텍스트 대비 강화)
    secondary1: '#17914A', // 진한 애플 그린 (기준)
    secondary2: '#147A3D', // 더 진한 애플 그린 (약간 어두운 버전)
    secondary3: '#106332', // 가장 진한 애플 그린 (더 어두운 버전)

    // Tertiary Colors - 애플 퍼플 계열 (텍스트 대비 강화)
    tertiary1: '#8222C3', // 진한 애플 퍼플 (기준)
    tertiary2: '#701EA6', // 더 진한 애플 퍼플 (약간 어두운 버전)
    tertiary3: '#5E1A8A', // 가장 진한 애플 퍼플 (더 어두운 버전)

    // Border Colors - 동일 색상 불투명도 변화
    border1: 'rgba(58, 58, 60, 0.3)', // 미세한 경계선
    border2: 'rgba(58, 58, 60, 0.5)', // 중간 경계선
    border3: 'rgba(58, 58, 60, 0.7)', // 굵은 경계선

    // Shadow Colors - 동일 그림자 불투명도 변화
    shadow1: 'rgba(0, 0, 0, 0.1)', // 가벼운 그림자
    shadow2: 'rgba(0, 0, 0, 0.2)', // 중간 그림자
    shadow3: 'rgba(0, 0, 0, 0.3)', // 강한 그림자

    // Text Colors - color 기반
    text1: '#F2F2F7', // color11과 동일
    text2: '#D1D1D6', // color10과 동일
    text3: '#AEAEB2', // color9와 동일
    text4: '#8E8E93', // color8과 동일

    // Fill Colors - 동일 채우기 색상 불투명도 변화
    fill1: 'rgba(99, 99, 102, 0.36)', // 강한 채우기
    fill2: 'rgba(99, 99, 102, 0.24)', // 중간 채우기
    fill3: 'rgba(99, 99, 102, 0.16)', // 약한 채우기
    fill4: 'rgba(99, 99, 102, 0.08)', // 가장 약한 채우기

    // Separator Colors - border1 기반
    separator1: 'rgba(58, 58, 60, 0.65)', // 진한 구분선
    separator2: 'rgba(58, 58, 60, 0.3)', // 연한 구분선

    // Semantic Colors - 애플 시스템 컬러 (텍스트 대비 강화)
    success: '#17914A', // 진한 애플 그린
    warning: '#B06800', // 진한 애플 오렌지
    error: '#B3211E', // 진한 애플 레드
    info: '#0066CC', // 진한 애플 블루

    // Chart & Data Visualization Colors (텍스트 대비 강화)
    dataViz1: '#0066CC', // accent1과 동일
    dataViz2: '#17914A', // secondary1과 동일
    dataViz3: '#8222C3', // tertiary1과 동일
    dataViz4: '#B06800', // 진한 애플 오렌지
    dataViz5: '#B3211E', // 진한 애플 레드
    dataViz6: '#2F6E8A', // 진한 애플 블루-그린

    // Tamagui 컴포넌트 기본 토큰 - Glassmorphism 스타일
    color: '#F2F2F7', // text1과 동일
    colorHover: '#F2F2F7', // text1과 동일
    colorPress: '#D1D1D6', // text2와 동일
    colorFocus: '#FFFFFF', // 더 밝게
    colorTransparent: 'rgba(242, 242, 247, 0.5)', // text1 반투명

    background: 'rgba(18, 18, 18, 0.9)', // color1 기반
    backgroundHover: 'rgba(26, 26, 26, 0.9)', // color2 기반
    backgroundPress: 'rgba(33, 33, 33, 0.9)', // color3 기반
    backgroundFocus: 'rgba(26, 26, 26, 0.95)', // color2 기반
    backgroundStrong: 'rgba(18, 18, 18, 0.95)', // color1 기반
    backgroundTransparent: 'rgba(242, 242, 247, 0.05)', // text1 반투명

    borderColor: 'rgba(58, 58, 60, 0.5)', // border1과 동일
    borderColorHover: 'rgba(58, 58, 60, 0.7)', // border2와 동일
    borderColorFocus: 'rgba(0, 102, 204, 0.6)', // accent1 반투명
    borderColorPress: 'rgba(0, 102, 204, 0.8)', // accent1 반투명

    placeholderColor: '#8E8E93', // color9와 동일
    outlineColor: 'rgba(0, 102, 204, 0.5)', // accent1 반투명
  },
};
