import { getSongInfo } from "../api/songs"



export const plays = (id) => {

  getSongInfo({ id }).then((res) => {
    console.log(res)
  })
}
