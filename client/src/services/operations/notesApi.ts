import {notes_endpoints} from "@/services/api";
import {apiConnector} from "@/services/apiconnector";
const {GET_ALL_NOTES_API} = notes_endpoints;

export const fetch_all_notes = async() => {
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_NOTES_API)
    result = response.data.results
  } catch (error) {
    console.log("GET_ALL_NOTES_API API ERROR............", error)
  }
  console.log(result)
  return result
}