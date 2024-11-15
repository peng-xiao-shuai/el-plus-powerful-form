export enum LangKey {
  VerifyPhone = 'VerifyPhone',
  VerifyEmail = 'VerifyEmail',
  VerifyCode = 'VerifyCode',
  VerifyHttps = 'VerifyHttps',
  VerifyIp = 'VerifyIp',
  VerifyNumber = 'VerifyNumber',
  VerifyEnglish = 'VerifyEnglish',
  VerifyChinese = 'VerifyChinese',

  VerifyLength = 'VerifyLength',
  VerifyEmpty = 'VerifyEmpty',
}

const langPackages = {
  en: {
    [LangKey.VerifyPhone]: 'Phone format is incorrect',
    [LangKey.VerifyEmail]: 'Email address format is incorrect',
    [LangKey.VerifyCode]: 'ID card format is incorrect',
    [LangKey.VerifyHttps]: 'Website format is incorrect',
    [LangKey.VerifyIp]: 'IP address format is incorrect',
    [LangKey.VerifyNumber]: 'Only numbers can be entered',
    [LangKey.VerifyEnglish]: 'Only English characters can be entered',
    [LangKey.VerifyChinese]: 'Only Chinese characters can be entered',
    [LangKey.VerifyLength]: `Character length limit is `,
    [LangKey.VerifyEmpty]: `Can't be empty`,
  },
  'zh-cn': {
    [LangKey.VerifyPhone]: '手机号格式不正确',
    [LangKey.VerifyEmail]: '邮箱地址格式不正确',
    [LangKey.VerifyCode]: '身份证格式不正确',
    [LangKey.VerifyHttps]: '网址格式不正确',
    [LangKey.VerifyIp]: 'IP地址格式不正确',
    [LangKey.VerifyNumber]: '只能输入数字',
    [LangKey.VerifyEnglish]: '只能输入英文字符',
    [LangKey.VerifyChinese]: '只能输入中文字符',
    [LangKey.VerifyLength]: `字符长度限制为 `,
    [LangKey.VerifyEmpty]: `不能为空`,
  },
} as const

export default langPackages
