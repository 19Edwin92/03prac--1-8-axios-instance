import axios from "axios";

const instance = axios.create({
  baseURL:`${process.env.REACT_APP_SERVER_URL}`,
  // 03-03 강제로 오류 발생시켜보기  /////////////////////////////////
  timeout:1
})

// 03-01 interceptors 요청 시에 개입하기 /////////////////////////////////
instance.interceptors.request.use(
  function (config) {
    console.log("인터셉터 요청 성공!")
    return config
  },
  function (error) {
    console.log("인터셉터 요청 오류!")
    return Promise.reject(error)
  },
)

// 03-02 interceptors 응답 시에 개입하기 /////////////////////////////////
instance.interceptors.response.use(
  function (response) {
    console.log("인터셉터 응답 성공!")
    return response
  },
  function (error) {
    console.log("인터셉터 응답 오류!")
    return Promise.reject(error)
  },
)


export default instance