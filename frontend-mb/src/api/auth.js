// Mock 阶段：登录和用户信息
const MOCK_USER = {
  id: 1,
  username: 'admin',
  nickname: '管理员',
  avatar: '',
  role: 'admin',
}

export const login = (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          token: 'mock_token_' + Date.now(),
          user: MOCK_USER,
        },
      })
    }, 500)
  })
}

export const getProfile = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: MOCK_USER,
      })
    }, 300)
  })
}
