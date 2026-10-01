export const AGREEMENTS = [
  {
    id: 'termsOfService',
    label: '이용약관 동의',
    required: true,
    href: '/terms'
  },
  {
    id: 'privacyPolicy',
    label: '개인정보 수집 및 이용 동의',
    required: true,
    href: '/privacy'
  },
  {
    id: 'serviceImprovement',
    label: '서비스 개선을 위한 데이터 활용 동의',
    required: false,
    href: '/data-policy'
  },
] as const