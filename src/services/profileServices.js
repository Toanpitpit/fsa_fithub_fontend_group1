import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constant';


// Cấu hình axios instance
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
}); 


