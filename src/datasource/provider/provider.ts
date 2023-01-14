import axios from "axios";
import { environment } from "../../environment/environment";
import { logger } from "../../log/logger";

class Provider {
  public vesselInfoApi(type) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios({
          method: "get",
          url: environment.TeekayApis.URL1 +`?type=${type}`,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Ocp-Apim-Subscription-Key" : environment.TeekayApis.key
          },
        });
        console.log(response.config.url)
        return resolve(response.data);
      } catch (error) {
        logger.log("error", error);
        return reject(error);
      }
    });
  }
  public latAndLongApi() {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios({
          method: "get",
          url: environment.TeekayApis.URL2,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Ocp-Apim-Subscription-Key" : environment.TeekayApis.key
          },
        });
        return resolve(response.data);
      } catch (error) {
        logger.log("error", error);
        return reject(error);
      }
    });
  }

  
}

export const provider = new Provider();
