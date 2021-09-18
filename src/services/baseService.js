import axios from 'axios'
import { DOMAIN, USER_ACCESS_TOKEN} from '../utils/constants/settingSystem.js';
import { getCookie } from '../utils/functions/systemFunction.js';

export default class baseService {
    get=(url)=>{
        return axios({
            url:`${DOMAIN}${url}`,
            method:'GET',
            headers: {'Authorization': 'Bearer ' + JSON.parse(getCookie(USER_ACCESS_TOKEN))},
        })
    }
    put=(url,model)=>{
        return axios({
            url:`${DOMAIN}${url}`,
            method:'PUT',
            data:model,
            headers: {'Authorization': 'Bearer ' + JSON.parse(getCookie(USER_ACCESS_TOKEN))},
        })
    }
    post=(url,model)=>{
        return axios({
            url:`${DOMAIN}${url}`,
            method:'POST',
            data:model,
            headers: {'Authorization': 'Bearer ' + JSON.parse(getCookie(USER_ACCESS_TOKEN))},
        })
    }
    del=(url,model)=>{
        return axios({
            url:`${DOMAIN}${url}`,
            method:'DELETE',
            data:model,
            headers: {'Authorization': 'Bearer ' + JSON.parse(getCookie(USER_ACCESS_TOKEN))},
        })
    }
}