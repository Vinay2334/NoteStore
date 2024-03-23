import {notes_endpoints} from "@/services/api";
import {apiConnector} from "@/services/apiconnector";
const {GET_ALL_NOTES_API} = notes_endpoints;

export const fetch_all_notes = async() => {
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_NOTES_API)
    console.log(response)
    result = response.data.results
    // if (!response?.data?.success) {
    //   throw new Error("Could Not Fetch Course Categories")
    // }
    // result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_NOTES_API API ERROR............", error)
  }
  return result
}